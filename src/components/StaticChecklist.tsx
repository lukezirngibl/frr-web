import React from 'react'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { useAppTheme, AppTheme } from '../theme/theme'
import { P } from '../html'
import { Icon } from './Icon'
import { Label, LabelProps } from './Label'

export enum ChecklistType {
  Allowed = 'Allowed',
  Disallowed = 'Disallowed',
}

const mapTypeToIcon: { [k in ChecklistType]: string } = {
  [ChecklistType.Allowed]: 'checkmark',
  [ChecklistType.Disallowed]: 'close',
}

export type Checklist = {
  type: ChecklistType
  title?: string
  items: Array<{
    label: string
  }>
}

export type Props = {
  list: Array<Checklist>
}

export const StaticChecklist = (props: Props) => {
  const theme = useAppTheme()

  const getInlineStyle = useInlineStyle(theme, 'staticChecklist')()
  const getCSSStyles = useCSSStyles(theme, 'staticChecklist')()

  return (
    <>
      <div {...getInlineStyle('wrapper')}>
        <div {...getInlineStyle('listsWrapper')}>
          {props.list.map((l, k1) => (
            <div key={k1} {...getInlineStyle('list')}>
              {l.title && <P label={l.title} />}
              <div {...getInlineStyle('itemsList')}>
                {l.items.map((i, k2) => (
                  <div key={k2} {...getInlineStyle('item')}>
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
