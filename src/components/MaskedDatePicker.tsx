import { format, isValid, parse } from 'date-fns'
import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { mapLanguageToLocale, mapLanguageToLocaleString } from '../theme/language'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { MaskedInput } from './MaskedInput'
import { TextInput } from './TextInput'

import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { MdOutlineCalendarToday } from '../icons/new/MdOutlineCalendarToday'

export type Props = {
  dataTestId?: string
  dateFormat?: string
  datePickerProps?: Partial<Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'value'>>
  error?: boolean
  hasFocus?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur: (value: string) => void
  style?: Partial<ComponentTheme['datePicker']>
  value: string | null
  maskInput?: {
    alwaysShowMask?: boolean
    mask?: string
    maskString?: string
  }
}

const parseDate = (value: string, dateFormat: string): Date | 'Invalid Date' => {
  // const cleanedValue = value ? value.replace(/\D/g, '') : ''
  // if (cleanedValue.length < 8) {
  //   return 'Invalid Date'
  // }
  // const dateValue = parse(cleanedValue, 'ddMMyyyy', new Date())
  const date = parse(value, dateFormat, new Date())
  if (isValid(date)) {
    return date
  }
  return 'Invalid Date'
}

const DefaultMaskInput = {
  alwaysShowMask: true,
  mask: '00.00.0000',
  maskString: 'dateFormatPlaceholder',
}

export const MaskedDatePicker = (props: Props) => {
  const { isMobileTouch } = useMobileTouch()

  const maskInput = props.maskInput || DefaultMaskInput

  /* Styles */
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'datePicker')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'datePicker')(props.style)

  const textInputStyle =
    (props.style && {
      wrapper: props.style.inputWrapper,
      disabledInput: props.style.disabledInput,
      errorInput: props.style.errorInput,
    }) ||
    (!isMobileTouch && {
      wrapper: getInlineStyle('inputWrapper').style,
    }) ||
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
  const [open, setOpen] = React.useState(false)

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

  const dateFormat = props.dateFormat ?? 'dd.MM.yyyy'
  const value =
    !!props.value &&
    parseDate(props.value, dateFormat) !== 'Invalid Date' &&
    isValid(parseDate(props.value, dateFormat))
      ? props.value
      : null
  const parsedDate = parseDate(props.value, dateFormat)

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
            <TextInput
              onFocus={() => {
                setIsFocused(true)
                props.onFocus?.()
              }}
              onBlur={() => setIsFocused(false)}
              onChange={(v: any) => {
                try {
                  const dateValue = new Date(v)
                  props.onBlur(format(dateValue, dateFormat))
                } catch (err) {
                  props.onBlur(null)
                }
              }}
              dataTestId={props.dataTestId}
              error={props.error}
              hasFocus={props.hasFocus}
              inputType="date"
              placeholder="dateFormatPlaceholder"
              style={textInputStyle}
              value={value}
            />
          ) : (
            <>
              <MaskedInput
                hasFocus={props.hasFocus}
                onFocus={() => {
                  setIsFocused(true)
                  props.onFocus?.()
                }}
                onBlur={(v: string) => {
                  setIsFocused(false)
                  try {
                    const dateValue = parseDate(v, dateFormat)

                    if (dateValue.toString() === 'Invalid Date') {
                      throw 'Invalid Date'
                    } else {
                      props.onBlur(format(dateValue as Date, props.dateFormat))
                    }
                  } catch (err) {
                    if (err === 'Invalid Date') {
                      props.onBlur(null)
                    } else {
                      const testValue = parse(v, props.dateFormat || 'yyyy-MM-dd', new Date()) as
                        | Date
                        | 'Invalid Date'

                      if (testValue !== 'Invalid Date') {
                        props.onBlur(String(testValue))
                      } else {
                        props.onBlur(null)
                      }
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

              <DatePickerCalendarWrapper cssStyles={reactDatePickerStyle}>
                <ReactDatePicker
                  locale={locale}
                  open={open}
                  selected={parsedDate !== 'Invalid Date' ? parsedDate : new Date()}
                  onChange={(value: Date) => {
                    if (value !== null && isValid(value)) {
                      props.onBlur(format(value, dateFormat))
                    } else {
                      props.onBlur(null)
                    }
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
  & .react-datepicker {
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

const Div = createStyled('div')
const PlaceholderMobile = createStyled(styled.div`
  display: none;
`)
