import React, { useEffect, useReducer, useRef } from 'react'
import { Options } from 'react-select'
import styled from 'styled-components'
import { TextInputAutosuggestField } from '../form/components/types'
import { ComponentTheme } from '../theme/theme.components'
import { Menu } from './menu/Menu'
import { CommonProps, MenuAction, MenuActionType, MenuState, Option } from './menu/Menu.types'
import { classNames, MAX_HEIGHT, MIN_HEIGHT, onKeyDown } from './menu/Menu.utils'
import { MenuOption } from './menu/MenuOption'
import { MenuPortal } from './menu/MenuPortal'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Suggestions = Options<Option>

// ==============================
// State handler
// ==============================

const reducer = (state: MenuState, action: MenuAction) => {
  switch (action.type) {
    case MenuActionType.OPEN:
      return {
        ...state,
        focusedSuggestion: action.focusedSuggestion || null,
        isLoading: true,
        isOpen: true,
        selectedSuggestion: null,
      }

    case MenuActionType.CLOSE:
      return {
        ...state,
        focusedSuggestion: null,
        isLoading: false,
        isOpen: false,
        selectedSuggestion: action.selectedSuggestion || null,
      }

    case MenuActionType.SET_SUGGESTIONS:
      return {
        ...state,
        isLoading: false,
        suggestions: action.suggestions,
      }

    case MenuActionType.SET_FOCUSED_SUGGESTION:
      return {
        ...state,
        focusedSuggestion: action.focusedSuggestion,
      }

    case MenuActionType.RESET:
      return {
        focusedSuggestion: null,
        isLoading: false,
        isOpen: false,
        selectedSuggestion: null,
        suggestions: [],
      }

    default:
      return state
  }
}

// ==============================
// Text Input component
// ==============================

export type Props = {
  onLoadSuggestions: (value: string) => Promise<Options<Option>>
  onSuggestionSelected?: (suggestion: Option) => void
} & TextInputProps

export const TextInputAutosuggest = (props: Props) => {
  const { value, onLoadSuggestions, onSuggestionSelected, ...inputProps } = props
  const controlRef = useRef<HTMLInputElement>(null)
  // const menuListRef = useRef<HTMLElement>(null)
  // const focusedOptionRef = useRef<HTMLElement>(null)

  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    isLoading: false,
    suggestions: [],
    focusedSuggestion: null,
    selectedSuggestion: null,
  })

  const onChange = (newValue: string) => {
    props.onChange?.(newValue)

    if (!state.isOpen) {
      if (state.selectedSuggestion) {
        dispatch({ type: MenuActionType.RESET })
      } else {
        dispatch({ type: MenuActionType.OPEN })
      }
    }
  }

  useEffect(() => {
    if (value === '') {
    } else if (state.isOpen) {
      onLoadSuggestions(value).then((suggestions) => {
        dispatch({ type: MenuActionType.SET_SUGGESTIONS, suggestions, isLoading: false })
      })
    }
  }, [value, state.isOpen])

  const onBlur = (value: string) => {
    props.onBlur?.(value)
    // // HACK: Wait for select menu to close and pass option to parent before closing menu
    // setTimeout(() => {
    //   dispatch({ type: MenuActionType.CLOSE, isLoading: false })
    // }, 100)
  }

  // ==============================
  // Methods
  // ==============================

  const focusInput = () => {
    if (controlRef) {
      controlRef.current?.focus()
    }
  }
  const blurInput = (value: string) => {
    if (controlRef) {
      controlRef.current.blur()
    }
    props.onBlur?.(value)
  }

  // ==============================
  // Select Option Handler
  // ==============================

  const onSelectOption = (option: Option) => {
    dispatch({ type: MenuActionType.CLOSE, selectedSuggestion: option })
  }

  useEffect(() => {
    if (state.selectedSuggestion) {
      onSuggestionSelected?.(state.selectedSuggestion)
      blurInput(state.selectedSuggestion.value)
    }
  }, [state.selectedSuggestion])

  let blockOptionHover = false

  const onSuggestionFocused = (focusedSuggestion: Option) => {
    if (!blockOptionHover && state.focusedSuggestion !== focusedSuggestion) {
      dispatch({ type: MenuActionType.SET_FOCUSED_SUGGESTION, focusedSuggestion })
    }
  }

  return (
    <TextInput
      {...inputProps}
      autocomplete="off"
      inputRef={controlRef}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown(props, state, dispatch)}
      value={value}
    >
      <StlyedContainer>
        <AutosuggestMenu
          controlRef={controlRef.current}
          isLoading={state.isLoading}
          menuIsOpen={state.isOpen}
          menuPortalTarget={document.body}
          menuShouldBlockScroll
          name={props.name}
          onOptionSelected={onSelectOption}
          onOptionFocused={onSuggestionFocused}
          options={buildCategorizedOptions(props, state)}
          value={props.value}
        />
      </StlyedContainer>
    </TextInput>
  )
}

