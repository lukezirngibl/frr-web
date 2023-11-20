import { FC } from 'react'
import { Div, P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'


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
    <Div {...getCSSStyle('wrapper')}>
      {props.items.map((buttonItem) => {
        const isItemActive =
          props.type === ButtonGroupType.Multi
            ? props.value.includes(buttonItem.value)
            : buttonItem.value === props.value
        return (
          <Div
            {...getCSSStyle({
              item: true,
              itemActive: isItemActive,
            })}
            value={buttonItem.value}
            onClick={() => {
              if (props.type === ButtonGroupType.Multi) {
                if (isItemActive) {
                  props.onChange(props.value.filter((v) => v !== buttonItem.value))
                } else {
                  props.onChange([...props.value, buttonItem.value])
                }
              } else {
                props.onChange(buttonItem.value)
              }
            }}
          >
            {'Icon' in buttonItem ? (
              <buttonItem.Icon
                {...getInlineStyle({
                  icon: true,
                  iconActive: isItemActive,
                })}
              />
            ) : (
              <P
                label={buttonItem.label}
                {...getCSSStyle({
                  label: true,
                  labelActive: isItemActive,
                })}
              />
            )}
          </Div>
        )
      })}
    </Div>
  )
}
