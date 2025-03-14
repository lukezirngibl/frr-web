import React, { useEffect, useReducer, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Options } from 'react-select'
import styled from 'styled-components'
import { ComponentTheme } from '../theme/theme.components'
import { LocaleNamespace } from '../translation'
import { TextInput, Props as TextInputProps } from './TextInput'
import { Menu } from './menu/Menu'
import { MENU_MAX_HEIGHT, MENU_MIN_HEIGHT } from './menu/Menu.constants'
import { CommonProps, MenuAction, MenuActionType, MenuState, Option } from './menu/Menu.types'
import { classNames, onKeyDown } from './menu/Menu.utils'
import { MenuOption } from './menu/MenuOption'
import { MenuPortal } from './menu/MenuPortal'
import { FieldInputType } from '../form/components/types'

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
        searchValue: action.searchValue || '',
      }

    case MenuActionType.CLOSE:
      return {
        ...state,
        focusedSuggestion: null,
        isLoading: false,
        isOpen: false,
        selectedSuggestion: action.selectedSuggestion || null,
      }

    case MenuActionType.SET_SEARCH: {
      return {
        ...state,
        searchValue: action.searchValue,
      }
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

    case MenuActionType.SET_SELECTED_SUGGESTION:
      return {
        ...state,
        selectedSuggestion: action.selectedSuggestion,
        suggestions: action.suggestions,
      }

    case MenuActionType.RESET:
      return {
        focusedSuggestion: null,
        isLoading: false,
        isOpen: false,
        selectedSuggestion: null,
        suggestions: [],
        searchValue: '',
      }

    default:
      return state
  }
}

// ==============================
// Text Input component
// ==============================

export type Props = {
  fieldInputType?: FieldInputType
  forceRefreshValue?: number
  loadingMessage?: string
  menuIsToTheLeft?: boolean
  noOptionsMessage?: string
  onLoadSuggestions: (value: string) => Promise<Options<Option>>
  onSuggestionSelected?: (suggestion: Option) => void
} & TextInputProps

export const TextInputAutosuggest = (props: Props) => {
  const { value, onLoadSuggestions, onSuggestionSelected, ...inputProps } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    isLoading: false,
    suggestions: [],
    focusedSuggestion: null,
    selectedSuggestion: null,
    searchValue: '',
  })

  const onChange = (newValue: string) => {
    if (state.isOpen) {
      props.onChange?.(newValue)
      dispatch({ type: MenuActionType.SET_SEARCH, searchValue: newValue })
    } else if (newValue > '' && !state.selectedSuggestion) {
      dispatch({ type: MenuActionType.OPEN, searchValue: newValue })
    }
  }

  useEffect(() => {
    if (state.isOpen && state.searchValue > '') {
      onLoadSuggestions(state.searchValue).then((suggestions) => {
        state.isOpen && dispatch({ type: MenuActionType.SET_SUGGESTIONS, suggestions, isLoading: false })
      })
    }
  }, [state.searchValue, state.isOpen])

  const onBlur = (newValue: string) => {
    props.onBlur?.(newValue)
    dispatch({ type: MenuActionType.CLOSE, searchValue: newValue })
  }

  const blurInput = (newValue: string) => {
    if (inputRef) {
      inputRef.current.blur()
    }
    onBlur(newValue)
  }

  // ==============================
  // Select Option Handler
  // ==============================

  const onSelectOption = (option: Option) => {
    dispatch({ type: MenuActionType.CLOSE, selectedSuggestion: option })
  }

  useEffect(() => {
    if (state.selectedSuggestion && state.searchValue > '') {
      onSuggestionSelected?.(state.selectedSuggestion)
      blurInput(state.selectedSuggestion.value)
    }
  }, [state.selectedSuggestion, state.searchValue])

  let blockOptionHover = false

  const onSuggestionFocused = (focusedSuggestion: Option) => {
    if (!blockOptionHover && state.focusedSuggestion !== focusedSuggestion) {
      dispatch({ type: MenuActionType.SET_FOCUSED_SUGGESTION, focusedSuggestion })
    }
  }

  const inputHeight = inputRef.current ? inputRef.current.getBoundingClientRect().height : 0

  return (
    <TextInput
      {...inputProps}
      autocomplete="off"
      inputRef={inputRef}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown(props, state, dispatch)}
      value={value}
      forceRefreshValue={props.forceRefreshValue}
    >
      <AutosuggestMenu
        inputHeight={inputHeight}
        isLoading={state.isLoading}
        loadingMessage={props.loadingMessage}
        localeNamespace={props.localeNamespace}
        menuIsOpen={state.isOpen}
        menuIsToTheLeft={props.menuIsToTheLeft}
        menuPortalTarget={document.body}
        menuShouldBlockScroll
        name={props.name}
        noOptionsMessage={props.noOptionsMessage}
        onOptionSelected={onSelectOption}
        onOptionFocused={onSuggestionFocused}
        options={buildCategorizedOptions(props, state)}
        value={props.value}
      />
    </TextInput>
  )
}

// ==============================
// Autosuggest Menu component
// ==============================

export interface AutosuggestMenuProps {
  inputHeight: number
  isLoading: boolean
  loadingMessage?: string
  localeNamespace?: LocaleNamespace
  menuIsOpen?: boolean
  menuIsToTheLeft?: boolean
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
  const { t: translate } = useTranslation(props.localeNamespace)
  const controlRef = useRef<HTMLInputElement>(null)

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
        dataTestId={`option-${categorizedOption.value.toLowerCase()}`}
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
    const message = translate(props.loadingMessage) || 'Loading...'
    if (message === null) return null
    menuUI = (
      <MenuOption {...commonProps} dataTestId="loading-option" isDisabled>
        {message}
      </MenuOption>
    )
  } else {
    const message = translate(props.noOptionsMessage) || 'No options'
    if (message === null) return null
    menuUI = (
      <MenuOption {...commonProps} dataTestId="no-option" isDisabled>
        {message}
      </MenuOption>
    )
  }

  const menuElement = (
    <Menu
      {...commonProps}
      fieldHeight={props.inputHeight}
      isLoading={props.isLoading}
      maxMenuHeight={MENU_MAX_HEIGHT}
      menuShouldBlockScroll
      minMenuHeight={MENU_MIN_HEIGHT}
    >
      {menuUI}
    </Menu>
  )

  // positioning behaviour is almost identical for portalled and fixed,
  // so we use the same component. the actual portalling logic is forked
  // within the component based on `menuPosition`

  return (
    <StlyedContainer ref={controlRef} $menuIsToTheLeft={props.menuIsToTheLeft}>
      {props.menuPortalTarget ? (
        <MenuPortal
          {...commonProps}
          appendTo={props.menuPortalTarget}
          fieldHeight={props.inputHeight}
          controlElement={controlRef.current}
          maxMenuHeight={MENU_MAX_HEIGHT}
        >
          {menuElement}
        </MenuPortal>
      ) : (
        menuElement
      )}
    </StlyedContainer>
  )
}

// ==============================
// Styled components
// ==============================

const StlyedContainer = styled.div<{ $menuIsToTheLeft?: boolean }>`
  position: absolute;
  width: 100%;
  min-width: 360px;
  bottom: 0;
  ${({ $menuIsToTheLeft }) => $menuIsToTheLeft ? 'right: 0;' : 'left: 0;'}
`
