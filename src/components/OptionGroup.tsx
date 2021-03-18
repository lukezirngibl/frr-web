import React from 'react'
import styled from 'styled-components'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle, useCSSStyles } from '../theme/util'
import { Options } from '../util'
import { Label, LabelProps } from './Label'
import { P } from '../html'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.inactive:last-child {
    border-right-width: 0 !important;
  }
`

export type Props = {
  label?: LabelProps
  onChange: (v: string) => void
  value: string | null
  options: Options<string>
  disabled?: boolean
  style?: Partial<AppTheme['optionGroup']>
  error?: boolean
  dataTestId?: string
}

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.options === nextProps.options
  )
}

export const OptionGroup = React.memo((props: Props) => {
  const theme = useAppTheme()

  const getInlineStyle = useInlineStyle(theme, 'optionGroup')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'optionGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        {...getInlineStyle({
          wrapper: true,
          errorWrapper: props.error,
        })}
      >
        {props.options.map((item) => (
          <Item
            className={item.value === props.value ? 'active' : 'inactive'}
            key={item.value}
            onClick={() => {
              props.onChange(item.value)
            }}
            data-test-id={`${props.dataTestId}:${item.value}`}
            {...getInlineStyle({
              item: true,
              itemActive: item.value === props.value,
            })}
          >
            <P
              {...getCSSStyles({
                label: true,
                labelActive: item.value === props.value,
              })}
              label={item.label}
            />
          </Item>
        ))}
      </Wrapper>
    </>
  )
}, areEqual)
