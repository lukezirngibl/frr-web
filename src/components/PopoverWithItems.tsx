import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { SimplePopover } from './PopOver'
import { createStyled, useInlineStyle } from '../theme/util'
import { P } from '../html'
import { useAppTheme, AppTheme } from '../theme/theme'

const Wrapper = createStyled('div')

const Item = createStyled('div')

export type Props = {
  trigger: (c: any) => React.ReactNode
  items: Array<{ label: string; onClick: () => void; disabled?: boolean }>
  style?: Partial<AppTheme['popoverWithItems']>
}

export const PopoverWithItems = (props: Props) => {
  const theme = useAppTheme()
  const getInlineStyle = useInlineStyle(theme, 'popoverWithItems')(props.style)

  return (
    <SimplePopover
      style={getInlineStyle(['popover']).style}
      trigger={props.trigger}
      render={({ close }) => (
        <Wrapper>
          {props.items.map((i, index) => (
            <Item
              key={index}
              onClick={() => {
                // c.onClose()
                i.onClick()
                close()
              }}
              {...getInlineStyle(['item'])}
            >
              <P label={i.label} {...getInlineStyle(['itemLabel'])} />
            </Item>
          ))}
        </Wrapper>
      )}
    />
  )
}
