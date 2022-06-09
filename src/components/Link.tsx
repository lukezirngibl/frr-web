import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { MediaQuery } from '../theme/configure.theme'
import { useComponentTheme, useInlineStyle } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'

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

      &[fill='none'] {
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
  className?: string
  icon?: {
    type: 'edit' | 'info' | 'settings'
    style: { cssStyles?: string; dataThemeId: string }
  }
  label?: string
  localeNamespace?: LocaleNamespace
  onClick: () => unknown
  style?: { cssStyles: string; dataThemeId: string }
}

export const Link = (props: LinkProps) => {
  // App styles
  const theme = useComponentTheme()

  // Icon
  const getIcon = useInlineStyle(theme, 'icon')({})
  const icon = props.icon.type ? getIcon(props.icon.type) : null

  // Translation
  const { t: translate } = useTranslation(props.localeNamespace)

  return (
    <LinkWrapper onClick={props.onClick} {...props.style} className={props.className}>
      {icon?.style.svg && (
        <LinkIcon dangerouslySetInnerHTML={{ __html: icon.style.svg }} {...props.icon.style} />
      )}
      {props.label && <LinkText>{translate(props.label)}</LinkText>}
    </LinkWrapper>
  )
}
