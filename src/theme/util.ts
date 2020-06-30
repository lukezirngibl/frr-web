import { Theme } from './theme'

export const createGetStyle = <C extends keyof Theme>(
  theme: Theme,
  componentKey: C,
) => (override?: Partial<Theme[C]>) => <K extends keyof Theme[C]>(
  elementKey: K,
): Theme[C][K] => {
  return {
    ...theme[componentKey][elementKey],
    ...(override && override[elementKey] ? override[elementKey] : {}),
  }
}
