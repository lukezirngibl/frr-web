import { useState, useEffect, useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MediaQuery } from '../theme/theme'

const _window = window as any

export const useMobileTouch = (): { isMobile: boolean, isTouch: boolean, isMobileTouch: boolean } => {
  // Check for on-touch event and decide whether to show the native date picker

  const [isTouchInitialized, setTouchInitialized] = useState(
    _window.__IS_TOUCH_SCREEN__ !== undefined,
  )

  const isMobile = useMediaQuery({ query: MediaQuery.Mobile })

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

  const isTouch = _window.__IS_TOUCH_SCREEN__
  const isMobileTouch = isMobile && isTouch

  return { isTouch, isMobile, isMobileTouch }
}
