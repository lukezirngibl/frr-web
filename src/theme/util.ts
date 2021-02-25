import { AppTheme } from './theme'
import styled, { CSSProperties } from 'styled-components'

export const omit = <T extends { [k: string]: unknown }>(
  obj: T,
  keysIn: Array<keyof T>,
) =>
  Object.keys(obj).reduce(
    (o: T, k: string) =>
      keysIn.includes(k as keyof T) ? o : { ...o, [k]: obj[k] },
    ({} as unknown) as T,
  )

const dynamicStyleKeys = [':hover', ':focus']

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
    ${(props: { ':hove': CSSProperties }) => styleString(props[':hover'] || {})}
  }
  &:focus {
    ${(props: { ':focus': CSSProperties }) =>
      styleString(props[':focus'] || {})}
  }
`

export const createGetStyle = <C extends keyof AppTheme>(
  theme: AppTheme,
  componentKey: C,
) => (override?: Partial<AppTheme[C]>) => <K extends keyof AppTheme[C]>(
  elementKey: K,
): AppTheme[C][K] => {
  return omit(
    {
      ...theme[componentKey][elementKey],
      ...(override && override[elementKey] ? override[elementKey] : {}),
    } as any,
    dynamicStyleKeys as any,
  )
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
