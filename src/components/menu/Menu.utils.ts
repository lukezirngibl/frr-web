import { KeyboardEvent } from 'react'
import {
  ClassNamesState,
  FocusDirection,
  MenuAction,
  MenuActionType,
  MenuPlacementState,
  MenuState,
  RectType,
} from './Menu.types'

export const MAX_HEIGHT = 400
export const MIN_HEIGHT = 140
export const PAGE_SIZE = 7

// ==============================
// Menu Placement in Portal
// ==============================

export function getMenuPlacement({
  menuEl,
  maxHeight = MAX_HEIGHT,
  minHeight = MIN_HEIGHT,
  fieldHeight,
}: {
  menuEl: HTMLElement | null
  maxHeight?: number
  minHeight?: number
  fieldHeight: number
}): MenuPlacementState {
  const scrollParent = getScrollParent(menuEl!)
  const defaultState: MenuPlacementState = { placement: 'bottom', maxHeight }

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered
  const { height: scrollHeight } = scrollParent.getBoundingClientRect()
  const { height: menuHeight, top: menuTop } = menuEl.getBoundingClientRect()

  const { top: containerTop } = menuEl.offsetParent.getBoundingClientRect()
  const viewHeight = normalizedHeight(scrollParent)
  const scrollTop = getScrollTop(scrollParent)

  const marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10)
  const marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10)
  const viewSpaceAbove = containerTop - marginTop
  const viewSpaceBelow = viewHeight - menuTop
  const scrollSpaceAbove = viewSpaceAbove + scrollTop
  const scrollSpaceBelow = scrollHeight - scrollTop - menuTop

  /*
   * Calculate placement
   */

  // 1: the menu will fit, do nothing
  if (viewSpaceBelow >= menuHeight) {
    return { placement: 'bottom', maxHeight }
  }

  // 2: the menu will fit, if scrolled
  if (scrollSpaceBelow >= menuHeight) {
    return { placement: 'bottom', maxHeight }
  }

  // 3: the menu will fit, if constrained
  if (scrollSpaceBelow >= minHeight) {
    // we want to provide as much of the menu as possible to the user,
    // so give them whatever is available below rather than the minHeight.
    const constrainedHeight = scrollSpaceBelow - marginBottom

    return {
      placement: 'bottom',
      maxHeight: constrainedHeight,
    }
  }

  // 4. Forked beviour when there isn't enough space below

  // AUTO: flip the menu, render above
  // may need to be constrained after flipping
  let constrainedHeight = maxHeight
  const spaceAbove = scrollSpaceAbove

  if (spaceAbove >= minHeight) {
    constrainedHeight = Math.min(spaceAbove - marginBottom - fieldHeight, maxHeight)
  }

  return { placement: 'top', maxHeight: constrainedHeight }
}

// ==============================
// Scroll Helpers
// ==============================

export function isDocumentElement(el: HTMLElement | typeof window): el is typeof window {
  return [document.documentElement, document.body, window].indexOf(el) > -1
}

// Scroll Into View
// ------------------------------

export function scrollTo(el: HTMLElement | typeof window, top: number): void {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top)
    return
  }

  el.scrollTop = top
}

export function scrollIntoView(menuEl: HTMLElement, focusedEl: HTMLElement): void {
  const menuRect = menuEl.getBoundingClientRect()
  const focusedRect = focusedEl.getBoundingClientRect()
  const overScroll = focusedEl.offsetHeight / 3

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(
      menuEl,
      Math.min(
        focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll,
        menuEl.scrollHeight,
      ),
    )
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0))
  }
}

// Normalized Scroll Top
// ------------------------------

const normalizedHeight = (el: HTMLElement | typeof window): number => {
  if (isDocumentElement(el)) {
    return window.innerHeight
  }

  return el.clientHeight
}

// Normalized scrollTo & scrollTop
// ------------------------------

export function getScrollTop(el: HTMLElement | typeof window): number {
  if (isDocumentElement(el)) {
    return window.pageYOffset
  }
  return el.scrollTop
}

// Get Scroll Parent
// ------------------------------

export function getScrollParent(element: HTMLElement) {
  let style = getComputedStyle(element)
  const excludeStaticParent = style.position === 'absolute'
  const overflowRx = /(auto|scroll)/

  if (style.position === 'fixed') return document.documentElement

  for (let parent: HTMLElement | null = element; (parent = parent.parentElement); ) {
    style = getComputedStyle(parent)
    if (excludeStaticParent && style.position === 'static') {
      continue
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent
    }
  }

  return document.documentElement
}

