import { AppTheme, MediaQuery } from './theme'
import styled, { CSSProperties, css } from 'styled-components'

export const omitKeys = <T extends { [k: string]: unknown }>(
  obj: T,
  keysIn: Array<keyof T>,
) =>
  Object.keys(obj).reduce(
    (o: T, k: string) =>
      keysIn.includes(k as keyof T) ? o : { ...o, [k]: obj[k] },
    ({} as unknown) as T,
  )

export const dynamicStyleKeys = [
  ':hover',
  ':focus',
  ':invalid',
  ':read-only',
  ':disabled',
  ':media-mobile',
]

export const mapStylesToCSS = style =>
  Object.entries(style)
    .map(
      ([cssKey, cssValue]) =>
        `${cssKey.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${
          isNaN(cssValue as any) ? cssValue : `${cssValue}px`
        };`,
    )
    .join(' ')

/*
 * Creates a styled component with support for pseudo elements and media query styles provided from a style object
 */

export type StyledCSSProperties = {
  css: CSSProperties
  ':hover'?: CSSProperties
  ':focus'?: CSSProperties
  ':invalid'?: CSSProperties
  ':read-only'?: CSSProperties
  ':disabled'?: CSSProperties
  ':media-mobile'?: CSSProperties
}
export const createStyled = (type: any) =>
  typeof type === 'string'
    ? styled[type]`
        ${(props: { cssStyles: string }) =>
          css`
            ${props.cssStyles}
          `}
      `
    : styled(type)`
        ${(props: { cssStyles: string }) =>
          css`
            ${props.cssStyles}
          `}
      `

/*
 * Generates the style object to be added as inline styles. E.g. <div style={styles}>...
 */

export const getUseInlineStyle = <Theme>() => <C extends keyof Theme>(
  theme: Theme,
  componentKey: C,
) => {
  return (override?: Partial<Theme[C]>) => <K extends keyof Theme[C]>(
    elementKey: K,
  ): Theme[C][K] => {
    return omitKeys(
      {
        ...theme[componentKey][elementKey],
        ...(override && override[elementKey] ? override[elementKey] : {}),
      } as any,
      dynamicStyleKeys as any,
    )
  }
}
export const useInlineStyle = getUseInlineStyle<AppTheme>()

/*
 * Generates the CSS style object for a styled component created with the createStyled() function
 */

export const getUseCSSStyles = <Theme>() => <C extends keyof Theme>(
  theme: Theme,
  componentKey: C,
) => (override?: Partial<Theme[C]>) => <K extends keyof Theme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
): string => {
  const styles = {
    css: omitKeys(
      {
        ...((Array.isArray(elementKeys) ? elementKeys : [elementKeys]).reduce(
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
    ...dynamicStyleKeys.reduce(
      (obj, k) => ({
        ...obj,
        [k]: (Array.isArray(elementKeys) ? elementKeys : [elementKeys]).reduce(
          (obj, elementKey) => ({
            ...obj,
            ...(theme[componentKey][elementKey][k] || {}),
            ...(override && override[elementKey]
              ? override[elementKey][k]
              : {}),
          }),
          {},
        ),
      }),
      {} as any,
    ),
  }

  return `
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

    &:read-only {
      ${mapStylesToCSS(styles[':read-only '] || {})}
    }

    &:disabled {
      ${mapStylesToCSS(styles[':disabled'] || {})}
    }

    @media ${MediaQuery.Mobile} {
      ${mapStylesToCSS(styles[':media-mobile'] || {})}
    }
  `
}
export const useCSSStyles = getUseCSSStyles<AppTheme>()
