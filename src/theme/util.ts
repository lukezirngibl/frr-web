import styled, { css, CSSProperties } from 'styled-components'
import { AppTheme, MediaQuery } from './theme'

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
  ':readonly',
  ':disabled',
  '@media-mobile',
]

const animationKeys = ['@animation']

const nonPixelKeys = [
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'lineHeight',
  'opacity',
]

export const mapStylesToCSS = (style) =>
  Object.entries(style)
    .map(
      ([cssKey, cssValue]) =>
        `${cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${
          isNaN(cssValue as any) || nonPixelKeys.includes(cssKey)
            ? cssValue
            : `${cssValue}px`
        };`,
    )
    .join(' ')

/*
 * Creates a styled component with support for pseudo elements and media query styles provided from a style object
 */

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
    elementKeys: Array<K> | K,
    internalOverride?: CSSProperties,
    className?: string,
  ): { style: Theme[C][K]; className: string } => {
    const keys = Array.isArray(elementKeys)
      ? elementKeys
      : ([elementKeys] as Array<K>)

    return {
      className: `${
        className ? `${className}:` : ''
      }${componentKey}:${keys.reduce(
        (str, k, i) => `${str}${i === 0 ? '' : ','}${k}`,
        '',
      )}`,
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
  const keys = Array.isArray(elementKeys)
    ? elementKeys
    : ([elementKeys] as Array<K>)

  const styles = {
    className: `${componentKey}:${keys.reduce(
      (str, k, i) => `${str}${i === 0 ? '' : ','}${k}`,
      '',
    )}`,
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

  const animationKey = keys.find(
    (elementKey) => !!theme[componentKey][elementKey]['@animation'],
  )
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

    &[readonly] {
      ${mapStylesToCSS(styles[':readonly'] || {})}
    }

    @media ${MediaQuery.Mobile} {
      ${mapStylesToCSS(styles['@media-mobile'] || {})}
    }

    ${animation ? `&.animate { animation: ${animation}; }` : ''}
  `

  return cssStyles
}
export const useCSSStyles = getUseCSSStyles<AppTheme>()
