import MaterialSlider from '@mui/material/Slider'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebouncedCallback } from 'use-debounce'
import { FormFieldType } from '../form/components/types'
import { Div, P } from '../html'
import {
  ComponentTheme,
  MaterialSliderStyles,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { CurrencyInput } from './CurrencyInput'
import { Label, LabelProps } from './Label'

const Formatter = new Intl.NumberFormat('de-CH', {
  // style: 'currency',
  currency: 'CHF', // TODO: Use currency from finObj
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const ValueText = createStyled('p')

const getPseudoElementStyle = (pseudStyle: string, styles?: MaterialSliderStyles) => {
  const thumbStyles = styles.thumb || {}
  const thumbFocusStyles = styles.thumbFocus || {}

  const pseudoStyles = {
    ...thumbStyles[pseudStyle],
    backgroundColor:
      thumbStyles[pseudStyle]?.backgroundColor || thumbStyles[pseudStyle]?.background || '#FFC53D',

    '&.Mui-focus': thumbFocusStyles,
  }

  return pseudoStyles
}

const getMuiSliderStyles = (styles?: MaterialSliderStyles) => {
  const materialStyles = styles || {}

  const mappedStyles = {
    color: '#FFC53D',
    height: 8,
    padding: '15px 0',
    ...(materialStyles.root || {}),

    '&.Mui-active': materialStyles.active || {},

    '& .MuiSlider-thumb': {
      display: 'block',
      height: 24,
      width: 24,
      backgroundColor: '#FFC53D',
      borderRadius: 12,
      '&.Mui-focusVisible': getPseudoElementStyle(':focus', materialStyles),
      '&:active': getPseudoElementStyle(':active', materialStyles),
      '&:focus': getPseudoElementStyle(':focus', materialStyles),
      '&:hover': getPseudoElementStyle(':hover', materialStyles),
      ...(materialStyles.thumb || {}),
    },

    '& .MuiSlider-valueLabel': {
      left: 'calc(-50% + 12px)',
      top: -22,
      color: '#533603',
      '& *': {
        background: 'transparent',
        color: '#533603',
      },
      ...(materialStyles.valueLabel || {}),
    },

    '& .MuiSlider-mark': {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      height: 8,
      width: 2,
      ...(materialStyles.mark || {}),
      '&.Mui-active': {
        opacity: 1,
        backgroundColor: 'currentColor',
        ...(materialStyles.markActive || {}),
      },
    },
    '& .MuiSlider-markLabel': {
      color: 'black',
      fontSize: 14,
      marginTop: 4,
      opacity: 1,
      ...(materialStyles.markLabel || {}),
    },

    '& .MuiSlider-track': {
      height: 8,
      ...(materialStyles.track || {}),
    },
    '& .MuiSlider-rail': {
      height: 8,
      opacity: 0.5,
      backgroundColor: 'rgba(0,0,0, 0.1)',
      ...(materialStyles.rail || {}),
    },
  }

  return mappedStyles
}

export type Props = {
  ariaLabelledby?: any
  dataTestId?: string
  defaultValue?: number
  editable?: boolean
  hasFocus?: boolean
  isCurrency?: boolean
  isEditable?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  initialValue?: number | null
  inputStep?: number | null
  inputMin?: number | null
  inputMax?: number | null
  marks?: Array<{ label: string; value: number }>
  max: number
  min: number
  onChangeInputType?: (inputType: FormFieldType) => void
  onChange: (num: number) => void
  placeholder?: string
  prefix?: string
  postfix?: string
  size?: 'small' | 'medium'
  scale?: any
  step: number | null
  style?: Partial<ComponentTheme['slider']>
  value: number | null
}

export const Slider = (props: Props) => {
  const { t } = useTranslation(props.localeNamespace)
  const theme = useComponentTheme()

  const getInlineStyles = useInlineStyle(theme, 'slider')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'slider')(props.style)

  const [initialValue, setInitialValue] = React.useState(props.value)
  const [internalValue, setInternalValue] = React.useState(
    props.initialValue !== undefined ? props.initialValue : props.value,
  )

  const onChange = useDebouncedCallback(({ num }: { num: number }) => {
    props.onChange(num)
  }, 200)

  React.useEffect(() => {
    if (initialValue !== props.value) {
      setInternalValue(props.value)
      setInitialValue(props.value)
    }
  }, [props.value, initialValue])

  // React.useEffect(() => {
  //   if (
  //     props.initialValue !== undefined &&
  //     props.defaultValue !== undefined &&
  //     (props.value === null || props.value === undefined)
  //   ) {
  //     props.onChange(props.defaultValue)
  //   }
  // }, [])

  // const MaterialSlider = React.useMemo(() => createSlider(theme.materialSlider), [theme])
  const materialStyles = getMuiSliderStyles(theme.materialSlider)

  const prefix =
    (props.isCurrency && t('currency.CHF')) || (props.prefix && t(props.prefix)) || undefined

  const labelStyle = getInlineStyles('label', {}, undefined, false, true)

  // Input field type changes
  const [inputFieldType, setInputFieldType] = useState<FormFieldType | null>(null)
  useEffect(() => {
    if (inputFieldType !== null) {
      props.onChangeInputType?.(inputFieldType)
    }
  }, [inputFieldType])

  return (
    <Div {...getCSSStyles('outerWrapper', { width: '100%' })}>
      {props.label && <Label {...props.label} style={{ wrapper: labelStyle.style }} />}
      <Div {...getCSSStyles('wrapper')} dataTestId={props.dataTestId}>
        <Div {...getCSSStyles({ valueWrapper: true, valueWrapperEditable: props.isEditable })}>
          {props.isEditable ? (
            <CurrencyInput
              dataTestId="slider-value"
              hasFocus={props.hasFocus}
              marks={props.marks ? props.marks.map((m) => m.value) : undefined}
              max={props.inputMax !== undefined ? props.inputMax : props.max}
              min={props.inputMin !== undefined ? props.inputMin : props.min}
              onChange={({ num }) => {
                onChange({ num })
                setInputFieldType(FormFieldType.CurrencyInput)
              }}
              placeholder={props.placeholder}
              postfix={props.postfix}
              prefix={prefix}
              step={props.inputStep || props.step}
              style={{
                wrapperCurrency: {
                  marginRight: 'auto',
                  ...getInlineStyles('inputWrapper').style,
                },
                input: getInlineStyles('input').style,
                prefix: getInlineStyles('prefix').style,
                postfix: getInlineStyles('postfix').style,
              }}
              value={internalValue}
            />
          ) : (
            <>
              {prefix && (
                <P label={prefix} localeNamespace={props.localeNamespace} {...getCSSStyles('prefix')} />
              )}
              <ValueText
                {...getCSSStyles('value')}
                dataTestId="slider-value"
                data-value={internalValue}
              >
                {props.isCurrency ? Formatter.format(internalValue) : internalValue}
              </ValueText>
              {props.postfix && (
                <P
                  label={props.postfix}
                  localeNamespace={props.localeNamespace}
                  {...getCSSStyles('postfix')}
                />
              )}
            </>
          )}
        </Div>

        <MaterialSlider
          aria-labelledby={props.ariaLabelledby}
          marks={props.marks}
          max={props.max}
          min={props.min}
          onChange={(_: Event, value: number) => {
            setInternalValue(value)
            onChange({ num: value })
            setInputFieldType(FormFieldType.Slider)
          }}
          size={props.size || 'medium'}
          scale={props.scale}
          step={props.step}
          tabIndex={-1}
          // slots={{ thumb: ThumbComponent }}
          sx={materialStyles}
          value={internalValue}
        />
      </Div>
    </Div>
  )
}