// ==============================
// Autosuggest Menu component
// ==============================

export interface AutosuggestMenuProps {
  controlRef: HTMLDivElement | null
  isLoading: boolean
  loadingMessage?: string
  menuIsOpen?: boolean
  menuPortalTarget?: HTMLElement
  menuShouldBlockScroll?: boolean
  name: string
  noOptionsMessage?: string
  onOptionFocused: (option: Option) => void
  onOptionSelected: (option: Option) => void
  options: Options<CategorizedOption>
  styles?: Partial<ComponentTheme['select']>
  value: string
}

interface CategorizedOption {
  data: Option
  isDisabled: boolean
  isFocused: boolean
  isSelected: boolean
  label: string
  value: string
  index: number
}

const buildCategorizedOptions = (props: Props, state: MenuState): Array<CategorizedOption> =>
  state.suggestions.map((option, optionIndex) => ({
    data: option,
    isDisabled: !!option.disabled,
    isFocused: state.focusedSuggestion === option,
    isSelected: props.value !== null && option.value === props.value,
    label: option.label,
    value: option.value,
    index: optionIndex,
  }))

let instanceId = 1

const AutosuggestMenu = (props: AutosuggestMenuProps) => {
  const instancePrefix = 'react-select-' + (props.name || ++instanceId)

  const getElementId = (
    element: 'group' | 'input' | 'listbox' | 'option' | 'placeholder' | 'live-region',
  ) => {
    return `${instancePrefix}-${element}`
  }

  // Refs
  // ------------------------------
  if (!props.menuIsOpen) return null

  const commonProps: CommonProps = {
    cx: (...args) => classNames('', ...args),
    options: props.options,
  }

  const renderOption = (categorizedOption: CategorizedOption, id: string) => {
    const { data, isDisabled, isFocused, isSelected } = categorizedOption
    const onSelect = isDisabled ? undefined : () => props.onOptionSelected(data)
    const onHover = isDisabled ? undefined : () => props.onOptionFocused(data)

    const optionId = `${getElementId('option')}-${id}`

    return (
      <MenuOption
        {...commonProps}
        id={optionId}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        key={optionId}
        onHover={onHover}
        onSelect={onSelect}
      >
        {categorizedOption.label}
      </MenuOption>
    )
  }

  let menuUI: React.ReactNode

  if (props.options.length > 0) {
    menuUI = props.options.map((option) => {
      return renderOption(option, `${option.index}`)
    })
  } else if (props.isLoading) {
    const message = props.loadingMessage || 'Loading...'
    if (message === null) return null
    menuUI = (
      <MenuOption {...commonProps} id="loading-option" isDisabled>
        {message}
      </MenuOption>
    )
  } else {
    const message = props.noOptionsMessage || 'No options'
    if (message === null) return null
    menuUI = (
      <MenuOption {...commonProps} id="no-option" isDisabled>
        {message}
      </MenuOption>
    )
  }

  const menuElement = (
    <Menu
      {...commonProps}
      minMenuHeight={MIN_HEIGHT}
      maxMenuHeight={MAX_HEIGHT}
      fieldHeight={38}
      isLoading={props.isLoading}
    >
      {menuUI}
    </Menu>
  )

  // positioning behaviour is almost identical for portalled and fixed,
  // so we use the same component. the actual portalling logic is forked
  // within the component based on `menuPosition`
  return props.menuPortalTarget ? (
    <MenuPortal {...commonProps} appendTo={props.menuPortalTarget} controlElement={props.controlRef}>
      {menuElement}
    </MenuPortal>
  ) : (
    menuElement
  )
}

// ==============================
// Styled components
// ==============================

const StlyedContainer = styled.div`
  position: absolute;
  width: 100%;
  min-width: 180px;
  left: 0;
  bottom: 0;
`
