import { useState, useEffect, useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MediaQuery } from '../theme/configure.theme'

export const useTouchDetector = (): void => {
  const _window = window as any

  // Check for on-touch event on window
  const [isTouchInitialized, setTouchInitialized] = useState(_window.__IS_TOUCH_SCREEN__ !== undefined)

  const setIsTouchScreen = useCallback(() => {
    _window.__IS_TOUCH_SCREEN__ = true
    setTouchInitialized(true)
  }, [])

  useEffect(() => {
    if (isTouchInitialized) {
      window.removeEventListener('touchstart', setIsTouchScreen, true)
    } else {
      window.addEventListener('touchstart', setIsTouchScreen, true)
    }
  }, [isTouchInitialized])
}

export const useMobileTouch = (): { isMobile: boolean; isTouch: boolean; isMobileTouch: boolean } => {
  const isMobile = useMediaQuery({ query: MediaQuery.Small })

  const _window = window as any

  const isTouch = _window.__IS_TOUCH_SCREEN__
  const isMobileTouch = isMobile && isTouch

  return { isTouch, isMobile, isMobileTouch }
}
