import React from 'react'
import { P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { SimplePopover } from './PopOver'

const Wrapper = createStyled('div')

const Item = createStyled('div')

export type Props = {
  trigger: (c: any) => React.ReactNode
  items: Array<{ label: string; onClick: () => void; disabled?: boolean }>
  localeNamespace?: LocaleNamespace
  style?: Partial<ComponentTheme['popoverWithItems']>
}

export const PopoverWithItems = (props: Props) => {
  const theme = useComponentTheme()
  const getInlineStyle = useInlineStyle(theme, 'popoverWithItems')(props.style)
  const getCSSStyle = useCSSStyles(theme, 'popoverWithItems')(props.style)

  return (
    <SimplePopover
      style={getInlineStyle(['popover']).style}
      trigger={props.trigger}
      render={({ close }) => (
        <Wrapper>
          {props.items.map((item, index) => (
            <Item
              key={index}
              onClick={(e: any) => {
                // c.onClose()
                // Important otherwise parent components will receive the click event as well
                // e.g. Table row has an onClick handler and will be triggered as well
                e.stopPropagation()
                item.onClick()
                close()
              }}
              {...getCSSStyle(['item'])}
            >
              <P
                label={item.label}
                localeNamespace={props.localeNamespace}
                {...getCSSStyle(['itemLabel'])}
              />
            </Item>
          ))}
        </Wrapper>
      )}
    />
  )
}
