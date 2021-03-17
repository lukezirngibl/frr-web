import React from 'react'
import styled from 'styled-components'
import { P } from '../html'
import { MediaQuery, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { Label, LabelProps } from './Label'
import { Checklist, StaticChecklist } from './StaticChecklist'

const LabelWrapper = createStyled(styled.div`
  @media ${MediaQuery.Small} {
    display: none;
  }
`)

const TextWrapper = createStyled('div')

export type Props = {
  title?: string
  label?: LabelProps
  description?: string
  list?: Array<Checklist>
}

export const TextInputDescription = (props: Props) => {
  const theme = useAppTheme()
  const getLabelStyle = useCSSStyles(theme, 'label')({})
  const getTextStyle = useCSSStyles(theme, 'textInputDescription')({})

  return (
    <>
      {props.label ? (
        props.label && <Label {...props.label} />
      ) : (
        <LabelWrapper {...getLabelStyle('wrapper')}>
          <br />
        </LabelWrapper>
      )}
      <TextWrapper {...getTextStyle('wrapper')}>
        {props.title && <P label={props.title} {...getTextStyle('title')} />}
        {props.description && (
          <P label={props.description} {...getTextStyle('description')} />
        )}
        {props.list && <StaticChecklist list={props.list} />}
      </TextWrapper>
    </>
  )
}
