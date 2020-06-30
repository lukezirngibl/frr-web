import React, { Component } from 'react'
import { SimpleInterpolation } from 'styled-components'

import { DisplayType, Orientation } from './types'

export type RadioGroupProps = {
  onChange: (value: string) => void
  value: string
  label?: string
  options: Array<any>
  cssOverrides?: SimpleInterpolation
  orientation?: Orientation
  required?: boolean
  error: boolean
  display?: DisplayType
}

export class RadioGroup extends Component<RadioGroupProps> {
  static defaultProps = {
    display: DisplayType.Edit,
  }

  onChange = (key: string) => (bool: boolean) => {
    const { onChange } = this.props
    if (bool && onChange) {
      onChange(key)
    }
  }

  isChecked = (key: string) => this.props.value === key

  render() {
    const { onChange, ...otherProps } = this.props
    return <div />
  }
}
