import React from 'react'
import { Div, P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { LocaleNamespace } from '../translation'
import { SimplePopover } from './PopOver'

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
        <Div>
          {props.items.map((item, index) => (
            <Div
              key={index}
              onClick={(e: any) => {
                // c.onClose()
                // Important otherwise parent components will receive the click event as well
                // e.g. Table row has an onClick handler and will be triggered as well
                e.stopPropagation()
                if (!item.disabled) {
                  item.onClick()
                  close()
                }
              }}
              {...getCSSStyle({ item: true, itemDisabled: item.disabled })}
            >
              <P
                label={item.label}
                localeNamespace={props.localeNamespace}
                {...getCSSStyle(['itemLabel'])}
              />
            </Div>
          ))}
        </Div>
      )}
    />
  )
}
