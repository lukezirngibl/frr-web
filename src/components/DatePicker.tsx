import { format, isValid, parse } from 'date-fns'
import React from 'react'
import ClickAwayListener from 'react-click-away-listener'
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { mapLanguageToLocale, mapLanguageToLocaleString } from '../theme/language'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle, createStyled, useCSSStyles } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Icon } from './Icon'
import { Label, LabelProps } from './Label'
import { TextInput } from './TextInput'

const Wrapper = createStyled('div')
const DatePickerIconWrapper = createStyled('div')
const Hook1 = createStyled('div')
const Hook2 = createStyled('div')

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
  style?: Partial<AppTheme['datePicker']>
  value: Date | null
}

const parseDate = (value: string): Date | 'Invalid Date' => {
  let dateValue: Date

  if (value && value.includes('.')) {
    dateValue = parse(value, 'dd.MM.yyyy', new Date())
  } else {
    dateValue = parse(value, 'ddMMyyyy', new Date())
  }

  return dateValue
}

export const DatePicker = (props: Props) => {
  /* Styles */
  const theme = useAppTheme()
  const getStyle = useCSSStyles(theme, 'datePicker')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'datePicker')(props.style)

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

  const reactDatePickerStyle = theme.datePicker.reactDatePicker || ''

  /* Language and locales */

  const { i18n } = useTranslation()
  const language = i18n.language
  const locale = mapLanguageToLocale[language]

  const { isMobileTouch } = useMobileTouch()

  React.useEffect(() => {
    registerLocale(mapLanguageToLocaleString[language], mapLanguageToLocale[language])
  }, [language])

  const [open, setOpen] = React.useState(false)

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

  return (
    <>
      {props.label && <Label {...props.label} />}

      <ClickAwayListener
        onClickAway={() => {
          open && setOpen(false)
        }}
      >
        <Wrapper {...getStyle('wrapper')}>
          {isMobileTouch ? (
            <TextInput
              onChange={(v: any) => {
                try {
                  const dateValue = new Date(v)
                  props.onBlur(dateValue)
                } catch (err) {
                  props.onBlur(null)
                }
              }}
              hasFocus={props.hasFocus}
              error={props.error}
              inputType={'date'}
              value={props.value ? format(props.value, props.dateFormat) : null}
              dataTestId={props.dataTestId}
              style={textInputStyle}
            />
          ) : (
            <>
              <TextInput
                hasFocus={props.hasFocus}
                onChange={() => {}}
                onBlur={(v: any) => {
                  try {
                    const dateValue = parseDate(v)

                    if (dateValue === 'Invalid Date') {
                      throw 'Invalid Date'
                    }

                    props.onBlur(dateValue as Date)
                  } catch (err) {
                    const testValue = parse(v, props.dateFormat || 'yyyy-MM-dd', new Date()) as
                      | Date
                      | 'Invalid Date'

                    if (testValue !== 'Invalid Date') {
                      props.onBlur(testValue as Date)
                    } else {
                      props.onBlur(null)
                    }
                  }
                }}
                error={props.error}
                inputType={'text'}
                localeNamespace={props.localeNamespace}
                placeholder={'dateFormatPlaceholder'}
                value={isValid(props.value) ? format(props.value, 'dd.MM.yyyy') : null}
                dataTestId={props.dataTestId}
                style={textInputStyle}
              />

              <DatePickerIconWrapper
                onClick={() => {
                  setOpen(!open)
                }}
                {...styleIconWrapper}
              >
                <Hook1 {...styleIconHook1} />
                <Hook2 {...styleIconHook2} />
                <Icon icon="calendar_today" size={16} />
              </DatePickerIconWrapper>

              <DatePickerCalendarWrapper cssStyles={reactDatePickerStyle}>
                <ReactDatePicker
                  locale={locale}
                  open={open}
                  selected={props.value || new Date()}
                  onChange={(v: Date) => {
                    props.onBlur(v)
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
        </Wrapper>
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
