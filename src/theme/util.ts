import { AppTheme, MediaQuery } from './theme'
import styled, { CSSProperties } from 'styled-components'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const omit = <T extends { [k: string]: unknown }>(
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
]

export const styleString = style =>
  Object.entries(style)
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${
          isNaN(v as any) ? v : `${v}px`
        } !important;`,
    )
    .join(' ')

export const createStyled = (type: any) => styled[type]`
  &:hover {
    ${(props: { ':hover': CSSProperties }) =>
      styleString(props[':hover'] || {})}
  }
  &:focus {
    ${(props: { ':focus': CSSProperties }) =>
      styleString(props[':focus'] || {})}
  }

  &:invalid {
    ${(props: { ':invalid': CSSProperties }) =>
      styleString(props[':invalid'] || {})}
  }

  &:read-only {
    ${(props: { ':read-only': CSSProperties }) =>
      styleString(props[':read-only '] || {})}
  }

  &:disabled {
    ${(props: { ':disabled': CSSProperties }) =>
      styleString(props[':disabled'] || {})}
  }
`

export const useGetStyle = <C extends keyof AppTheme>(
  theme: AppTheme,
  componentKey: C,
) => {
  const isMobile = useMediaQuery(MediaQuery.Mobile)

  return (override?: Partial<AppTheme[C]>) => <K extends keyof AppTheme[C]>(
    elementKey: K,
  ): AppTheme[C][K] => {
    return omit(
      {
        ...theme[componentKey][elementKey],
        ...(isMobile ? theme[componentKey][elementKey][':media-mobile'] : {}),
        ...(override && override[elementKey] ? override[elementKey] : {}),
      } as any,
      dynamicStyleKeys as any,
    )
  }
}

export const style = <C extends keyof AppTheme>(
  theme: AppTheme,
  componentKey: C,
) => (override?: Partial<AppTheme[C]>) => <K extends keyof AppTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
): { style: AppTheme[C][K] } => {
  return {
    style: omit(
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
