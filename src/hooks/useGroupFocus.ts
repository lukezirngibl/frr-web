import { useState } from 'react'
import { Options, OptionType } from '../html'

const findActiveIndex = <ValueType>(params: { options: Options<ValueType>; value: ValueType | null }) => {
  const activeIndex = params.options.findIndex(({ value: optionValue }) => optionValue === params.value)
  return activeIndex === -1 ? 0 : activeIndex
}

export const useGroupFocus = <ValueType extends string | number>(props: {
  onBlur?: (value: ValueType) => void
  onChange?: (value: ValueType) => void
  onFocus?: () => void
  options: Options<ValueType>
  value: ValueType | null;
}) => {
  const [focusState, setFocusState] = useState({
    isFocused: false,
    focusedIndex: findActiveIndex<ValueType>(props),
  })

  const onFocus = () => {
    setFocusState({ isFocused: true, focusedIndex: findActiveIndex<ValueType>(props) })
    props.onFocus?.()
  }
  const onChange = (item: OptionType<ValueType>) => {
    props.onChange(item.value)
    props.onBlur?.(item.value)
  }
  const onBlur = () => {
    setFocusState({ isFocused: false, focusedIndex: 0 })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowRight'].includes(event.key)) {
      setFocusState({
        isFocused: true,
        focusedIndex: (focusState.focusedIndex + 1) % props.options.length,
      })
      event.preventDefault()
    } else if (['ArrowLeft', 'Backspace'].includes(event.key)) {
      setFocusState({
        isFocused: true,
        focusedIndex:
          focusState.focusedIndex === 0 ? props.options.length - 1 : focusState.focusedIndex - 1,
      })
      event.preventDefault()
    } else if (['Enter'].includes(event.key)) {
      onChange(props.options[focusState.focusedIndex])
      event.preventDefault()
    }
  }

  return {
    onKeyDown,
    onBlur,
    onFocus,
    onChange,
    isFocused: focusState.isFocused,
    focusedIndex: focusState.focusedIndex,
  }
}
