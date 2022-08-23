import {
  CoercedMenuPlacement,
  Options as ReactSelect_Options,
  FocusDirection as ReactSelect_FocusDirection,
  Options,
} from 'react-select'
import { OptionType } from '../../html'

// Common Props

export type Option = OptionType<string> & { data: any }
interface CategorizedOption {
  data: Option
  isDisabled: boolean
  isFocused: boolean
  isSelected: boolean
  label: string
  value: string
  index: number
}
export type Suggestions = Options<Option>

export type ClassNamesState = { [key: string]: boolean }
export type CX = (state: ClassNamesState, className?: string) => string

// Common
export interface CommonProps {
  cx: CX
  options: ReactSelect_Options<CategorizedOption>
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

export type FocusDirection = ReactSelect_FocusDirection

// Styles

export interface RectType {
  left: number
  right: number
  bottom: number
  height: number
  top: number
  width: number
}

// Menu State

export enum MenuActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  SET_SUGGESTIONS = 'SET_SUGGESTIONS',
  SET_FOCUSED_SUGGESTION = 'SET_FOCUSED_SUGGESTION',
}

export interface MenuAction {
  type: MenuActionType
  isLoading?: boolean
  suggestions?: Suggestions
  focusedSuggestion?: Option | null
  selectedSuggestion?: Option | null
}

export interface MenuState {
  isOpen: boolean
  isLoading: boolean
  suggestions: Suggestions
  focusedSuggestion: Option | null
}
