import React, { ReactNode, useRef, useState } from 'react'
import { RefCallback } from 'react'
import { defaultTheme, Options } from 'react-select'
import {
  LoadingMessage,
  Menu,
  MenuList,
  MenuPlacer,
  MenuPortal,
  NoOptionsMessage,
  ScrollManager,
} from './menu/Menu'
import { CommonProps, Option, StylesConfig, StylesProps } from './menu/Menu.types'
import { MenuOption } from './menu/Menu.Option'
import { classNames, MAX_HEIGHT, MIN_HEIGHT } from './menu/Menu.utils'
import { TextInput, Props as TextInputProps } from './TextInput'
import { defaultStyles } from './menu/Menu.theme'
import { useEffect } from 'react'

export type Props = {} & TextInputProps

export const TextInputAutosuggest = (props: Props) => {
  const { value, ...inputProps } = props
  const controlRef = useRef<HTMLInputElement>(null)

  const [options, setOptions] = useState([])

  useEffect(() => {
    if (value > '' && value.length > 2) {
      setOptions([{ label: 'number 1', value }, { label: 'number 2', value: `${value} +` }])
    }
  }, [value])
  
  return (
    <div ref={controlRef}>
      <TextInput {...inputProps} value={value} />

      <AutosuggestMenu
        controlRef={controlRef.current}
        inputValue={props.value}
        isLoading={false}
        menuIsOpen={value > '' && value.length > 2}
        menuPortalTarget={document.body}
        menuShouldBlockScroll
        name={props.name}
        options={options}
      />
    </div>
  )
}

interface AutosuggestMenuProps {
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

const buildFocusableOptionsFromCategorizedOptions = (categorizedOptions: Array<CategorizedOption>) => {
  return categorizedOptions.reduce((optionsAccumulator, categorizedOption) => {
    optionsAccumulator.push(categorizedOption.data)

    return optionsAccumulator
  }, [])
}

const buildFocusableOptions = (props: AutosuggestMenuProps, inputValue: string) => {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, inputValue))
}

let instanceId = 1

const AutosuggestMenu = (props: AutosuggestMenuProps) => {
  const instancePrefix = 'react-select-' + (props.name || ++instanceId)

  const getStyles = (key: keyof StylesProps) => {
    const base = defaultStyles[key](props as any)
    base.boxSizing = 'border-box'
    const custom = props.styles[key]
    return custom ? custom(base, props as any) : base
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
  const menuListRef = useRef<HTMLDivElement>(null)
  const getMenuListRef: RefCallback<HTMLDivElement> = (ref) => {
    menuListRef.current = ref
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
    const { type, data, isDisabled, isSelected, label, value } = categorizedOption
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

  const focusableOptions = buildFocusableOptions(props, props.inputValue)

  if (focusableOptions.length > 0) {
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

  const menuPlacementProps = {
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  }

  const menuElement = (
    <MenuPlacer {...commonProps} {...menuPlacementProps}>
      {({ ref, placerProps: { placement, maxHeight } }) => (
        <Menu
          {...commonProps}
          {...menuPlacementProps}
          innerRef={ref}
          innerProps={{ id: getElementId('listbox') }}
          isLoading={props.isLoading}
          placement={placement}
        >
          <ScrollManager lockEnabled={props.menuShouldBlockScroll} captureEnabled={false}>
            {(scrollTargetRef) => (
              <MenuList
                {...commonProps}
                {...menuPlacementProps}
                innerRef={(instance) => {
                  getMenuListRef(instance)
                  scrollTargetRef(instance)
                }}
                innerProps={{}}
                focusedOption={focusedOption}
              >
                {menuUI}
              </MenuList>
            )}
          </ScrollManager>
        </Menu>
      )}
    </MenuPlacer>
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
