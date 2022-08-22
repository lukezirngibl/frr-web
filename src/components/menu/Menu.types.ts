import { CoercedMenuPlacement, Options } from 'react-select'
import { OptionType } from '../../html'

// Common Props

export type Option = OptionType<string> & { data: any }

export type ClassNamesState = { [key: string]: boolean }
export type CX = (state: ClassNamesState, className?: string) => string

// Common
export interface CommonProps {
  cx: CX
  options: Options<Option>
}

export interface CommonPropsAndClassName extends CommonProps {
  className?: string | undefined
}

// Placement

export type MenuPlacement = CoercedMenuPlacement

export interface MenuPlacementState {
  placement: MenuPlacement | null
  maxHeight: number
}

// Styles

export interface RectType {
  left: number
  right: number
  bottom: number
  height: number
  top: number
  width: number
}
