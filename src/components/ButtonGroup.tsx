import { FC } from 'react'
import { P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'

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
      | { Icon: FC<any> }
    )
  >

  style?: Partial<ComponentTheme['buttonGroup']>
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
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'buttonGroup')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'buttonGroup')(props.style)

  return (
    <Wrapper {...getCSSStyle('wrapper')}>
      {props.items.map((item) => {
        const isItemActive =
          props.type === ButtonGroupType.Multi
            ? props.value.includes(item.value)
            : item.value === props.value
        return (
          <Item
            {...getCSSStyle({
              item: true,
              itemActive: isItemActive,
            })}
            value={item.value}
            onClick={() => {
              if (props.type === ButtonGroupType.Multi) {
                if (isItemActive) {
                  props.onChange(props.value.filter((v) => v !== item.value))
                } else {
                  props.onChange([...props.value, item.value])
                }
              } else {
                props.onChange(item.value)
              }
            }}
          >
            {'Icon' in item ? (
              <item.Icon
                {...getInlineStyle({
                  icon: true,
                  iconActive: isItemActive,
                })}
              />
            ) : (
              <P
                label={item.label}
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
