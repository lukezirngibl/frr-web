import React from 'react'
import styled from 'styled-components'
import { P } from '../html'
import { MediaQuery, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { Checklist, StaticChecklist } from './StaticChecklist'

const LabelWrapper = createStyled(styled.div`
  @media ${MediaQuery.Small} {
    display: none;
  }
`)

const TextWrapper = createStyled('div')

export type Props = {
  description?: string
  list: Array<Checklist>
}

export const TextInputDescription = (props: Props) => {
  const theme = useAppTheme()
  const getLabelStyle = useCSSStyles(theme, 'label')({})
  const getTextStyle = useCSSStyles(theme, 'textInputDescription')({})

  return (
    <>
      <LabelWrapper {...getLabelStyle('wrapper')}>
        <br />
      </LabelWrapper>
      <TextWrapper {...getTextStyle('wrapper')}>
        {props.description && (
          <P label={props.description} {...getTextStyle('description')} />
        )}
        <StaticChecklist list={props.list} />
      </TextWrapper>
    </>
  )
}
