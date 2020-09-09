import React, { Component } from 'react'
import { StrictInputProps } from 'semantic-ui-react'
import { range } from 'fp-ts/lib/Array'
import styled from 'styled-components'
import { Lens } from 'monocle-ts'
import { CommonTM } from '../translations'
import { DropdownNumber } from './DropdownNumber'
import { getDaysInMonth } from 'date-fns'

export type Date = {
  day: number
  month: number
  year: number
}

const DatePickerWrapper = styled.div`
  width: 100%;
  display: flex;

  & > div {
    &:nth-child(1) {
      flex-grow: 1;
    }
    &:nth-child(2) {
      flex-grow: 1.5;
    }
    &:nth-child(3) {
      flex-grow: 1.2;
    }
  }

  & > div {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

const MonthOptions: Array<keyof CommonTM> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const mkDateLens = Lens.fromProp<Date>()
const dayLens = mkDateLens('day')
const monthLens = mkDateLens('month')
const yearLens = mkDateLens('year')

export type DatePickerProps = {
  onChange: (value: string) => void
  value?: string
  required?: boolean
  error: boolean
  label: string
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>

const pad = (n: number, width: number) => {
  const z = '0'
  const str = n + ''
  return str.length >= width
    ? n
    : new Array(width - str.length + 1).join(z) + str
}

export class DatePicker extends Component<DatePickerProps, { hide: boolean }> {
  render() {
    const { onChange, value: externalValue, error, disabled } = this.props

    const e = externalValue || '1980-01-01'

    const value: Date = {
      day: Number(e.split('-')[2]),
      month: Number(e.split('-')[1]),
      year: Number(e.split('-')[0]),
    }

    const convertToString = (v: Date) =>
      `${v.year}-${pad(v.month, 2)}-${pad(v.day, 2)}`

    return (
      <DatePickerWrapper>
        <DropdownNumber<CommonTM>
          options={range(
            1,
            getDaysInMonth(new Date(value.year, value.month - 1)),
          ).map(o => ({
            label: (o as unknown) as keyof CommonTM,
            value: o,
          }))}
          onChange={v => onChange(convertToString(dayLens.set(v)(value)))}
          label="day"
          value={value.day}
          error={error}
          search
          disabled={disabled}
        />
        <DropdownNumber<CommonTM>
          options={MonthOptions.map((m, i) => ({
            label: m,
            value: i + 1,
          }))}
          onChange={v => onChange(convertToString(monthLens.set(v)(value)))}
          label="month"
          value={value.month}
          error={error}
          search
          disabled={disabled}
        />
        <DropdownNumber<CommonTM>
          options={range(1956, 2020).map(o => ({
            label: (o as unknown) as keyof CommonTM,
            value: o,
          }))}
          onChange={v => onChange(convertToString(yearLens.set(v)(value)))}
          label="year"
          value={value.year}
          error={error}
          search
          disabled={disabled}
        />
      </DatePickerWrapper>
    )
  }
}
