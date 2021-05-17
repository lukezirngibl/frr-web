import React from 'react'
import { P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useInlineStyle, useCSSStyles } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { SimplePopover } from './PopOver'

const Wrapper = createStyled('div')

const Item = createStyled('div')

export type Props = {
  trigger: (c: any) => React.ReactNode
  items: Array<{ label: string; onClick: () => void; disabled?: boolean }>
  localeNamespace?: LocaleNamespace
  style?: Partial<AppTheme['popoverWithItems']>
}

export const PopoverWithItems = (props: Props) => {
  const theme = useAppTheme()
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
              onClick={() => {
                // c.onClose()
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
