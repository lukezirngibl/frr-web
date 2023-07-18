import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import { CSSProperties } from 'styled-components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
)

type Props = {
  trigger: (props: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => React.ReactNode
  render: (p: { close: () => void }) => React.ReactNode
  style?: CSSProperties
  onClose?: () => void
  popOverStyle?: CSSProperties
}

export const SimplePopover = (props: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e: any) => {
    // move to props.onClose() in case propagation should be possible.
    e.stopPropagation()
    setAnchorEl(null)
    if (props.onClose) {
      props.onClose()
    }
  }

  const close = () => {
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
        <>{props.render({ close })}</>
      </Popover>
    </div>
  )
}
