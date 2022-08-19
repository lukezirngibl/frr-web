import { ReactNode, RefCallback, useEffect, useRef, useState } from 'react'
import { defaultTheme, Options } from 'react-select'
import { LoadingMessage, Menu, MenuPortal, NoOptionsMessage } from './menu/Menu'
import { MenuOption } from './menu/Menu.Option'
import { defaultStyles } from './menu/Menu.theme'
import { CommonProps, Option, StylesConfig, StylesProps } from './menu/Menu.types'
import { classNames, MAX_HEIGHT, MIN_HEIGHT } from './menu/Menu.utils'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Suggestions = Options<Option>

export type Props = {
  onLoadSuggestions: (inputValue: string) => Promise<Options<Option>>
  onSuggestionSelected?: (suggestion: Option) => void
} & TextInputProps

export const TextInputAutosuggest = (props: Props) => {
  const { value, ...inputProps } = props
  const controlRef = useRef<HTMLInputElement>(null)

  const [menuState, setMenuState] = useState({ isOpen: false, isLoading: false })
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
    <div ref={controlRef}>
      <TextInput {...inputProps} value={value} onChange={onChange} onBlur={onBlur} />

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
    </div>
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
  styles?: StylesConfig
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

  const getStyles = (key: keyof StylesProps, styleProps: any) => {
    const base = defaultStyles[key](styleProps as any)
    base.boxSizing = 'border-box'
    const custom = props.styles?.[key]
    return custom ? custom(base, styleProps as any) : base
  }

  const getElementId = (
    element: 'group' | 'input' | 'listbox' | 'option' | 'placeholder' | 'live-region',
  ) => {
    return `${instancePrefix}-${element}`
  }

  // Refs
  // ------------------------------
  const focusedOptionRef = useRef<HTMLDivElement>(null)
  const getFocusedOptionRef: RefCallback<HTMLDivElement> = (ref) => {
    focusedOptionRef.current = ref
  }

  const [focusedOption, setFocusedOption] = useState<any>()

  if (!props.menuIsOpen) return null

  const commonProps: CommonProps = {
    cx: (...args) => classNames('', ...args),
    getStyles,
    options: props.options,
    theme: defaultTheme,
  }

  const renderOption = (categorizedOption: CategorizedOption, id: string) => {
    const { type, data, isDisabled, isSelected, label } = categorizedOption
    const isFocused = focusedOption === data
    const onSelect = isDisabled ? undefined : () => props.onOptionSelected?.(data)
    const optionId = `${getElementId('option')}-${id}`
    const innerProps = {
      id: optionId,
      onClick: onSelect,
      tabIndex: -1,
    }

    return (
      <MenuOption
        {...commonProps}
        innerProps={innerProps}
        data={data}
        isDisabled={isDisabled}
        isSelected={isSelected}
        key={optionId}
        label={label}
        type={type}
        isFocused={isFocused}
        innerRef={isFocused ? getFocusedOptionRef : undefined}
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
      <LoadingMessage {...commonProps} innerProps={{}}>
        {message}
      </LoadingMessage>
    )
  } else {
    const message = props.noOptionsMessage || 'No options'
    if (message === null) return null
    menuUI = (
      <NoOptionsMessage {...commonProps} innerProps={{}}>
        {message}
      </NoOptionsMessage>
    )
  }

  const menuElement = (
    <Menu
      {...commonProps}
      minMenuHeight={MIN_HEIGHT}
      maxMenuHeight={MAX_HEIGHT}
      innerProps={{ id: getElementId('listbox') }}
      isLoading={props.isLoading}
    >
      {menuUI}
    </Menu>
  )

  // positioning behaviour is almost identical for portalled and fixed,
  // so we use the same component. the actual portalling logic is forked
  // within the component based on `menuPosition`
  return props.menuPortalTarget ? (
    <MenuPortal
      {...commonProps}
      appendTo={props.menuPortalTarget}
      controlElement={props.controlRef}
      innerProps={{}}
    >
      {menuElement}
    </MenuPortal>
  ) : (
    menuElement
  )
}
