import React, { ReactNode, RefCallback, useEffect, useRef, useState } from 'react'
import { Options } from 'react-select'
import styled from 'styled-components'
import { Menu } from './menu/Menu'
import { MenuOption } from './menu/MenuOption'
import { CommonProps, Option } from './menu/Menu.types'
import { classNames, MAX_HEIGHT, MIN_HEIGHT } from './menu/Menu.utils'
import { Props as TextInputProps, TextInput } from './TextInput'
import { ComponentTheme } from '../theme/theme.components'
import { MenuPortal } from './menu/MenuPortal'

export type Suggestions = Options<Option>

export type Props = {
  onLoadSuggestions: (inputValue: string) => Promise<Options<Option>>
  onSuggestionSelected?: (suggestion: Option) => void
} & TextInputProps

export const TextInputAutosuggest = (props: Props) => {
  const { value, ...inputProps } = props
  const controlRef = useRef<HTMLInputElement>(null)

  const [menuState, setMenuState] = useState({ isOpen: true, isLoading: false })
  const [suggestions, setSuggestions] = useState<Options<Option>>([])

  const onChange = (value: string) => {
    props.onChange?.(value)
    setMenuState({ isOpen: true, isLoading: true })

    props.onLoadSuggestions(value).then((suggestions) => {
      setSuggestions(suggestions)
      setMenuState({ isOpen: true, isLoading: false })
    })
  }

  const onBlur = (value: string) => {
    setMenuState({ isOpen: false, isLoading: false })
    props.onBlur?.(value)
  }

  useEffect(() => {
    console.log('SUGGESTIONS', suggestions)
  }, [suggestions])

  return (
    <TextInput {...inputProps} value={value} onChange={onChange} onBlur={onBlur} autocomplete="off">
      <StlyedContainer ref={controlRef}>
        <AutosuggestMenu
          controlRef={controlRef.current}
          inputValue={props.value}
          isLoading={menuState.isLoading}
          menuIsOpen={menuState.isOpen}
          menuPortalTarget={document.body}
          menuShouldBlockScroll
          name={props.name}
          onOptionSelected={(option) => {
            setMenuState({ isOpen: false, isLoading: false })
            props.onSuggestionSelected(option)
          }}
          options={suggestions}
        />
      </StlyedContainer>
    </TextInput>
  )
}

export interface AutosuggestMenuProps {
  controlRef: HTMLDivElement | null
  getOptionLabel?: (option: Option) => string
  inputValue: string
  isLoading: boolean
  loadingMessage?: string
  menuIsOpen?: boolean
  menuPortalTarget?: HTMLElement
  menuShouldBlockScroll?: boolean
  name: string
  noOptionsMessage?: string
  onOptionSelected?: (option: Option) => void
  options: Options<Option>
  styles?: Partial<ComponentTheme['select']>
}

interface CategorizedOption {
  type: 'option'
  data: Option
  isDisabled: boolean
  isSelected: boolean
  label: string
  value: string
  index: number
}

const getOptionLabel = (props: AutosuggestMenuProps, option: Option): string => {
  return props.getOptionLabel?.(option) || option.label
}

const buildCategorizedOptions = (
  props: AutosuggestMenuProps,
  inputValue: string,
): Array<CategorizedOption> => {
  return props.options.map((option, optionIndex) => {
    const isDisabled = !!option.disabled
    const isSelected = inputValue !== null && option.value === inputValue
    const label = getOptionLabel(props, option)
    const value = option.value

    const categorizedOption = {
      type: 'option',
      data: option,
      isDisabled,
      isSelected,
      label,
      value,
      index: optionIndex,
    } as CategorizedOption

    return categorizedOption
  })
}

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
    const { data, isDisabled, isSelected } = categorizedOption
    const onSelect = isDisabled ? undefined : () => props.onOptionSelected?.(data)
    const optionId = `${getElementId('option')}-${id}`

    return (
      <MenuOption
        {...commonProps}
        id={optionId}
        isDisabled={isDisabled}
        isSelected={isSelected}
        key={optionId}
        onSelect={onSelect}
      >
        {props.getOptionLabel?.(categorizedOption) || categorizedOption.label}
      </MenuOption>
    )
  }

  let menuUI: ReactNode

  if (props.options.length > 0) {
    menuUI = buildCategorizedOptions(props, props.inputValue).map((option) => {
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
