import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { MediaQuery } from '../theme/configure.theme'
import { ComponentTheme, useComponentTheme, useInlineStyle } from '../theme/theme.components'
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

const LinkText = styled.span<{ $isMobileHidden: boolean }>`
  width: 100%;
  
  @media ${MediaQuery.Mobile} {
    display: ${({ $isMobileHidden }) => ($isMobileHidden ? 'none' : 'block')};
  }
`
type LinkProps = {
  className?: string
  icon?: {
    type: keyof ComponentTheme['icon']
    style: { cssStyles?: string; dataThemeId: string }
  }
  isMobileHidden?: boolean
  label?: string | ReactNode
  localeNamespace?: LocaleNamespace
  onClick: () => unknown
  style?: { cssStyles: string; dataThemeId: string }
}

export const Link = (props: LinkProps) => {
  // App styles
  const theme = useComponentTheme()

  // Icon
  const getIcon = useInlineStyle(theme, 'icon')({})
  const icon = props.icon?.type ? getIcon(props.icon.type) : null

  // Translation
  const { t: translate } = useTranslation(props.localeNamespace)

  return (
    <LinkWrapper onClick={props.onClick} {...props.style} className={props.className}>
      {icon?.style.svg && (
        <LinkIcon dangerouslySetInnerHTML={{ __html: icon.style.svg }} {...props.icon.style} />
      )}
      {props.label && (
        <LinkText $isMobileHidden={props.isMobileHidden}>
          {typeof props.label === 'string' ? translate(props.label) : props.label}
        </LinkText>
      )}
    </LinkWrapper>
  )
}
