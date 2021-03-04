import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { range } from 'fp-ts/lib/Array'
import { getThemeContext, AppTheme } from '../theme/theme'
import { useGetStyle } from '../theme/util'
import { Label, LabelProps } from './Label'

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
    cursor: pointer;

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

const Input = styled.input`
  padding: 0;
  text-align: center;
`

export type Props = {
  label?: LabelProps
  value: string
  onChange: (v: string) => void
  activeBorderColor: string
  length: number
  style?: Partial<AppTheme['codeInput']>
}

const replaceChar = (str: string, char: string, index: number) => {
  return str.substr(0, index) + char + str.substr(index + 1)
}

export const CodeInput = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = useGetStyle(theme, 'codeInput')(props.style)

  const refs: Array<React.RefObject<typeof Input>> = range(
    0,
    props.length - 1,
  ).map(i => React.createRef())

  const [intervalValue, setIntervalValue] = React.useState(
    props.value || range(0, props.length - 1).reduce(str => `${str}-`, ''),
  )

  React.useEffect(() => {
    props.onChange(intervalValue)
  }, [intervalValue])

  return (
    <>
      {props.label && <Label {...props.label} />}
      <CodeInputWrapper
        activeBorderColor={props.activeBorderColor}
        style={getStyle('wrapper')}
      >
        {range(0, props.length - 1).map((_, i) => (
          <Input
            key={i}
            ref={refs[i] as any}
            value={intervalValue[i] === '-' ? '' : intervalValue[i]}
            style={getStyle('input')}
            onClick={e => {
              setIntervalValue(replaceChar(intervalValue, '-', i))
            }}
            type="number"
            onChange={e => {
              const v = e.target.value.replace('-', ' ').trim()
              if (v === '') {
                const prev = intervalValue[i]
                const newValue = replaceChar(intervalValue, '-', i)
                setIntervalValue(newValue)
                if (prev === ' ') {
                  const next = refs[i - 1]
                  ;(refs[i] as any).current.blur()
                  if (next && next.current) {
                    setIntervalValue(replaceChar(newValue, '-', i - 1))
                    ;(next.current as any).focus()
                  }
                }
              } else {
                const newValue = replaceChar(intervalValue, v, i)
                setIntervalValue(newValue)

                const next = refs[i + 1]
                ;(refs[i] as any).current.blur()
                if (next && next.current) {
                  setIntervalValue(replaceChar(newValue, '-', i + 1))
                  ;(next.current as any).focus()
                }
              }
            }}
          ></Input>
        ))}
      </CodeInputWrapper>
    </>
  )
}
