import React, { ReactNode, useEffect } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { DeepPartial } from '../../util'

/*
 * Styled components
 */

const FormScrollToWrapper = createStyled(styled.div<{
  width?: string
  maxwidth?: number
}>`
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    &:first-of-type {
      margin-top: 0;
    }
  }
`)

/*
 * Render field function
 */

type FieldScrollableWrapperProps = {
  children: ReactNode
  isScrollToError: boolean
  style?: DeepPartial<FormTheme>
}

export const FieldScrollableWrapper = (props: FieldScrollableWrapperProps) => {
  /* Styles */
  const theme = useFormTheme()
  const getCSSStyles = useCSSStyles(theme, 'row')(props.style?.row || {})

  const fieldRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (props.isScrollToError && fieldRef.current) {
      fieldRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [props.isScrollToError])

  /* Render form field */

  return (
    <FormScrollToWrapper
      className="form-field"
      ref={fieldRef}
      {...getCSSStyles('item')}
    >
      {props.children}
    </FormScrollToWrapper>
  )
}
