import React, { Fragment, ReactElement, ReactNode, RefCallback, useRef } from 'react'
import { CoercedMenuPlacement } from 'react-select'
import styled, { css } from 'styled-components'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { CommonPropsAndClassName } from './Menu.types'
import { MenuPlacer, usePortalPlacementContext } from './MenuPortal'
import useScrollCapture from './useScrollCapture'
import useScrollLock from './useScrollLock'

const alignToControl = (placement: CoercedMenuPlacement) => {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' }
  return placement ? placementToCSSProp[placement] : 'bottom'
}

export interface MenuProps extends CommonPropsAndClassName {
  children: ReactNode
  fieldHeight: number
  isLoading: boolean
  maxMenuHeight: number
  menuShouldBlockScroll?: boolean
  minMenuHeight: number
  style?: Partial<ComponentTheme['select']>
}

export const Menu = (props: MenuProps) => {
  const commonProps = { className: props.className, cx: props.cx }

  // Style
  const theme = useComponentTheme()
  const cssStyles = useCSSStyles(theme, 'select')(props.style)

  // Refs
  const menuListRef = useRef<HTMLDivElement>(null)
  const getMenuListRef: RefCallback<HTMLDivElement> = (ref) => {
    menuListRef.current = ref
  }

  return (
    <MenuPlacer maxMenuHeight={props.maxMenuHeight} fieldHeight={38}>
      {({ ref, placerProps: { placement, maxHeight } }) => {
        return (
          <StyledMenu
            {...cssStyles('menu')}
            align={alignToControl(placement)}
            className={props.cx({ menu: true }, props.className)}
            label="menu"
            ref={ref}
          >
            <ScrollManager lockEnabled={props.menuShouldBlockScroll} captureEnabled={false}>
              {(scrollTargetRef) => (
                <MenuList
                  {...commonProps}
                  innerRef={(instance) => {
                    getMenuListRef(instance)
                    scrollTargetRef(instance)
                  }}
                  maxMenuHeight={maxHeight}
                  options={props.options}
                >
                  {props.children}
                </MenuList>
              )}
            </ScrollManager>
          </StyledMenu>
        )
      }}
    </MenuPlacer>
  )
}

const StyledMenu = createStyled(styled.div<{ align: CoercedMenuPlacement }>`
  ${(props) =>
    css`
      ${[props.align]}: 100%;
    `};
  backgroundColor: colors.neutral0,
  borderRadius: borderRadius,
  boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
  marginBottom: spacing.menuGutter,
  marginTop: spacing.menuGutter,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
`)

// ==============================
// Menu List
// ==============================

export interface MenuListProps extends CommonPropsAndClassName {
  maxMenuHeight: number
  children: ReactNode
  innerRef: RefCallback<HTMLDivElement>
}

export const MenuList = (props: MenuListProps) => {
  const { children, className, cx, innerRef, maxMenuHeight } = props

  return (
    <StyledMenuList
      maxMenuHeight={maxMenuHeight}
      className={cx({ 'menu-list': true }, className)}
      ref={innerRef}
    >
      {children}
    </StyledMenuList>
  )
}

const StyledMenuList = styled.div<{ maxMenuHeight: number }>`
  max-height: ${(props) => props.maxMenuHeight}px;
  overflow-y: auto;
  padding-bottom: baseUnit;
  padding-oop: baseUnit;
  position: relative; /* required for offset[Height, Top] > keyboard scroll */
  webkit-overflow-scrolling: touch;
`

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
