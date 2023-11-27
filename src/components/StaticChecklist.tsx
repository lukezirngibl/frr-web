import { Div, P } from '../html'
import { AiOutlineCheck } from '../icons/new/AiOutlineCheck'
import { MdClose } from '../icons/new/MdClose'
import {
  ComponentTheme,
  useCSSStyles,
  useComponentTheme,
  useInlineStyle,
} from '../theme/theme.components'
import { LocaleNamespace } from '../translation'

export enum ChecklistType {
  Allowed = 'Allowed',
  Disallowed = 'Disallowed',
}

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
      <Div {...getCSSStyles('wrapper')}>
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
        <Div {...getCSSStyles('listsWrapper')}>
          {props.list.map((l, k1) => (
            <Div key={k1} {...getCSSStyles('list')}>
              {l.title && <P label={l.title} localeNamespace={props.localeNamespace} />}
              <Div {...getCSSStyles('itemsList')}>
                {l.items.map((i, k2) => (
                  <Div key={k2} {...getCSSStyles('item')}>
                    {l.type === ChecklistType.Allowed ? (
                      <AiOutlineCheck
                        width={18}
                        {...getInlineStyle({
                          itemIcon: true,
                          iconAllowed: true,
                        })}
                      />
                    ) : (
                      <MdClose
                        width={18}
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
                  </Div>
                ))}
              </Div>
            </Div>
          ))}
        </Div>
      </Div>
    </>
  )
}
