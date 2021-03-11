import { Slider as MaterialSlider } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { P } from '../html'
import { getThemeContext, MaterialSliderStyles } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { Label, LabelProps } from './Label'

var formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const createSlider = (styles?: MaterialSliderStyles): unknown => {
  const materialStyles = styles || {}

  return withStyles({
    root: {
      color: '#FFC53D',
      height: 8,
      padding: '15px 0',
      ...(materialStyles.root || {}),
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#FFC53D',
      borderRadius: 12,
      marginTop: -9,
      marginLeft: -8,
      '&:focus, &:hover, &$active': {
        backgroundColor: 'rgb(230,170,59)',
      },
      ...(materialStyles.thumb || {}),
    },
    active: materialStyles.active || {},
    valueLabel: {
      left: 'calc(-50% + 12px)',
      top: -22,
      color: '#533603',
      '& *': {
        background: 'transparent',
        color: '#533603',
      },
      ...(materialStyles.valueLabel || {}),
    },
    track: {
      height: 8,
      ...(materialStyles.track || {}),
    },
    rail: {
      height: 8,
      opacity: 0.5,
      backgroundColor: 'rgba(0,0,0, 0.1)',
      ...(materialStyles.rail || {}),
    },
    mark: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      height: 8,
      width: 2,
      ...(materialStyles.mark || {}),
    },
    markLabel: {
      color: 'black',
      fontSize: 14,
      marginTop: 4,
      opacity: 1,
      ...(materialStyles.markLabel || {}),
    },
    markActive: {
      opacity: 1,
      backgroundColor: 'currentColor',
      ...(materialStyles.markLabel || {}),
    },
  } as any)(MaterialSlider)
}

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

export const Slider = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getSliderStyle = useInlineStyle(theme, 'slider')({})

  const [internalValue, setInternalValue] = React.useState(props.value)

  const onChange = useDebouncedCallback((v: number) => {
    props.onChange(v)
  }, 200)

  React.useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  console.log('MATERIAL STYLES', theme.materialSlider)

  const MaterialSlider = React.useMemo(() => createSlider(theme.materialSlider), [
    theme,
  ]) as any

  return (
    <div style={{ width: '100%' }}>
      {props.label && <Label {...props.label} />}
      <div style={getSliderStyle('wrapper')}>
        <div
          style={{
            flexDirection: props.reverse ? 'row-reverse' : 'row',
            ...getSliderStyle('valueWrapper'),
          }}
        >
          {props.prefix && (
            <P label={props.prefix} style={getSliderStyle('prefix')} />
          )}
          <p style={getSliderStyle('value')}>
            {props.isCurrency ? formatter.format(internalValue) : internalValue}
          </p>
        </div>

        <MaterialSlider
          value={internalValue}
          onChange={(e, v) => {
            setInternalValue(v as number)
            // @ts-ignore
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
    </div>
  )
}
