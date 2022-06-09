import styled, { css, CSSProperties } from 'styled-components'
import { MediaQuery } from './configure.theme'


export const omitKeys = <T extends { [k: string]: unknown }>(obj: T, keysIn: Array<keyof T>) =>
  Object.keys(obj).reduce(
    (o: T, k: string) => (keysIn.includes(k as keyof T) ? o : { ...o, [k]: obj[k] }),
    {} as unknown as T,
  )

export const dynamicStyleKeys = [
  ':hover',
  ':focus',
  ':invalid',
  ':readonly',
  ':disabled',
  '@media-mobile',
]

const animationKeys = ['@animation']

const nonPixelKeys = ['flexGrow', 'flexShrink', 'fontWeight', 'lineHeight', 'opacity', 'zIndex']

export const mapStylesToCSS = (style) =>
  Object.entries(style)
    .map(
      ([cssKey, cssValue]) =>
        `${cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${
          isNaN(cssValue as any) || nonPixelKeys.includes(cssKey) ? cssValue : `${cssValue}px`
        };`,
    )
    .join(' ')

/*
 * Creates a styled component with support for pseudo elements and media query styles provided from a style object
 */

export const createStyled = (type: any) =>
  typeof type === 'string'
    ? styled[type].attrs(({ dataThemeId }) => ({
        'data-theme-id': dataThemeId,
      }))`
        ${(props: { cssStyles: string }) =>
          css`
            ${props.cssStyles}
          `}
      `
    : styled(type).attrs(({ dataThemeId }) => ({
        'data-theme-id': dataThemeId,
      }))`
        ${(props: { cssStyles: string }) =>
          css`
            ${props.cssStyles}
          `}
      `

/*
 * Generates the style object to be added as inline styles. E.g. <div style={styles}>...
 */

export const getUseInlineStyle =
  <Theme>() =>
  <C extends keyof Theme>(theme: Theme, componentKey: C) => {
    return (override?: Partial<Theme[C]>) =>
      <K extends keyof Theme[C]>(
        elementKeys: Array<K> | K | Partial<{ [k in keyof Theme[C]]: boolean }>,
        internalOverride?: CSSProperties,
        className?: string,
      ): { style: Theme[C][K]; dataThemeId: string } => {
        let keys = []

        if (Array.isArray(elementKeys)) {
          keys = elementKeys
        } else if (typeof elementKeys === 'string') {
          keys = [elementKeys]
        } else {
          keys = Object.keys(elementKeys).filter((k) => elementKeys[k])
        }

        const dataThemeId = `${className ? `${className}:` : ''}${componentKey}:${keys.reduce(
          (str, k, i) => `${str}${i === 0 ? '' : ','}${k}`,
          '',
        )}`
        return {
          dataThemeId,
          style: omitKeys(
            {
              ...(keys.reduce(
                (obj, elementKey) => ({
                  ...obj,
                  ...theme[componentKey][elementKey],
                  ...(override && override[elementKey] ? override[elementKey] : {}),
                }),
                {},
              ) as any),
              ...(internalOverride || {}),
            },
            dynamicStyleKeys as any,
          ),
        }
      }
  }

/*
 * Generates the CSS style object for a styled component created with the createStyled() function
 */

export const getUseCSSStyles =
  <Theme>() =>
  <C extends keyof Theme>(theme: Theme, componentKey: C) =>
  (override?: Partial<Theme[C]>) =>
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
              ...(override && override[elementKey] ? override[elementKey] : {}),
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
              ...(override && override[elementKey] ? override[elementKey][k] : {}),
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

    const cssStyles = `
    ${mapStylesToCSS(styles.css || {})}

    &:hover {
      ${mapStylesToCSS(styles[':hover'] || {})}
    }

    &:focus {
      ${mapStylesToCSS(styles[':focus'] || {})}
    }

    &:invalid {
      ${mapStylesToCSS(styles[':invalid'] || {})}
    }

    &:disabled {
      ${mapStylesToCSS(styles[':disabled'] || {})}
    }

    &[disabled] {
      ${mapStylesToCSS(styles[':disabled'] || {})}
    }

    &[readonly] {
      ${mapStylesToCSS(styles[':readonly'] || {})}
    }

    @media ${MediaQuery.Mobile} {
      ${mapStylesToCSS(styles['@media-mobile'] || {})}
    }

    ${animation ? `&.animate { animation: ${animation}; }` : ''}
  `

    const dataThemeId = `${className ? `${className}:` : ''}${componentKey}:${keys.reduce(
      (str, k, i) => `${str}${i === 0 ? '' : ','}${k}`,
      '',
    )}`

    return {
      cssStyles,
      dataThemeId,
    }
  }
