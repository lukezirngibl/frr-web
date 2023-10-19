import styled, { css, CSSProperties } from 'styled-components'
import { MediaQuery } from './configure.theme'

export const omitKeys = <T extends { [k: string]: unknown }>(obj: T, keysIn: Array<keyof T>) =>
  Object.keys(obj).reduce(
    (o: T, k: string) => (keysIn.includes(k as keyof T) ? o : { ...o, [k]: obj[k] }),
    {} as unknown as T,
  )

const pseudoStyleKeys = [
  ':active',
  ':after',
  ':before',
  ':disabled',
  ':first-child',
  ':focus',
  ':focus:before',
  ':hover',
  ':invalid',
  ':last-child',
  ':placeholder',
]
const customDynamicStyleKeys = [':readonly', '@media-mobile']
export const dynamicStyleKeys = pseudoStyleKeys.concat(customDynamicStyleKeys)

const animationKeys = ['@animation']

const nonPixelKeys = ['flex', 'flexGrow', 'flexShrink', 'fontWeight', 'lineHeight', 'opacity', 'zIndex']

export const mapStylesToCSS = (style: CSSProperties, overwrite?: CSSProperties) => {
  let cssStyles = Object.entries(style)
    .map(([cssKey, cssValue]) =>
      pseudoStyleKeys.includes(cssKey)
        ? mapPseudoStyles(cssKey, cssValue as CSSProperties)
        : `${cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${
            isNaN(cssValue as any) || nonPixelKeys.includes(cssKey) ? cssValue : `${cssValue}px`
          };`,
    )
    .join(' ')

  if (overwrite) {
    cssStyles = Object.entries(overwrite)
      .map(([cssKey, cssValue]) =>
        pseudoStyleKeys.includes(cssKey)
          ? mapPseudoStyles(cssKey, cssValue as CSSProperties)
          : `${cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${
              isNaN(cssValue as any) || nonPixelKeys.includes(cssKey) ? cssValue : `${cssValue}px`
            };`,
      )
      .join(' ')
  }

  return cssStyles.replace(':disabled', '&[disabled]')
}

const mapPseudoStyles = (pseudoStyle: string, style: CSSProperties, overwrite?: CSSProperties) => {
  const cssStyles = mapStylesToCSS(style, overwrite)
  return cssStyles > '' ? `${pseudoStyle} { ${cssStyles} }` : ''
}

/*
 * Creates a styled component with support for pseudo elements and media query styles provided from a style object
 */

export const createStyled = (type: any) =>
  typeof type === 'string'
    ? styled[type]
        .withConfig({
          shouldForwardProp: (prop: string) => !['cssStyles', 'dataThemeId'].includes(prop),
        })
        .attrs(({ dataThemeId }) => ({
          'data-theme-id': dataThemeId,
        }))`
        ${(props: { cssStyles: string }) => css`
          ${props.cssStyles}
        `}
      `
    : styled(type)
        .withConfig({
          shouldForwardProp: (prop: string) => !['cssStyles', 'dataThemeId'].includes(prop),
        })
        .attrs(({ dataThemeId }) => ({
          'data-theme-id': dataThemeId,
        }))`
        ${(props) => css`
          ${props.cssStyles}
        `}
      `

/*
 * Generates the style object to be added as inline styles. E.g. <div style={styles}>...
 */

