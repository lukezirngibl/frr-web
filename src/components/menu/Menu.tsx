/** @jsx jsx */
import { jsx } from '@emotion/react'
import { createContext, Fragment, ReactElement, RefCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { CoercedMenuPlacement, MenuPlacement, MenuPosition, Theme } from 'react-select'
import {
  CSSObjectWithLabel,
  MenuListProps,
  MenuPlacerProps,
  MenuPortalProps,
  MenuProps,
  NoticeProps,
  PortalStyleArgs,
} from './Menu.types'
import { getBoundingClientObj, getMenuPlacement, MenuPlacementState } from './Menu.utils'
import useScrollCapture from './useScrollCapture'
import useScrollLock from './useScrollLock'

// ==============================
// Menu Portal
// ==============================

type setPortalPlacementType = (placement: MenuPlacement) => void
export const PortalPlacementContext = createContext<{ setPortalPlacement: setPortalPlacementType }>({
  setPortalPlacement: () => {},
})
export const usePortalPlacementContext = () => {
  const { setPortalPlacement } = useContext(PortalPlacementContext)
  return setPortalPlacement
}

export const menuPortalCSS = ({ rect, offset, position }: PortalStyleArgs): CSSObjectWithLabel => ({
  left: rect.left,
  position: position,
  top: offset,
  width: rect.width,
  zIndex: 1,
})

export const MenuPortal = (props: MenuPortalProps) => {
  const [placement, setPlacement] = useState<MenuPlacement>('bottom')

  // callback for occasions where the menu must "flip"
  const setPortalPlacement = (newPlacement: MenuPlacement) => {
    // avoid re-renders if the placement has not changed
    if (newPlacement !== placement) {
      setPlacement(newPlacement)
    }
  }

  const { appendTo, children, className, controlElement, cx, innerProps, getStyles } = props

  // bail early if required elements aren't present
  if (!appendTo || !controlElement) {
    return null
  }

  const rect = getBoundingClientObj(controlElement)
  const scrollDistance = window.pageYOffset
  const offset = rect[placement] + scrollDistance
  const state = { offset, position: 'absolute' as MenuPosition, rect }

  // same wrapper element whether fixed or portalled
  const menuWrapper = (
    <div
      css={getStyles('menuPortal', state)}
      className={cx(
        {
          'menu-portal': true,
        },
        className,
      )}
      {...innerProps}
    >
      {children}
    </div>
  )

  return (
    <PortalPlacementContext.Provider value={{ setPortalPlacement }}>
      {appendTo ? createPortal(menuWrapper, appendTo) : menuWrapper}
    </PortalPlacementContext.Provider>
  )
}

// ==============================
// Menu
// ==============================

// Menu Component
// ------------------------------

function alignToControl(placement: CoercedMenuPlacement) {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' }
  return placement ? placementToCSSProp[placement] : 'bottom'
}
const coercePlacement = (p: MenuPlacement) => (p === 'auto' ? 'bottom' : p)

export const menuCSS = ({
  placement,
  theme: { borderRadius, spacing, colors },
}: MenuProps): CSSObjectWithLabel => ({
  label: 'menu',
  [alignToControl(placement)]: '100%',
  backgroundColor: colors.neutral0,
  borderRadius: borderRadius,
  boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
  marginBottom: spacing.menuGutter,
  marginTop: spacing.menuGutter,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
})

// NOTE: internal only
export const MenuPlacer = (props: MenuPlacerProps) => {
  const [menuPlacementState, setMenuPlacementState] = useState<MenuPlacementState>({
    placement: null,
    maxHeight: props.maxHeight,
  })
  const setPortalPlacement = usePortalPlacementContext()

  const getPlacement: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) return

    const state = getMenuPlacement({
      menuEl: ref,
      maxHeight: props.maxHeight,
    })

    if (setPortalPlacement) setPortalPlacement(state.placement)

    setMenuPlacementState(state)
  }

  return (
    <Fragment>
      {props.children({
        ref: getPlacement,
        placerProps: { ...props, ...menuPlacementState },
      })}
    </Fragment>
  )
}

