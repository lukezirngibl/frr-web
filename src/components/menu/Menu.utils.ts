import { ClassNamesState, MenuPlacement, MenuPlacementState, RectType } from './Menu.types'

export const MAX_HEIGHT = 300
export const MIN_HEIGHT = 140

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
