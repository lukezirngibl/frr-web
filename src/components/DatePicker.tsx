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

const mapLanguageToLocale: { [k in Language]: Locale } = {
  [Language.DE]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
}

// position: absolute;
// top: 48px;
// right: 0px;
// z-index: 999;

// transform-origin: top center;
//   ${({ open }: { open: boolean }) =>
//     open
//       ? css`
//           opacity: 1;
//           pointer-events: all;
//           transform: scale(1, 1);
//         `
//       : css`
//           opacity: 0;
//           pointer-events: none;
//           transform: scale(0, 0);
//         `};
//   transition: opacity 0.17s ease-out, transform 0.17s ease-out;

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

  /* Date picker styles */

  & .react-datepicker__triangle {
    display: none !important;
  }
  & .react-datepicker-popper {
    width: 100%;
    transform: none !important;
    z-index: 999;
  }
  & .react-datepicker-wrapper {
    display: none !important;
  }

  & .react-datepicker  {
    font-family: var(--font-family);
    position: absolute;
    top: 48px;
    right: 0;
    animation: ${DatePickerAnimation} 0.15s ease-out;
  }

  & .react-datepicker__header {
    & .react-datepicker__current-month {
      font-size: var(--font-size-16);
    }
  }

  & .react-datepicker__header__dropdown {
    margin: 16px 0;
    & select {
      padding: 6px 8px 4px;
      font-size: var(--font-size-16);
    }
  }

  & .react-datepicker__day-name {
    font-size: var(--font-size-16);
    font-weight: 500;
    width: 32px;
    line-height: var(--font-size-16);
    padding: 9px 0 7px;
    margin: 4px;
  }
  & .react-datepicker__day {
    font-size: var(--font-size-16);
    width: 32px;
    line-height: var(--font-size-16);
    padding: 9px 0 7px;
    margin: 4px;
    border: 1px solid transparent;
    border-radius: 0;
    :hover {
      border-radius: 0;
      background-color: rgba(249, 193, 0, 0.6);
    }
  }
  & .react-datepicker__day--today {
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
  }
  & .react-datepicker__day--selected {
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    background-color: var(--color-background-primary);
    font-weight: 700;

    :hover {
      background-color: rgba(249, 193, 0, 0.6);
    }
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

  const locale = mapLanguageToLocale[language]

  // const { isMobileTouch } = useMobileTouch()
  const isMobileTouch = false

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
          open && setOpen(false)
        }}
      >
        <div {...getStyle('wrapper')}>
          <TextInput
            onChange={() => {}}
            onBlur={(v) => {
              try {
                const value = parse(v, 'P', new Date()) as Date | 'Invalid Date'
                onChange(value as Date)
              } catch (err) {
                onChange(null)
              }
            }}
            inputType={isMobileTouch ? 'date' : 'text'}
            placeholder={dateFormat.toLocaleUpperCase()}
            value={props.value ? format(props.value, 'P', { locale }) : null}
            dataTestId={props.dataTestId}
          />

          <DatePickerIconWrapper
            onClick={() => {
              setOpen(!open)
            }}
            {...getStyle('iconWrapper')}
          >
            <div {...getStyle('hook1')} />
            <div {...getStyle('hook2')} />
            <Icon icon="calendar_today" size={16} />
          </DatePickerIconWrapper>

          <DatePickerCalendarWrapper>
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

          {/* !isMobileTouch && (
            <DatePickerCalendarWrapper
              open={open}
            >
              <ReactDatePicker
                locale={language}
                open={open}
                selected={value}
                onChange={(v: Date) => {
                  onChange(v)
                  setOpen(false)
                }}
                inline
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                {...props.datePickerProps}
              />
            </DatePickerCalendarWrapper>
              ) */}
        </div>
      </ClickAwayListener>
    </>
  )
}