export const Menu = (props: MenuProps) => {
  const { children, className, cx, getStyles, innerRef, innerProps } = props

  return (
    <div
      css={getStyles('menu', props)}
      className={cx({ menu: true }, className)}
      ref={innerRef}
      {...innerProps}
    >
      {children}
    </div>
  )
}

// ==============================
// Menu List
// ==============================

export const menuListCSS = ({
  maxHeight,
  theme: {
    spacing: { baseUnit },
  },
}: MenuListProps): CSSObjectWithLabel => ({
  maxHeight,
  overflowY: 'auto',
  paddingBottom: baseUnit,
  paddingTop: baseUnit,
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
  WebkitOverflowScrolling: 'touch',
})

export const MenuList = (props: MenuListProps) => {
  const { children, className, cx, getStyles, innerProps, innerRef } = props
  return (
    <div
      css={getStyles('menuList', props)}
      className={cx({ 'menu-list': true }, className)}
      ref={innerRef}
      {...innerProps}
    >
      {children}
    </div>
  )
}

// ==============================
// Menu Notices
// ==============================

const noticeCSS = ({
  theme: {
    spacing: { baseUnit },
    colors,
  },
}: NoticeProps): CSSObjectWithLabel => ({
  color: colors.neutral40,
  padding: `${baseUnit * 2}px ${baseUnit * 3}px`,
  textAlign: 'center',
})
export const noOptionsMessageCSS = noticeCSS
export const loadingMessageCSS = noticeCSS

export const NoOptionsMessage = (props: NoticeProps) => {
  const { children, className, cx, getStyles, innerProps } = props
  return (
    <div
      css={getStyles('noOptionsMessage', props)}
      className={cx(
        {
          'menu-notice': true,
          'menu-notice--no-options': true,
        },
        className,
      )}
      {...innerProps}
    >
      {children}
    </div>
  )
}
NoOptionsMessage.defaultProps = {
  children: 'No options',
}

export const LoadingMessage = (props: NoticeProps) => {
  const { children, className, cx, getStyles, innerProps } = props
  return (
    <div
      css={getStyles('loadingMessage', props)}
      className={cx(
        {
          'menu-notice': true,
          'menu-notice--loading': true,
        },
        className,
      )}
      {...innerProps}
    >
      {children}
    </div>
  )
}
LoadingMessage.defaultProps = {
  children: 'Loading...',
}

// ==============================
// Scroll Manager
// ==============================

interface ScrollManagerProps {
  readonly children: (ref: RefCallback<HTMLElement>) => ReactElement
  readonly lockEnabled: boolean
  readonly captureEnabled: boolean
  readonly onBottomArrive?: (event: WheelEvent | TouchEvent) => void
  readonly onBottomLeave?: (event: WheelEvent | TouchEvent) => void
  readonly onTopArrive?: (event: WheelEvent | TouchEvent) => void
  readonly onTopLeave?: (event: WheelEvent | TouchEvent) => void
}

const blurSelectInput = () => document.activeElement && (document.activeElement as HTMLElement).blur()

export const ScrollManager = ({
  children,
  lockEnabled,
  captureEnabled = true,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: ScrollManagerProps) => {
  const setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive,
    onBottomLeave,
    onTopArrive,
    onTopLeave,
  })
  const setScrollLockTarget = useScrollLock({ isEnabled: lockEnabled })

  const targetRef: RefCallback<HTMLElement> = (element) => {
    setScrollCaptureTarget(element)
    setScrollLockTarget(element)
  }

  return (
    <Fragment>
      {lockEnabled && (
        <div
          onClick={blurSelectInput}
          css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
      )}
      {children(targetRef)}
    </Fragment>
  )
}
