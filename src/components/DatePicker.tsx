import React from 'react'
import DatePickerLib, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import { LabelProps, Label } from './Label'
import 'react-datepicker/dist/react-datepicker.css'
import { TextInput } from './TextInput'
import { format } from 'date-fns'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import styled from 'styled-components'
import ClickAwayListener from 'react-click-away-listener'
import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'
import { getLanguageContext } from '../theme/language'
import { Language } from '../util'

const mapLanguageToLocaleString: { [k in Language]: string } = {
  [Language.DE]: 'de',
  [Language.EN]: 'en-DB',
  [Language.FR]: 'fr',
  [Language.IT]: 'it',
}

const mapLanguageToLocale: { [k in Language]: Locale } = {
  [Language.DE]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
}

const Wrapper = styled.div`
  .react-datepicker__triangle {
    display: none !important;
  }
  .react-datepicker-popper {
    transform: none !important;
  }
  .react-datepicker-wrapper {
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
  }
`

export type Props = {
  onChange: (value: Date) => void
  value: Date
  label?: LabelProps
  dateFormat?: string
  style?: Partial<AppTheme['datePicker']>
  datePickerProps?: Partial<
    Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'value'>
  >
  dataTestId?: string
}

export const DatePicker = (props: Props) => {
  const { onChange, value, label } = props

  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'datePicker')(props.style)
  const language = React.useContext(getLanguageContext())

  const [open, setOpen] = React.useState(false)
  const dateFormat = props.dateFormat || 'dd.MM.yyyy'

  React.useEffect(() => {
    registerLocale(
      mapLanguageToLocaleString[language],
      mapLanguageToLocale[language],
    )
  }, [language])

  return (
    <>
      {label && <Label {...label} />}
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false)
        }}
      >
        <Wrapper style={getStyle('wrapper')}>
          <TextInput
            onChange={() => {}}
            placeholder={dateFormat.toLocaleUpperCase()}
            value={props.value ? format(props.value, dateFormat) : null}
            onFocus={() => {
              setOpen(!open)
            }}
          />
          <DatePickerLib
            locale={language}
            customInput={<input data-test-id={props.dataTestId} />}
            open={open}
            selected={value}
            onChange={(v: Date) => {
              onChange(v)
              setOpen(false)
            }}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            {...props.datePickerProps}
          />
        </Wrapper>
      </ClickAwayListener>
    </>
  )
}
