import React from 'react'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { useAppTheme, AppTheme } from '../theme/theme'
import { P } from '../html'
import { Icon } from './Icon'

export enum ChecklistType {
  Allowed = 'Allowed',
  Disallowed = 'Disallowed',
}

const mapTypeToIcon: { [k in ChecklistType]: string } = {
  [ChecklistType.Allowed]: 'checkmark',
  [ChecklistType.Disallowed]: 'close',
}

const Container = createStyled('div')

export type Checklist = {
  type: ChecklistType
  title?: string
  items: Array<{
    label: string
  }>
}

export type Props = {
  list: Array<Checklist>
  title?: string
  description?: string
  style?: Partial<AppTheme['staticChecklist']>
}

export const StaticChecklist = (props: Props) => {
  const theme = useAppTheme()

  const getInlineStyle = useInlineStyle(theme, 'staticChecklist')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'staticChecklist')(props.style)

  return (
    <>
      <Container {...getCSSStyles('wrapper')}>
        {props.title && <P label={props.title} {...getCSSStyles('title')} />}
        {props.description && (
          <P label={props.description} {...getCSSStyles('description')} />
        )}
        <Container {...getCSSStyles('listsWrapper')}>
          {props.list.map((l, k1) => (
            <Container key={k1} {...getCSSStyles('list')}>
              {l.title && <P label={l.title} />}
              <Container {...getCSSStyles('itemsList')}>
                {l.items.map((i, k2) => (
                  <Container key={k2} {...getCSSStyles('item')}>
                    <Icon
                      icon={mapTypeToIcon[l.type]}
                      size={18}
                      {...getInlineStyle({
                        itemIcon: true,
                        iconAllowed: l.type === ChecklistType.Allowed,
                        iconDisallowed: l.type !== ChecklistType.Allowed,
                      })}
                    />
                    <P label={i.label} {...getCSSStyles('itemLabel')}></P>
                  </Container>
                ))}
              </Container>
            </Container>
          ))}
        </Container>
      </Container>
    </>
  )
}