// ==============================
// Keyboard Handlers
// ==============================

let blockOptionHover = false
let isComposing = false

export const onKeyDown =
  (
    props: { disabled?: boolean; value: string | null },
    state: MenuState,
    dispatch: (action: MenuAction) => void,
  ) =>
  (event: KeyboardEvent<HTMLDivElement>) => {
    if (props.disabled) return

    const focusedOption = state.focusedSuggestion

    // Block option hover events when the user has just pressed a key
    blockOptionHover = true

    switch (event.key) {
      case 'ArrowLeft':
        return
      case 'ArrowRight':
        return
      case 'Delete':
      case 'Backspace':
        if (props.value) return
        break
      case 'Tab':
        if (isComposing) return

        if (event.shiftKey || !state.isOpen || !focusedOption) {
          return
        }
        dispatch({ type: MenuActionType.CLOSE, selectedSuggestion: focusedOption })
        break
      case 'Enter':
        if (event.keyCode === 229) {
          // ignore the keydown event from an Input Method Editor(IME)
          // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
          break
        }
        if (state.isOpen) {
          if (!focusedOption) return
          if (isComposing) return
          dispatch({ type: MenuActionType.CLOSE, selectedSuggestion: focusedOption })
          break
        }
        return
      case 'Escape':
        if (state.isOpen) {
          dispatch({ type: MenuActionType.CLOSE })
        }
        break
      case ' ': // space
        if (props.value) {
          return
        }
        if (!focusedOption) return
        dispatch({ type: MenuActionType.CLOSE, selectedSuggestion: focusedOption })
        break
      case 'ArrowUp':
        if (state.isOpen) {
          focusOption('up', state, dispatch)
        }
        break
      case 'ArrowDown':
        if (state.isOpen) {
          focusOption('down', state, dispatch)
        }
        break
      case 'PageUp':
        if (!state.isOpen) return
        focusOption('pageup', state, dispatch)
        break
      case 'PageDown':
        if (!state.isOpen) return
        focusOption('pagedown', state, dispatch)
        break
      case 'Home':
        if (!state.isOpen) return
        focusOption('first', state, dispatch)
        break
      case 'End':
        if (!state.isOpen) return
        focusOption('last', state, dispatch)
        break
      default:
        return
    }
    event.preventDefault()
  }

const focusOption = (
  direction: FocusDirection = 'first',
  state: MenuState,
  dispatch: (action: MenuAction) => void,
) => {
  const focusedOption = state.focusedSuggestion

  const options = state.suggestions

  if (!options.length) return
  let nextFocus = 0 // handles 'first'
  let focusedIndex = options.indexOf(focusedOption!)
  if (!focusedOption) {
    focusedIndex = -1
  }

  if (direction === 'up') {
    nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1
  } else if (direction === 'down') {
    nextFocus = (focusedIndex + 1) % options.length
  } else if (direction === 'pageup') {
    nextFocus = focusedIndex - PAGE_SIZE
    if (nextFocus < 0) nextFocus = 0
  } else if (direction === 'pagedown') {
    nextFocus = focusedIndex + PAGE_SIZE
    if (nextFocus > options.length - 1) nextFocus = options.length - 1
  } else if (direction === 'last') {
    nextFocus = options.length - 1
  }

  dispatch({
    type: MenuActionType.SET_FOCUSED_SUGGESTION,
    focusedSuggestion: options[nextFocus],
  })
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
export const getBoundingClientObj = (element: HTMLElement): RectType => {
  const rect = element.getBoundingClientRect()
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
  }
}

// ==============================
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/

function applyPrefixToName(prefix: string, name: string) {
  if (!name) {
    return prefix
  } else if (name[0] === '-') {
    return prefix + name
  } else {
    return prefix + '__' + name
  }
}

export const classNames = (
  prefix?: string | null,
  state?: ClassNamesState,
  className?: string,
): string => {
  const arr = [className]
  if (state && prefix) {
    for (let key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push(`${applyPrefixToName(prefix, key)}`)
      }
    }
  }

  return arr
    .filter((i) => i)
    .map((i) => String(i).trim())
    .join(' ')
}
