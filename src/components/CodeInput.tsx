import { range } from 'fp-ts/lib/Array'
import React from 'react'
import styled from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Label, LabelProps } from './Label'

const CodeInputWrapper = createStyled('div')
const Input = createStyled(styled.input`
  div {
    overflow: visible !important;
  }
`)

export type Props = {
  isAutoFocus: boolean
  label?: LabelProps
  length: number
  onChange: (v: string) => void
  style?: Partial<ComponentTheme['codeInput']>
  value: string
}

const replaceChar = (str: string, char: string, index: number) => {
  return str.substr(0, index) + char.charAt(0) + str.substr(index + 1)
}

export const CodeInput = (props: Props) => {
  const { isMobile } = useMobileTouch()
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'codeInput')(props.style)

  const refs: Array<React.RefObject<typeof Input>> = range(0, props.length - 1).map((i) =>
    React.createRef(),
  )

  const defaultStr = range(0, props.length - 1).reduce((str) => `${str}-`, '')

  const [intervalValue, setIntervalValue] = React.useState(props.value || defaultStr)

  React.useEffect(() => {
    props.onChange(intervalValue)
  }, [intervalValue])

  // Clear code input field
  React.useEffect(() => {
    if (
      props.value === '' ||
      props.value === null ||
      props.value === undefined ||
      props.value === defaultStr
    ) {
      setIntervalValue(defaultStr)
      props.isAutoFocus && refs[0].current?.focus()
    }
  }, [props.value, props.isAutoFocus])

  return (
    <>
      {props.label && <Label {...props.label} />}
      <CodeInputWrapper {...getCSSStyles('wrapper')}>
        {range(0, props.length - 1).map((_, i) => (
          <Input
            key={i}
            name={`code-value-${i}`}
            onClick={() => setIntervalValue(replaceChar(intervalValue, '-', i))}
            onChange={(e: any) => {
              const v = e.target.value.replace('-', ' ').trim()
              if (v === '' || isNaN(v)) {
                const prev = intervalValue[i]
                const newValue = replaceChar(intervalValue, '-', i)
                setIntervalValue(newValue)
                if (prev === ' ') {
                  refs[i].current.blur()
                  const next = refs[i - 1]?.current as any
                  if (next) {
                    setIntervalValue(replaceChar(newValue, '-', i - 1))
                    next.focus()
                  }
                }
              } else {
                const newValue = replaceChar(intervalValue, v, i)
                setIntervalValue(newValue)

                refs[i].current.blur()
                const next = refs[i + 1]?.current as any
                if (next) {
                  setIntervalValue(replaceChar(newValue, '-', i + 1))
                  next.focus()
                }
              }
            }}
            onKeyDown={(e: any) => {
              if (e.keyCode === 8) {
                const prev = refs[i - 1]?.current as any
                if (prev) {
                  prev.focus()
                }
              }
            }}
            ref={refs[i] as any}
            value={intervalValue[i] === '-' ? '' : intervalValue[i]}
            type={
              isMobile
                ? 'number'
                : 'text' /* Hack to avoid issues with a bug in firefox when using type=number */
            }
            inputtype="number"
            autoComplete="off"
            {...getCSSStyles('input')}
          />
        ))}
      </CodeInputWrapper>
    </>
  )
}
