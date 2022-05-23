import { Slider as MaterialSlider } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { P } from '../html'
import {
  ComponentTheme,
  MaterialSliderStyles,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

var Formatter = new Intl.NumberFormat('de-CH', {
  // style: 'currency',
  currency: 'CHF', // TODO: Use currency from finObj
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const Wrapper = createStyled('div')
const ValueText = createStyled('p')

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
      '&:focus, &:hover, &:active': {
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
      ...(materialStyles.markActive || {}),
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
  localeNamespace?: LocaleNamespace
  scale?: any
  ariaLabelledby?: any
  marks?: any
  dataTestId?: string
  reverse?: boolean
  prefix?: string
  isCurrency?: boolean
  style?: Partial<ComponentTheme['slider']>
  defaultValue?: number
}

export const Slider = (props: Props) => {
  const theme = useComponentTheme()

  const getInlineStyles = useInlineStyle(theme, 'slider')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'slider')(props.style)

  const [internalValue, setInternalValue] = React.useState(props.value)

  const onChange = useDebouncedCallback((v: number) => {
    props.onChange(v)
  }, 200)

  React.useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  React.useEffect(() => {
    if ((props.value === null || props.value === undefined) && props.defaultValue !== undefined) {
      props.onChange(props.defaultValue)
    }
  }, [])

  const MaterialSlider = React.useMemo(() => createSlider(theme.materialSlider), [theme]) as any

  const prefix = props.isCurrency ? 'currency.CHF' : props.prefix

  const labelStyle = getInlineStyles('label')

  return (
    <Wrapper {...getCSSStyles('outerWrapper', { width: '100%' })}>
      {props.label && <Label {...props.label} style={{ wrapper: labelStyle.style }} />}
      <Wrapper {...getCSSStyles('wrapper')} data-test-id={props.dataTestId}>
        <Wrapper
          {...getCSSStyles('valueWrapper', {
            flexDirection: props.reverse ? 'row-reverse' : 'row',
          })}
        >
          {prefix && (
            <P label={prefix} localeNamespace={props.localeNamespace} {...getCSSStyles('prefix')} />
          )}
          <ValueText {...getCSSStyles('value')} data-test-id="slider-value" data-value={internalValue}>
            {props.isCurrency ? Formatter.format(internalValue) : internalValue}
          </ValueText>
        </Wrapper>

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
      </Wrapper>
    </Wrapper>
  )
}
