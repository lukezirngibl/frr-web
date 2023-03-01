import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'

export enum ChecklistType {
  Allowed = 'Allowed',
  Disallowed = 'Disallowed',
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
  description?: string
  list: Array<Checklist>
  localeNamespace?: LocaleNamespace
  style?: Partial<ComponentTheme['staticChecklist']>
  title?: string
}

export const StaticChecklist = (props: Props) => {
  const theme = useComponentTheme()

  const getInlineStyle = useInlineStyle(theme, 'staticChecklist')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'staticChecklist')(props.style)

  return (
    <>
      <Container {...getCSSStyles('wrapper')}>
        {props.title && (
          <P label={props.title} localeNamespace={props.localeNamespace} {...getCSSStyles('title')} />
        )}
        {props.description && (
          <P
            label={props.description}
            localeNamespace={props.localeNamespace}
            {...getCSSStyles('description')}
          />
        )}
        <Container {...getCSSStyles('listsWrapper')}>
          {props.list.map((l, k1) => (
            <Container key={k1} {...getCSSStyles('list')}>
              {l.title && <P label={l.title} localeNamespace={props.localeNamespace} />}
              <Container {...getCSSStyles('itemsList')}>
                {l.items.map((i, k2) => (
                  <Container key={k2} {...getCSSStyles('item')}>
                    {l.type === ChecklistType.Allowed ? (
                      <AiOutlineCheck
                        size={18}
                        {...getInlineStyle({
                          itemIcon: true,
                          iconAllowed: true,
                        })}
                      />
                    ) : (
                      <MdClose
                        size={18}
                        {...getInlineStyle({
                          itemIcon: true,
                          iconDisallowed: true,
                        })}
                      />
                    )}
                    <P
                      label={i.label}
                      localeNamespace={props.localeNamespace}
                      {...getCSSStyles('itemLabel')}
                    ></P>
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
