import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { range } from 'fp-ts/lib/Array'
import { getThemeContext, Theme } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const CodeInputWrapper = styled.div<{ activeBorderColor: string }>`
  display: flex;
  align-items: center;

  input {
    width: 36px;
    height: 56px;
    border-radius: 4px;
    caret-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 24px;
    margin-right: 8px;

    div {
      overflow: visible !important;
    }

    &:focus {
      outline: 0;
      background: transparent !important;
      border-color: ${props => props.activeBorderColor} !important;
    }
  }
`

const Input = styled.input``

export type Props = {
  value: string
  setValue: (v: string) => void
  activeBorderColor: string
  length: number
  style?: Partial<Theme['codeInput']>
}

const replaceChar = (str: string, char: string, index: number) => {
  return str.substr(0, index) + char + str.substr(index + 1)
}

export const CodeInput = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'codeInput')(props.style)

  const refs: Array<React.RefObject<typeof Input>> = range(
    0,
    props.length - 1,
  ).map(i => React.createRef())

  const [intervalValue, setIntervalValue] = React.useState(
    props.value || range(0, props.length - 1).reduce(str => `${str}`, ''),
  )

  React.useEffect(() => {
    props.setValue(intervalValue)
  }, [intervalValue])

  return (
    <CodeInputWrapper
      activeBorderColor={props.activeBorderColor}
      style={getStyle('wrapper')}
    >
      {range(0, props.length - 1).map((_, i) => (
        <Input
          key={i}
          ref={refs[i] as any}
          value={intervalValue[i]}
          style={getStyle('input')}
          onChange={e => {
            const v = e.target.value
            if (v === '') {
              const prev = intervalValue[i]
              setIntervalValue(replaceChar(intervalValue, ' ', i))
              if (prev === ' ') {
                const next = refs[i - 1]
                if (next && next.current) {
                  ;(next.current as any).focus()
                }
              }
            } else {
              setIntervalValue(replaceChar(intervalValue, v, i))
              const next = refs[i + 1]
              if (next && next.current) {
                ;(next.current as any).focus()
              }
            }
          }}
        ></Input>
      ))}
    </CodeInputWrapper>
  )
}
