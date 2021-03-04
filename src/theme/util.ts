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

const dynamicStyleKeys = [
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
        `${cssKey.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${
          isNaN(cssValue as any) ? cssValue : `${cssValue}px`
        };`,
    )
    .join(' ')

/*
 * Creates a styled component with support for pseudo elements and media query styles provided from a style object
 */

export const createStyled = (type: any) => styled[type]`
  ${(props: {
    styles: CSSProperties
    ':hover': CSSProperties
    ':focus': CSSProperties
    ':invalid': CSSProperties
    ':read-only': CSSProperties
    ':disabled': CSSProperties
    ':media-mobile': CSSProperties
  }) => css`
    ${mapStylesToCSS(props.styles || {})}

    &:hover {
      ${mapStylesToCSS(props[':hover'] || {})}
    }
    &:focus {
      ${mapStylesToCSS(props[':focus'] || {})}
    }

    &:invalid {
      ${mapStylesToCSS(props[':invalid'] || {})}
    }

    &:read-only {
      ${mapStylesToCSS(props[':read-only '] || {})}
    }

    &:disabled {
      ${mapStylesToCSS(props[':disabled'] || {})}
    }

    @media ${MediaQuery.Mobile} {
      ${mapStylesToCSS(props[':media-mobile'] || {})}
    }
  `}
`

/*
 * Generates the style object to be added as inline styles. E.g. <div style={styles}>...
 */

export const useInlineStyle = <C extends keyof AppTheme>(
  theme: AppTheme,
  componentKey: C,
) => {
  return (override?: Partial<AppTheme[C]>) => <K extends keyof AppTheme[C]>(
    elementKey: K,
  ): AppTheme[C][K] => {
    return omitKeys(
      {
        ...theme[componentKey][elementKey],
        ...(override && override[elementKey] ? override[elementKey] : {}),
      } as any,
      dynamicStyleKeys as any,
    )
  }
}

/*
 * Generates the CSS style object for a styled component created with the createStyled() function
 */

export const useCSSStyle = <C extends keyof AppTheme>(
  theme: AppTheme,
  componentKey: C,
) => (override?: Partial<AppTheme[C]>) => <K extends keyof AppTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
): { style: AppTheme[C][K] } => {
  return {
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
}
