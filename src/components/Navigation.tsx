import React from 'react'
import { Options, P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'

const NavigationWrapper = createStyled('div')
const NavigationInnerWrapper = createStyled('div')
const ItemWrapper = createStyled('div')
const Item = createStyled('div')
const ItemNumber = createStyled('p')
const ItemCircle = createStyled('div')
const ItemChevron = createStyled('p')

export enum NavigationActiveType {
  Single = 'Single',
  Fill = 'Fill',
}

type Props = {
  navigationActiveType?: NavigationActiveType
  items: Options<string>
  selectedItem: string
  style?: Partial<AppTheme['navigation']>
}

export const Navigation = (props: Props) => {
  const theme = useAppTheme()

  const getCSSStyles = useCSSStyles(theme, 'navigation')(props.style)

  const itemActiveIndex = props.items.findIndex((item) => item.value === props.selectedItem)

  return (
    <NavigationWrapper {...getCSSStyles('wrapperOuter')}>
      <NavigationInnerWrapper {...getCSSStyles('wrapperInner')}>
        {props.items.map((item, itemIndex) => (
          <ItemWrapper key={`item-${itemIndex}`} {...getCSSStyles('itemWrapper')}>
            <Item
              {...getCSSStyles({
                item: true,
                itemActive:
                  props.navigationActiveType === NavigationActiveType.Single
                    ? itemActiveIndex === itemIndex
                    : itemActiveIndex <= itemIndex,
              })}
            >
              <ItemNumber
                {...getCSSStyles({
                  itemNumber: true,
                  itemLabelActive: itemActiveIndex === itemIndex,
                })}
              >
                {itemIndex + 1}.{' '}
              </ItemNumber>
              <P
                {...getCSSStyles({
                  itemLabel: true,
                  itemLabelActive: itemActiveIndex === itemIndex,
                })}
                label={item.label}
                isLabelTranslated={item.isLabelTranslated}
              />
            </Item>
            <ItemCircle
              {...getCSSStyles({
                itemCircle: true,
                itemCircleActive: item.label === props.selectedItem,
              })}
            />
            {itemIndex !== props.items.length - 1 && (
              <ItemChevron {...getCSSStyles('carrot')}>{'>'}</ItemChevron>
            )}
          </ItemWrapper>
        ))}
      </NavigationInnerWrapper>
    </NavigationWrapper>
  )
}
