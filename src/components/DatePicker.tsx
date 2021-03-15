import React from 'react'
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import { LabelProps, Label } from './Label'
import 'react-datepicker/dist/react-datepicker.css'
import { TextInput } from './TextInput'
import { format, parse } from 'date-fns'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import styled, { css, keyframes } from 'styled-components'
import ClickAwayListener from 'react-click-away-listener'
import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'
import { useLanguage } from '../theme/language'
import { Language } from '../util'
import { Icon } from './Icon'
import { useMobileTouch } from '../hooks/useMobileTouch'

const mapLanguageToLocaleString: { [k in Language]: string } = {
  [Language.DE]: 'de',
  [Language.EN]: 'en-GB',
  [Language.FR]: 'fr',
  [Language.IT]: 'it',
}

const mapLanguageToLocaleFormat: { [k in Language]: string } = {
  [Language.DE]: 'DD.MM.YYYY',
  [Language.EN]: 'MM//DD/YYYY',
  [Language.FR]: 'DD.MM.YYYY',
  [Language.IT]: 'DD.MM.YYYY',
}

const mapLanguageToLocale: { [k in Language]: Locale } = {
  [Language.DE]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
}

const DatePickerIconWrapper = styled.div``

const DatePickerAnimation = keyframes`
  from {
    opacity: 0;
    transform-origin: top center;
    transform: scale(0, 0);
  }
  to {
    opacity: 1;
    transform-origin: top center;
    transform: scale(1, 1);
  }
`
const DatePickerCalendarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  /* Default date picker styles */

  & .react-datepicker__triangle {
    display: none !important;
  }
  & .react-datepicker-popper {
    width: 100%;
    margin: 0;
    transform: none !important;
    z-index: 999;
  }
  & .react-datepicker-wrapper {
    display: none !important;
  }

  & .react-datepicker  {
    position: absolute;
    top: 64px;
    right: 0;
    animation: ${DatePickerAnimation} 0.15s ease-out;
  }

  ${({ cssStyles }: { cssStyles: string }) =>
    cssStyles > ''
      ? css`
          ${cssStyles}
        `
      : ''}
`

export type Props = {
  dataTestId?: string
  dateFormat?: string
  datePickerProps?: Partial<
    Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'value'>
  >
  error?: boolean
  label?: LabelProps
  onChange: (value: Date) => void
  style?: Partial<AppTheme['datePicker']>
  value: Date | null
}

export const DatePicker = (props: Props) => {
  const { onChange, value, label } = props

  /* Styles */
  const theme = useAppTheme()
  const getStyle = useInlineStyle(theme, 'datePicker')(props.style)

  const styleIconWrapper = getStyle(
    'iconWrapper',
    props.error ? getStyle('errorWrapper').style : {},
  )
  const styleIconHook1 = getStyle(
    'hook1',
    props.error ? getStyle('errorHook').style : {},
  )
  const styleIconHook2 = getStyle(
    'hook2',
    props.error ? getStyle('errorHook').style : {},
  )

  const reactDatePickerStyle = theme.datePicker.reactDatePicker || ''

  /* Language and locales */

  const language = useLanguage()
  const locale = mapLanguageToLocale[language]

  const { isMobileTouch } = useMobileTouch()

  React.useEffect(() => {
    registerLocale(
      mapLanguageToLocaleString[language],
      mapLanguageToLocale[language],
    )
  }, [language])

  const [open, setOpen] = React.useState(false)

  return (
    <>
      {label && <Label {...label} />}

      <ClickAwayListener
        onClickAway={() => {
          open && setOpen(false)
        }}
      >
        <div {...getStyle('wrapper')}>
          {isMobileTouch ? (
            <TextInput
              onChange={(v: any) => {
                try {
                  const dateValue = new Date(v)
                  onChange(dateValue)
                } catch (err) {
                  onChange(null)
                }
              }}
              error={props.error}
              inputType={'date'}
              value={props.value ? format(props.value, props.dateFormat) : null}
              dataTestId={props.dataTestId}
            />
          ) : (
            <>
              <TextInput
                onChange={() => {}}
                onBlur={(v: any) => {
                  try {
                    const dateValue = parse(v, 'P', new Date(), { locale }) as
                      | Date
                      | 'Invalid Date'
                    onChange(dateValue as Date)
                  } catch (err) {
                    onChange(null)
                  }
                }}
                error={props.error}
                inputType={'text'}
                placeholder={mapLanguageToLocaleFormat[language]}
                value={
                  props.value ? format(props.value, 'P', { locale }) : null
                }
                dataTestId={props.dataTestId}
              />

              <DatePickerIconWrapper
                onClick={() => {
                  setOpen(!open)
                }}
                {...styleIconWrapper}
              >
                <div {...styleIconHook1} />
                <div {...styleIconHook2} />
                <Icon icon="calendar_today" size={16} />
              </DatePickerIconWrapper>

              <DatePickerCalendarWrapper cssStyles={reactDatePickerStyle}>
                <ReactDatePicker
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
              </DatePickerCalendarWrapper>
            </>
          )}
        </div>
      </ClickAwayListener>
    </>
  )
}
