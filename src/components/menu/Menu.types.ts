import { CSSObject } from '@emotion/react'
import { ReactNode, RefCallback } from 'react'
import { CoercedMenuPlacement, MenuPosition, Options, Theme } from 'react-select'
import { OptionType } from '../../html'

// Common Props

export type Option = OptionType<string>

export type ClassNamesState = { [key: string]: boolean }
export type CX = (state: ClassNamesState, className?: string) => string

export interface CommonProps {
  cx: CX
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: GetStyles
  options: Options<Option>
  theme: Theme
}

export interface CommonPropsAndClassName extends CommonProps {
  className?: string | undefined
}

// Component Props

export interface MenuProps extends CommonPropsAndClassName {
  /** Reference to the internal element, consumed by the MenuPlacer component */
  innerRef: RefCallback<HTMLDivElement>
  innerProps: JSX.IntrinsicElements['div']
  isLoading: boolean
  placement: CoercedMenuPlacement
  /** The children to be rendered. */
  children: ReactNode
}

export interface MenuListProps extends CommonPropsAndClassName {
  /** Set the max height of the Menu component  */
  maxHeight: number
  /** The children to be rendered. */
  children: ReactNode
  /** Inner ref to DOM ReactNode */
  innerRef: RefCallback<HTMLDivElement>
  /** The currently focused option */
  focusedOption: Option
  /** Props to be passed to the menu-list wrapper. */
  innerProps: JSX.IntrinsicElements['div']
}

export interface MenuOptionProps extends CommonPropsAndClassName {
  /** The children to be rendered. */
  children: ReactNode
  /** Inner ref to DOM Node */
  innerRef: RefCallback<HTMLDivElement>
  /** props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div']
  /** Text to be displayed representing the option. */
  label: string
  /** Type is used by the menu to determine whether this is an option or a group.
    In the case of option this is always `option`. **/
  type: 'option'
  /** The data of the selected option. */
  data: Option
  /** Whether the option is disabled. */
  isDisabled: boolean
  /** Whether the option is focused. */
  isFocused: boolean
  /** Whether the option is selected. */
  isSelected: boolean
}

export interface MenuPortalProps extends CommonPropsAndClassName {
  appendTo: HTMLElement | undefined
  children: ReactNode // ideally Menu<MenuProps>
  controlElement: HTMLDivElement | null
  innerProps: JSX.IntrinsicElements['div']
}

export interface NoticeProps extends CommonPropsAndClassName {
  /** The children to be rendered. */
  children: ReactNode
  /** Props to be passed on to the wrapper. */
  innerProps: JSX.IntrinsicElements['div']
}

export interface PortalStyleArgs {
  offset: number
  position: MenuPosition
  rect: RectType
}

interface PlacerProps {
  placement: CoercedMenuPlacement
  maxHeight: number
}

interface ChildrenProps {
  ref: RefCallback<HTMLDivElement>
  placerProps: PlacerProps
}

export interface MenuPlacerProps extends CommonProps {
  /** Set the max height of the Menu component  */
  maxHeight: number
  /** The children to be rendered. */
  children: (childrenProps: ChildrenProps) => ReactNode
}

// Styles

export interface StylesProps {
  loadingMessage: NoticeProps
  menu: MenuProps
  menuList: MenuListProps
  menuPortal: PortalStyleArgs
  noOptionsMessage: NoticeProps
  option: MenuOptionProps
}

type StylesFunction<Props> = (props: Props) => CSSObjectWithLabel
export type StylesFunctions = {
  [K in keyof StylesProps]: StylesFunction<StylesProps[K]>
}

export type StylesConfigFunction<Props> = (base: CSSObjectWithLabel, props: Props) => CSSObjectWithLabel
export type StylesConfig = {
  [K in keyof StylesProps]?: StylesConfigFunction<StylesProps[K]>
}

export type GetStyles = <Key extends keyof StylesProps>(
  propertyName: Key,
  props: StylesProps[Key],
) => CSSObjectWithLabel

export interface RectType {
  left: number
  right: number
  bottom: number
  height: number
  top: number
  width: number
}

export type CSSObjectWithLabel = CSSObject & { label?: string }

// Menu Option

export interface MenuOption {
  readonly label: string
  readonly value: string
}