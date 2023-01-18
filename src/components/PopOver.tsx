import React from 'react'
import Popover from '@mui/material/Popover'
import { CSSProperties } from 'styled-components'

type Props = {
  trigger: (props: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => React.ReactNode
  render: (p: { close: () => void }) => React.ReactNode
  style?: CSSProperties
  onClose?: () => void
  popOverStyle?: CSSProperties
}

export const SimplePopover = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    if (props.onClose) {
      props.onClose()
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div style={props.style}>
      {props.trigger({ onClick: handleClick })}
      <Popover
        id={id}
        style={props.popOverStyle}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <>{props.render({ close: handleClose })}</>
      </Popover>
    </div>
  )
}
