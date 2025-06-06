import { format, isValid, parse } from 'date-fns'
import React from 'react'
import ClickAwayListener from 'react-click-away-listener'
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { mapLanguageToLocale, mapLanguageToLocaleString } from '../theme/language'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { TextInput } from './TextInput'
import { MdOutlineCalendarToday } from '../icons/new/MdOutlineCalendarToday'
import { Div } from '../html'

export type Props = {
  dataTestId?: string
  dateFormat?: string
  datePickerProps?: Partial<Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'value'>>
  error?: boolean
  hasFocus?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (value: Date) => void
  onBlur: (value: Date) => void
  readOnly?: boolean
  style?: Partial<ComponentTheme['datePicker']>
  value: Date | null
}

const parseDate = (value: string): Date | 'Invalid Date' => {
  const cleanedValue = value ? value.replace(/\D/g, '') : ''
  const dateValue = parse(cleanedValue, 'ddMMyyyy', new Date())

  return dateValue
}

export const DatePicker = (props: Props) => {
  /* Styles */
  const theme = useComponentTheme()
  const getStyle = useCSSStyles(theme, 'datePicker')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'datePicker')(props.style)
  const { isMobileTouch } = useMobileTouch()

  const styleIconWrapper = getStyle({
    iconWrapper: true,
    errorWrapper: !!props.error,
  })

  const styleIconHook1 = getStyle({
    hook1: true,
    errorHook: !!props.error,
  })

  const styleIconHook2 = getStyle({
    hook2: true,
    errorHook: !!props.error,
  })

  const textInputStyle =
    (props.style && {
      disabledInput: props.style.disabledInput,
      errorInput: props.style.errorInput,
      input: props.style.input,
      inputPlaceholder: props.style.inputPlaceholder,
      wrapper: props.style.inputWrapper,
    }) ||
    (!isMobileTouch && {
      wrapper: getInlineStyle('inputWrapper').style,
    }) ||
    undefined

  const reactDatePickerStyle = theme.datePicker.reactDatePicker || ''

  /* Date format */

  const dateFormat = props.dateFormat || 'yyyy-MM-dd'

  /* Language and locales */

  const { i18n } = useTranslation()
  const language = i18n.language
  const locale = mapLanguageToLocale[language]

  React.useEffect(() => {
    registerLocale(mapLanguageToLocaleString[language], mapLanguageToLocale[language])
  }, [language])

  const [open, setOpen] = React.useState(false)

  return (
    <>
      {props.label && <Label {...props.label} />}

      <ClickAwayListener
        onClickAway={() => {
          open && setOpen(false)
        }}
      >
        <Div {...getStyle('wrapper')}>
          <TextInput
            dataTestId={props.dataTestId}
            error={props.error}
            hasFocus={props.hasFocus}
            inputType={'text'}
            localeNamespace={props.localeNamespace}
            onChange={() => {}}
            onBlur={(v: any) => {
              try {
                const dateValue = parseDate(v)

                if (dateValue === 'Invalid Date') {
                  throw 'Invalid Date'
                }

                props.onBlur(dateValue as Date)
              } catch (err) {
                const testValue = parse(v, dateFormat, new Date()) as Date | 'Invalid Date'

                if (testValue !== 'Invalid Date') {
                  props.onBlur(testValue as Date)
                } else {
                  props.onBlur(null)
                }
              }
            }}
            placeholder={'dateFormatPlaceholder'}
            style={textInputStyle}
            value={isValid(props.value) ? format(props.value, 'dd.MM.yyyy') : null}
          />
          
          {isMobileTouch ? (
            <TextInput
              dataTestId={props.dataTestId}
              error={props.error}
              hasFocus={props.hasFocus}
              inputType={'date'}
              onChange={(v: any) => {
                try {
                  const dateValue = new Date(v)
                  props.onBlur(dateValue)
                } catch (err) {
                  props.onBlur(null)
                }
              }}
              style={textInputStyle}
              value={props.value && isValid(props.value) ? format(props.value, dateFormat) : null}
            />
          ) : (
            <>
              <Div
                onClick={() => {
                  setOpen(!open)
                }}
                {...styleIconWrapper}
              >
                <Div {...styleIconHook1} />
                <Div {...styleIconHook2} />
                <MdOutlineCalendarToday width={16} />
              </Div>

              <DatePickerCalendarWrapper $cssStyles={reactDatePickerStyle}>
                <ReactDatePicker
                  locale={locale}
                  open={open}
                  selected={props.value === null ? undefined : new Date()}
                  onChange={(v: Date) => {
                    props.onBlur(v)
                    setOpen(false)
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  // {...props.datePickerProps}
                />
              </DatePickerCalendarWrapper>
            </>
          )}
        </Div>
      </ClickAwayListener>
    </>
  )
}

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
const DatePickerCalendarWrapper = styled.div<{ $cssStyles: string }>`
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

  ${(props) =>
    props.$cssStyles > ''
      ? css`
          ${props.$cssStyles}
        `
      : ''}
`