export const getUseInlineStyle =
  <Theme>() =>
  <C extends keyof Theme>(theme: Theme, componentKey: C) => {
    return (overwrite?: Partial<Theme[C]>) =>
      <K extends keyof Theme[C]>(
        elementKeys: Array<K> | K | Partial<{ [k in keyof Theme[C]]: boolean }>,
        internalOverride?: CSSProperties,
        className?: string,
        keepPseudoStyles?: boolean,
        keepMediaMobileStyles?: boolean,
      ): { style: Theme[C][K]; dataThemeId: string } => {
        let keys = []

        if (Array.isArray(elementKeys)) {
          keys = elementKeys
        } else if (typeof elementKeys === 'string') {
          keys = [elementKeys]
        } else {
          keys = Object.keys(elementKeys).filter((k) => elementKeys[k])
        }

        // @ts-ignore
        const dataThemeId = `${className ? `${className}:` : ''}${componentKey}:${keys.reduce(
          (str, k, i) => `${str}${i === 0 ? '' : ','}${k}`,
          '',
        )}`

        const inlineStyles = {
          dataThemeId,
          style: omitKeys(
            {
              ...(keys.reduce(
                (obj, elementKey) => ({
                  ...obj,
                  ...theme[componentKey][elementKey],
                  ...(overwrite && overwrite[elementKey] ? overwrite[elementKey] : {}),
                }),
                {},
              ) as any),
              ...(internalOverride || {}),
            },
            (keepPseudoStyles ? customDynamicStyleKeys : (dynamicStyleKeys as Array<string>)).filter(
              (key) => !keepMediaMobileStyles || key !== '@media-mobile',
            ),
          ),
        }

        return inlineStyles
      }
  }

/*
 * Generates the CSS style object for a styled component created with the createStyled() function
 */

export const getUseCSSStyles =
  <Theme>() =>
  <C extends keyof Theme>(theme: Theme, componentKey: C) =>
  (overwrite?: Partial<Theme[C]>) =>
  <K extends keyof Theme[C]>(
    elementKeys: Array<K> | K | Partial<{ [k in keyof Theme[C]]: boolean }>,
    internalOverride?: CSSProperties,
    className?: string,
  ): { cssStyles: string; dataThemeId: string } => {
    let keys = []

    if (Array.isArray(elementKeys)) {
      keys = elementKeys
    } else if (typeof elementKeys === 'string') {
      keys = [elementKeys]
    } else {
      keys = Object.keys(elementKeys).filter((k) => elementKeys[k])
    }
    const styles = {
      css: omitKeys(
        {
          ...(keys.reduce(
            (obj, elementKey) => ({
              ...obj,
              ...theme[componentKey][elementKey],
              ...(overwrite && overwrite[elementKey] ? overwrite[elementKey] : {}),
            }),
            {},
          ) as any),
          ...(internalOverride || {}),
        },
        dynamicStyleKeys.concat(animationKeys) as any,
      ),
      ...dynamicStyleKeys.reduce(
        (obj, k) => ({
          ...obj,
          [k]: keys.reduce(
            (obj, elementKey) => ({
              ...obj,
              ...(theme[componentKey][elementKey][k] || {}),
              ...(overwrite && overwrite[elementKey] ? overwrite[elementKey][k] : {}),
            }),
            {},
          ),
        }),
        {} as any,
      ),
    }

    const animationKey = keys.find((elementKey) => !!theme[componentKey][elementKey]['@animation'])
    let animation
    if (animationKey) {
      animation = theme[componentKey][animationKey]['@animation']
    }

    const pseudoStyles = pseudoStyleKeys.map((pseudoStyle) =>
      mapPseudoStyles(`&${pseudoStyle}`, styles[pseudoStyle] || {}, overwrite?.[pseudoStyle]),
    )

    const cssStyles = `
    ${mapStylesToCSS(styles.css || {})}
    ${pseudoStyles.join('')}
    ${mapPseudoStyles(`&[disabled]`, styles[':disabled'] || {}, overwrite?.[':disabled'])}
    ${mapPseudoStyles(`&[readonly]`, styles[':readonly'] || {}, overwrite?.[':readonly'])}
    ${mapPseudoStyles(
      `@media ${MediaQuery.Small}`,
      styles['@media-mobile'] || {},
      overwrite?.['@media-mobile'],
    )}
    ${animation ? `&.animate { animation: ${animation}; }` : ''}
  `

    // @ts-ignore
    const dataThemeId = `${className ? `${className}:` : ''}${componentKey}:${keys.reduce(
      (str, k, i) => `${str}${i === 0 ? '' : ','}${k}`,
      '',
    )}`

    // if (keys.findIndex(key => key === 'common') !== -1) {
    //   console.log(cssStyles)
    // }

    return {
      cssStyles,
      dataThemeId,
    }
  }
