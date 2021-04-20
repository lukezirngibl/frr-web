import React from 'react'
import styled from 'styled-components'

import { createStyled, useInlineStyle } from '../theme/util'
import { MediaQuery, useAppTheme } from '../theme/theme'
import { useLanguage, useTranslate } from '../theme/language'
import { useTranslation } from 'react-i18next'

const LinkWrapper = createStyled(styled.a`
  display: flex;
  cursor: pointer;
  transition: color 0.3s;
`)
const LinkIcon = createStyled(styled.span`
  & svg {
    color: currentColor;

    & path,
    circle,
    polygon {
      fill: currentColor;

      &[fill='none']: {
        fill: none;
      }
    }
  }
`)

const LinkText = styled.span`
  @media ${MediaQuery.Mobile} {
    display: none;
  }
`
type LinkProps = {
  icon?: {
    type: 'edit' | 'info'
    style: { cssStyles: string, dataThemeId: string }
  }
  label?: string
  onClick: () => unknown
  style: { cssStyles: string; dataThemeId: string }
}

export const Link = (props: LinkProps) => {
  // App styles
  const theme = useAppTheme()

  // Icon
  const getIcon = useInlineStyle(theme, 'icon')({})
  const icon = props.icon.type ? getIcon(props.icon.type) : null 

  // Translation
  const { t: translate } = useTranslation()

  return (
    <LinkWrapper onClick={props.onClick} {...props.style}>
      {icon?.style.svg && (
        <LinkIcon
          dangerouslySetInnerHTML={{ __html: icon.style.svg }}
          {...props.icon.style}
        />
      )}
      {props.label && <LinkText>{translate(props.label)}</LinkText>}
    </LinkWrapper>
  )
}
