import { createStyled } from '../../theme/util'
import React, { ReactNode, useEffect, useRef } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { setScrolled, getScrolled } from '../util'

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
  style?: CSSProperties
}

export const FieldScrollableWrapper = (props: FieldScrollableWrapperProps) => {
  /* Styles */
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')()

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
      {...getRowStyle('item', props.style || {})}
    >
      {props.children}
    </FormScrollToWrapper>
  )
}
