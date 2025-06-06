import { format, isValid, parse } from 'date-fns'
import React from 'react'
import { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { mapLanguageToLocale, mapLanguageToLocaleString } from '../theme/language'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { MaskedInput } from './MaskedInput'
import { TextInput } from './TextInput'

import { Div } from '../html'
import { MdOutlineCalendarToday } from '../icons/new/MdOutlineCalendarToday'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'

export type Props = {
  /**
   * The date value: Has to be in a format that new Date(value) can parse correctly
   */
  value: string | null
  dataTestId?: string
  /**
   * The date format that the input string is in
   * Example of ISO format: 2019-09-18T19:00:52Z
   */
  dateFormat: string
  /**
   * Sometimes the date format that the server expects is different from the one that the user sees.
   */
  displayDateFormat?: string
  datePickerProps?: Partial<Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'value'>>
  error?: boolean
  hasFocus?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur: (value: string) => void
  readOnly?: boolean
  style?: Partial<ComponentTheme['datePicker']>
  maskInput?: {
    alwaysShowMask?: boolean
    mask?: string
    maskString?: string
  }
}

const parseDate = (value: string, dateFormat: string): Date | 'Invalid Date' => {
  const date = parse(value, dateFormat, new Date())
  if (isValid(date)) {
    return date
  }
  return 'Invalid Date'
}

const formatDate = (value: Date, dateFormat: string): string => {
  return format(value, dateFormat)
}

const DEFAULT_MASK_INPUT = {
  alwaysShowMask: true,
  mask: '00.00.0000',
  maskString: 'dateFormatPlaceholder',
}

export const MaskedDatePicker = ({ dateFormat, ...props }: Props) => {
  const { isMobileTouch } = useMobileTouch()
  const maskInput = props.maskInput ?? DEFAULT_MASK_INPUT

  /* Styles */
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'datePicker')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'datePicker')(props.style)

  const textInputStyle =
    (props.style && {
      wrapper: props.style.inputWrapper,
      disabledInput: props.style.disabledInput,
      errorInput: props.style.errorInput,
    }) || {
      wrapper: getInlineStyle('inputWrapper').style,
    } ||
    // (!isMobileTouch && {
    // }) ||
    undefined

  const reactDatePickerStyle = theme.datePicker.reactDatePicker || ''

  /* Language and locales */

  const { i18n } = useTranslation()
  const language = i18n.language
  const locale = mapLanguageToLocale[language]

  useEffect(() => {
    registerLocale(mapLanguageToLocaleString[language], mapLanguageToLocale[language])
  }, [language])

  const [isFocused, setIsFocused] = useState(false)
  const [open, setOpen] = useState(false)

  /* Icon Styles */

  const styleIconWrapper = getCSSStyles({
    iconWrapper: true,
    iconWrapperFocus: isFocused,
    errorWrapper: !!props.error,
  })

  const styleIconHook1 = getCSSStyles({
    hook1: true,
    errorHook: !!props.error,
  })

  const styleIconHook2 = getCSSStyles({
    hook2: true,
    errorHook: !!props.error,
  })

  const value =
    !!props.value &&
    parseDate(props.value, dateFormat) !== 'Invalid Date' &&
    isValid(parseDate(props.value, dateFormat))
      ? formatDate(parseDate(props.value, dateFormat) as Date, props.displayDateFormat || dateFormat)
      : null

  const parsedDate = parseDate(props.value, dateFormat)

  const dateInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}

      <ClickAwayListener
        onClickAway={() => {
          open && setOpen(false)
        }}
      >
        <Div {...getCSSStyles('wrapper')} onClick={() => {}}>
          {isMobileTouch ? (
            // <TextInput
            //   onFocus={() => {
            //     setIsFocused(true)
            //     props.onFocus?.()
            //   }}
            //   onBlur={() => setIsFocused(false)}
            //   onChange={(v) => {
            //     try {
            //       const dateValue = parseDate(v, 'yyyy-MM-dd')
            //       if (dateValue.toString() === 'Invalid Date') {
            //         props.onBlur(null)
            //         // resetValue()
            //       } else {
            //         props.onBlur(formatDate(dateValue as Date, dateFormat))
            //       }
            //     } catch (err) {
            //       props.onBlur(null)
            //     }
            //   }}
            //   dataTestId={props.dataTestId}
            //   error={props.error}
            //   hasFocus={props.hasFocus}
            //   inputType="date"
            //   placeholder="dateFormatPlaceholder"
            //   style={textInputStyle}
            //   value={parsedDate !== 'Invalid Date' ? formatDate(parsedDate, 'yyyy-MM-dd') : null}
            // />
            <>
              <MaskedInput
                hasFocus={props.hasFocus}
                onFocus={() => {
                  setIsFocused(true)
                  props.onFocus?.()
                }}
                onBlur={(v: string, resetValue) => {
                  setIsFocused(false)
                  try {
                    const dateValue = parseDate(v, props.displayDateFormat ?? dateFormat)

                    if (dateValue.toString() === 'Invalid Date') {
                      props.onBlur(null)
                      resetValue()
                    } else {
                      props.onBlur(formatDate(dateValue as Date, dateFormat))
                    }
                  } catch (err) {
                    const testValue = parse(v, dateFormat, new Date()) as Date | 'Invalid Date'

                    if (testValue !== 'Invalid Date') {
                      props.onBlur(String(testValue))
                    } else {
                      props.onBlur(null)
                    }
                  }
                }}
                dataTestId={props.dataTestId}
                error={props.error}
                localeNamespace={props.localeNamespace}
                maskInput={maskInput}
                shouldMoveCursorToStartOnClick={value === null}
                style={textInputStyle}
                value={value}
              />

              <Div onClick={() => dateInputRef.current?.showPicker()} {...styleIconWrapper}>
                <Div {...styleIconHook1} />
                <Div {...styleIconHook2} />
                <MdOutlineCalendarToday width={16} />

                <input
                  ref={dateInputRef}
                  name="nativeDateInput"
                  type="date"
                  style={{ opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                  onChange={(e) => {
                    if (e.target.value > '') {
                      try {
                        const dateValue = parseDate(e.target.value, 'yyyy-MM-dd')
                        if (dateValue.toString() === 'Invalid Date') {
                          props.onBlur(null)
                          // resetValue()
                        } else {
                          props.onBlur(formatDate(dateValue as Date, dateFormat))
                        }
                      } catch (err) {
                        props.onBlur(null)
                      }
                    }
                  }}
                  value={value}
                />
              </Div>
            </>
          ) : (
            <>
              <MaskedInput
                hasFocus={props.hasFocus}
                onFocus={() => {
                  setIsFocused(true)
                  props.onFocus?.()
                }}
                onBlur={(v: string, resetValue) => {
                  setIsFocused(false)
                  try {
                    const dateValue = parseDate(v, props.displayDateFormat ?? dateFormat)

                    if (dateValue.toString() === 'Invalid Date') {
                      props.onBlur(null)
                      resetValue()
                    } else {
                      props.onBlur(formatDate(dateValue as Date, dateFormat))
                    }
                  } catch (err) {
                    const testValue = parse(v, dateFormat, new Date()) as Date | 'Invalid Date'

                    if (testValue !== 'Invalid Date') {
                      props.onBlur(String(testValue))
                    } else {
                      props.onBlur(null)
                    }
                  }
                }}
                dataTestId={props.dataTestId}
                error={props.error}
                localeNamespace={props.localeNamespace}
                maskInput={maskInput}
                shouldMoveCursorToStartOnClick={value === null}
                style={textInputStyle}
                value={value}
              />

              <Div onClick={() => setOpen(!open)} {...styleIconWrapper}>
                <Div {...styleIconHook1} />
                <Div {...styleIconHook2} />
                <MdOutlineCalendarToday width={16} />
              </Div>

              <DatePickerCalendarWrapper $cssStyles={reactDatePickerStyle}>
                <ReactDatePicker
                  locale={locale}
                  open={open}
                  selected={parsedDate !== 'Invalid Date' ? parsedDate : new Date()}
                  onChange={(value: Date) => {
                    if (value !== null && isValid(value)) {
                      props.onBlur(formatDate(value, dateFormat))
                    } else {
                      props.onBlur(null)
                    }
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
  & .react-datepicker {
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
