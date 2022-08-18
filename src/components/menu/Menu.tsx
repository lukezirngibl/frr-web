import '@emotion/react'
import { state } from 'fp-ts/lib/State'
import React, {
  createContext,
  Fragment,
  ReactElement,
  RefCallback,
  useContext,
  useRef,
  useState,
} from 'react'
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
  const menuPortalStyles = getStyles('menuPortal', state)
  const MenuWrapper = (
    <div
      style={menuPortalStyles}
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
      {appendTo ? createPortal(MenuWrapper, appendTo) : MenuWrapper}
    </PortalPlacementContext.Provider>
  )
}

// ==============================
// Menu
// ==============================

// Menu Component
// ------------------------------

const alignToControl = (placement: CoercedMenuPlacement) => {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' }
  return placement ? placementToCSSProp[placement] : 'bottom'
}
export type MenuCSSProps = { placement: CoercedMenuPlacement; theme: Theme }
export const menuCSS = ({
  placement,
  theme: { borderRadius, spacing, colors },
}: MenuCSSProps): CSSObjectWithLabel => ({
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
    placement: 'bottom',
    maxHeight: props.maxMenuHeight,
  })
  const setPortalPlacement = usePortalPlacementContext()

  const setMenuPlacementRefCallback: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) return

    const state = getMenuPlacement({
      menuEl: ref,
      maxHeight: props.maxMenuHeight,
    })

    if (setPortalPlacement) setPortalPlacement(state.placement)

    setMenuPlacementState(state)
  }

  return (
    <Fragment>
      {props.children({
        ref: setMenuPlacementRefCallback,
        placerProps: menuPlacementState,
      })}
    </Fragment>
  )
}

export const Menu = (props: MenuProps) => {
  const {
    children,
    className,
    cx,
    getStyles,
    innerProps,
    maxMenuHeight,
    menuShouldBlockScroll,
    options,
    theme,
  } = props
  const menuListRef = useRef<HTMLDivElement>(null)
  const getMenuListRef: RefCallback<HTMLDivElement> = (ref) => {
    menuListRef.current = ref
  }

  const commonProps = { className, cx, getStyles, innerProps }

  return (
    <MenuPlacer maxMenuHeight={maxMenuHeight}>
      {({ ref, placerProps: { placement, maxHeight } }) => {
        const menuStyles = getStyles('menu', { placement, theme })

        return (
          <div style={menuStyles} className={cx({ menu: true }, className)} {...innerProps}>
            <ScrollManager lockEnabled={menuShouldBlockScroll} captureEnabled={false}>
              {(scrollTargetRef) => (
                <MenuList
                  {...commonProps}
                  innerRef={(instance) => {
                    getMenuListRef(instance)
                    scrollTargetRef(instance)
                  }}
                  innerProps={{}}
                  maxMenuHeight={maxHeight}
                  options={options}
                  theme={theme}
                >
                  {children}
                </MenuList>
              )}
            </ScrollManager>
          </div>
        )
      }}
    </MenuPlacer>
  )
}

// ==============================
// Menu List
// ==============================

export const menuListCSS = ({
  maxMenuHeight,
  theme: {
    spacing: { baseUnit },
  },
}: MenuListProps): CSSObjectWithLabel => ({
  maxHeight: maxMenuHeight,
  overflowY: 'auto',
  paddingBottom: baseUnit,
  paddingTop: baseUnit,
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
  WebkitOverflowScrolling: 'touch',
})

export const MenuList = (props: MenuListProps) => {
  const { children, className, cx, getStyles, innerProps, innerRef } = props

  const menuListStyles = getStyles('menuList', props)

  return (
    <div
      style={menuListStyles}
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

  const noOptionsMessageStyles = getStyles('noOptionsMessage', props)
  return (
    <div
      style={noOptionsMessageStyles}
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

  const loadingMessageStyles = getStyles('loadingMessage', props)
  return (
    <div
      style={loadingMessageStyles}
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
          style={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
      )}
      {children(targetRef)}
    </Fragment>
  )
}
