import React from 'react'
import DatePickerLib, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import { LabelProps, Label } from './Label'
import 'react-datepicker/dist/react-datepicker.css'
import { TextInput } from './TextInput'
import { format, parse } from 'date-fns'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import styled from 'styled-components'
import ClickAwayListener from 'react-click-away-listener'
import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'
import { useLanguage } from '../theme/language'
import { Language } from '../util'
import { Icon } from './Icon'

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
  value: Date | null
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

  const theme = useAppTheme()
  const getStyle = useInlineStyle(theme, 'datePicker')(props.style)
  const language = useLanguage()

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
        <Wrapper {...getStyle('wrapper')}>
          <TextInput
            onChange={() => {}}
            onBlur={(v) => {
              try {
                const value = parse(v, dateFormat, new Date()) as
                  | Date
                  | 'Invalid Date'
                onChange(value as Date)
              } catch (err) {
                onChange(null)
              }
            }}
            placeholder={dateFormat.toLocaleUpperCase()}
            value={props.value ? format(props.value, dateFormat) : null}
            dataTestId={props.dataTestId}
          />
          <div {...getStyle('iconWrapper')}>
            <div {...getStyle('hook1')} />
            <div {...getStyle('hook2')} />
            <Icon
              icon="calendar_today"
              size={16}
              onClick={() => {
                setOpen(!open)
              }}
            />
            <DatePickerLib
              locale={language}
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
          </div>
        </Wrapper>
      </ClickAwayListener>
    </>
  )
}
