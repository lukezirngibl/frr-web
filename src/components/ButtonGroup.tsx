import React from 'react'
import { useAppTheme, AppTheme } from '../theme/theme'
import { useCSSStyles, createStyled, useInlineStyle } from '../theme/util'
import { P } from '../html'
import { Icon } from './Icon'

const Wrapper = createStyled('div')
const Item = createStyled('div')

export enum ButtonGroupType {
  Multi = 'Multi',
  Single = 'Single',
}

type Props = {
  items: Array<
    { value: string } & (
      | {
          label: string
        }
      | { icon: string }
    )
  >

  style?: Partial<AppTheme['buttonGroup']>
} & (
  | {
      type: ButtonGroupType.Multi
      value: Array<string>
      onChange: (value: Array<string>) => void
    }
  | {
      type: ButtonGroupType.Single
      value: string
      onChange: (value: string) => void
    }
)

export const ButtonGroup = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'buttonGroup')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'buttonGroup')(props.style)

  return (
    <Wrapper {...getCSSStyle('wrapper')}>
      {props.items.map((b) => {
        const isItemActive =
          props.type === ButtonGroupType.Multi ? props.value.includes(b.value) : b.value === props.value
        return (
          <Item
            {...getCSSStyle({
              item: true,
              itemActive: isItemActive,
            })}
            value={b.value}
            onClick={() => {
              if (props.type === ButtonGroupType.Multi) {
                if (isItemActive) {
                  props.onChange(props.value.filter((v) => v !== b.value))
                } else {
                  props.onChange([...props.value, b.value])
                }
              } else {
                props.onChange(b.value)
              }
            }}
          >
            {'icon' in b ? (
              <Icon
                icon={b.icon}
                {...getInlineStyle({
                  icon: true,
                  iconActive: isItemActive,
                })}
              />
            ) : (
              <P
                label={b.label}
                {...getCSSStyle({
                  label: true,
                  labelActive: isItemActive,
                })}
              />
            )}
          </Item>
        )
      })}
    </Wrapper>
  )
}
