import { useMediaQuery } from 'react-responsive'
import { MediaQuery } from '../theme/configure.theme'
import { usePlatform } from './usePlatform'

export const useMobileTouch = (
  options: {
    overwriteIsMobileTouch?: boolean
  } = {},
): { isMobile: boolean; isTouch: boolean; isMobileTouch: boolean } => {
  if (options.overwriteIsMobileTouch) {
    return {
      isTouch: true,
      isMobile: true,
      isMobileTouch: true,
    }
  }

  const isMobile = useMediaQuery({ query: MediaQuery.Small })

  const { isTouch } = usePlatform()

  const isMobileTouch = isMobile && isTouch

  return { isTouch, isMobile, isMobileTouch }
}
