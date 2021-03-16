import React from 'react'
import { P } from '../html'
import { useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'

const LabelWrapper = createStyled('div')

export type Props = {
  descriptionLabel?: string
}

export const TextInputDescription = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'label')({})

  console.log('LABEL STYLES', getCSSStyle('wrapper'))
  return (
    <>
      <LabelWrapper {...getCSSStyle('wrapper')}><br /></LabelWrapper>
      <P {...getCSSStyle('sublabelText')} label={props.descriptionLabel} />
    </>
  )
}
