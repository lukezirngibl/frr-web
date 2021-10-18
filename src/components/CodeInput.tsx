import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { range } from 'fp-ts/lib/Array'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { Label, LabelProps } from './Label'

const CodeInputWrapper = createStyled('div')
const Input = createStyled(styled.input`
  div {
    overflow: visible !important;
  }
`)

export type Props = {
  label?: LabelProps
  value: string
  onChange: (v: string) => void
  length: number
  style?: Partial<AppTheme['codeInput']>
}

const replaceChar = (str: string, char: string, index: number) => {
  return str.substr(0, index) + char.charAt(0) + str.substr(index + 1)
}

export const CodeInput = (props: Props) => {
  const theme = useAppTheme()
  const getStyle = useCSSStyles(theme, 'codeInput')(props.style)

  const refs: Array<React.RefObject<typeof Input>> = range(0, props.length - 1).map((i) =>
    React.createRef(),
  )

  const [intervalValue, setIntervalValue] = React.useState(
    props.value || range(0, props.length - 1).reduce((str) => `${str}-`, ''),
  )

  React.useEffect(() => {
    props.onChange(intervalValue)
  }, [intervalValue])

  return (
    <>
      {props.label && <Label {...props.label} />}
      <CodeInputWrapper {...getStyle('wrapper')}>
        {range(0, props.length - 1).map((_, i) => (
          <Input
            key={i}
            onClick={() => setIntervalValue(replaceChar(intervalValue, '-', i))}
            onChange={(e: any) => {
              const v = e.target.value.replace('-', ' ').trim()
              if (v === '') {
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
            ref={refs[i] as any}
            type="number"
            value={intervalValue[i] === '-' ? '' : intervalValue[i]}
            {...getStyle('input')}
            autoFocus={i === 0 ? true : false}
            autocomplete={'off'}
          ></Input>
        ))}
      </CodeInputWrapper>
    </>
  )
}
