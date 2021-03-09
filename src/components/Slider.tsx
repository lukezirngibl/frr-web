import { Modal, Slider as MaterialSlider } from '@material-ui/core'
import React from 'react'
import { CSSProperties } from 'styled-components'
import { withStyles } from '@material-ui/styles'
import { getThemeContext } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { P } from '../html'
import { LabelProps, Label } from './Label'
import { useDebouncedCallback } from 'use-debounce/lib'

var formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const createSlider = (styles: { rail: CSSProperties; marks: CSSProperties }) =>
  withStyles({
    root: {
      color: '#FFC53D',
      height: 8,
      padding: '15px 0',
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#FFC53D',
      borderRadius: 12,
      // boxShadow: iOSBoxShadow,
      marginTop: -9,
      marginLeft: -8,
      '&:focus, &:hover, &$active': {
        backgroundColor: 'rgb(230,170,59)',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 12px)',
      top: -22,
      color: '#533603',
      '& *': {
        background: 'transparent',
        color: '#533603',
      },
    },
    track: {
      height: 8,
    },
    rail: {
      height: 8,
      opacity: 0.5,
      backgroundColor: 'rgba(0,0,0, 0.1)',
      ...styles.rail,
    },
    mark: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      height: 8,
      width: 2,
      ...styles.marks,
    },
    markLabel: {
      color: 'black',
      fontSize: 14,
      marginTop: 4,
      opacity: 1,
    },
    markActive: {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  } as any)(MaterialSlider)

export type Props = {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number | null
  editable?: boolean
  label?: LabelProps
  scale?: any
  ariaLabelledby?: any
  marks?: any
  reverse?: boolean
  prefix?: string
  isCurrency?: boolean
}

const IOSSlider = createSlider({
  rail: {},
  marks: {},
})

export const Slider = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = useInlineStyle(theme, 'slider')({})

  const [internalValue, setInternalValue] = React.useState(props.value)

  const onChange = useDebouncedCallback((v: number) => {
    props.onChange(v)
  }, 200)

  React.useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  return (
    <>
      {props.label && <Label {...props.label} />}
      <div style={getStyle('wrapper')}>
        <div
          style={{
            flexDirection: props.reverse ? 'row-reverse' : 'row',
            ...getStyle('valueWrapper'),
          }}
        >
          {props.prefix && (
            <P label={props.prefix} style={getStyle('prefix')} />
          )}
          <p style={getStyle('value')}>
            {props.isCurrency ? formatter.format(internalValue) : internalValue}
          </p>
        </div>

        <IOSSlider
          value={internalValue}
          onChange={(e, v) => {
            setInternalValue(v as number)
            onChange(v as number)
          }}
          min={props.min}
          max={props.max}
          step={props.step}
          scale={props.scale}
          aria-labelledby={props.ariaLabelledby}
          marks={props.marks}
        />
      </div>
    </>
  )
}
