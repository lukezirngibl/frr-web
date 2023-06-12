// @ts-ignore
import platformDetect from 'platform-detect'
import { useMediaQuery } from 'react-responsive'
import { MediaQuery } from '../theme/configure.theme'

enum FormFactorT {
  desktop = 'desktop',
  phone = 'phone',
  tablet = 'tablet',
  tv = 'tv',
  laptop = 'laptop',
  hybrid = 'hybrid',
}

enum InputT {
  mouse = 'mouse',
  touch = 'touch',
}

enum OrientationT {
  landscape = 'landscape',
  portrait = 'portrait',
}

type PlatformDecectT = {
  // form factor
  formfactor: FormFactorT
  pixelRatio: number

  // device type
  desktop: boolean
  hybrid: boolean
  laptop: boolean
  phone: boolean
  tablet: boolean
  tv: boolean

  // input type
  input: InputT
  mouse: boolean
  touch: boolean

  // orientation
  orientation: OrientationT
  landscape: boolean
  portrait: boolean

  // browser
  blink: boolean
  chrome: boolean
  chromeIos: boolean
  edge: boolean
  edgeAndroid: boolean
  edgeChromium: boolean
  edgeHtml: boolean
  edgeIos: boolean
  firefox: boolean
  firefoxIos: boolean
  gecko: boolean
  ie: boolean
  opera: boolean
  safari: boolean
  samsungBrowser: boolean
  webkit: boolean

  // OS
  android: boolean
  chromeos: boolean
  tizen: boolean
  ios: boolean
  linuxBased: boolean
  windows: boolean
  macos: boolean
  linux: boolean

  // Runtime
  browser: boolean
  cordova: boolean
  electron: boolean
  gui: boolean
  node: boolean
  nwjs: boolean
  packaged: boolean
  pwa: boolean
  serviceWorker: boolean
  terminal: boolean
  uwp: boolean
  web: boolean
  website: boolean
  worker: boolean

  // Etc
  csp: boolean
  dev: undefined
}

export type PlatformDataT = {
  // device type
  isDesktop: boolean
  isPhone: boolean

  // input type
  isTouch: boolean

  // Browser
  browser: {
    chrome: boolean
    chromeIos: boolean
    edge: boolean
    edgeAndroid: boolean
    edgeChromium: boolean
    edgeIos: boolean
    firefox: boolean
    firefoxIos: boolean
    ie: boolean
    opera: boolean
    safari: boolean
    samsungBrowser: boolean
  }

  // OS
  os: {
    android: boolean
    ios: boolean
  }
}

const platformData: PlatformDecectT = platformDetect

export const usePlatform = (): PlatformDataT => {
  const isMobile = useMediaQuery({ query: MediaQuery.Small })

  const isPhone = isMobile && platformData.touch

  return {
    // device type
    isDesktop: !isPhone,
    isPhone,

    // input type
    isTouch: platformData.touch,

    // browser
    browser: {
      chrome: platformData.chrome,
      chromeIos: platformData.chromeIos,
      edge: platformData.edge,
      edgeAndroid: platformData.edgeAndroid,
      edgeChromium: platformData.edgeChromium,
      edgeIos: platformData.edgeIos,
      firefox: platformData.firefox,
      firefoxIos: platformData.firefoxIos,
      ie: platformData.ie,
      opera: platformData.opera,
      safari: platformData.safari,
      samsungBrowser: platformData.samsungBrowser,
    },

    // OS
    os: {
      android: platformData.android,
      ios: platformData.ios,
    },
  }
}
