import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { SimplePopover } from './PopOver'

const UserDropdown = styled.div`
  width: 168px;
`

const DropdownItem = styled.div`
  dispaly: flex;
  align-items: center;
  width: 100%;
  font-weight: 400;
  height: 42px;
  line-height: 42px;
  padding: 0 16px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`

type Props = {
  trigger: (c: any) => React.ReactNode
  items: Array<{ label: string; onClick: () => void; disabled?: boolean }>
  style?: CSSProperties
}

export const PopoverWithItems = (props: Props) => {
  return (
    <SimplePopover
      style={props.style}
      trigger={props.trigger}
      render={({ close }) => (
        <UserDropdown>
          {props.items.map((i, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                // c.onClose()
                i.onClick()
                close()
              }}
              style={i.disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
              {i.label}
            </DropdownItem>
          ))}
        </UserDropdown>
      )}
    />
  )
}
