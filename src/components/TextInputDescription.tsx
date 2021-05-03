import React from 'react'
import styled from 'styled-components'
import { P } from '../html'
import { MediaQuery, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { Checklist, StaticChecklist } from './StaticChecklist'

const LabelWrapper = createStyled(styled.div`
  @media ${MediaQuery.Small} {
    display: none;
  }
`)

const TextWrapper = createStyled('div')

export type Props = {
  description?: string
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  list?: Array<Checklist>
  title?: string
}

export const TextInputDescription = (props: Props) => {
  const theme = useAppTheme()
  const getLabelStyle = useCSSStyles(theme, 'label')({})
  const getTextStyle = useCSSStyles(theme, 'textInputDescription')({})

  const label = { localeNamespace: props.localeNamespace, ...props.label }
  return (
    <>
      {props.label ? (
        props.label && <Label {...label} />
      ) : (
        <LabelWrapper {...getLabelStyle('wrapper')}>
          <br />
        </LabelWrapper>
      )}
      <TextWrapper {...getTextStyle('wrapper')}>
        {props.title && (
          <P
            label={props.title}
            localeNamespace={props.localeNamespace}
            {...getTextStyle('title')}
          />
        )}
        {props.description && (
          <P
            label={props.description}
            localeNamespace={props.localeNamespace}
            {...getTextStyle('description')}
          />
        )}
        {props.list && (
          <StaticChecklist
            list={props.list}
            localeNamespace={props.localeNamespace}
          />
        )}
      </TextWrapper>
    </>
  )
}
