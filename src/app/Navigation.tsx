import { Options, P } from '../html'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../theme/theme.components'
import { createStyled } from '../theme/util'

export enum NavigationActiveType {
  Single = 'Single',
  Fill = 'Fill',
}

export type NavigationItem = {
  group: string
  isNotPartOfNavigation: boolean
  isSkipped: boolean
  index: number
}

type Props = {
  items: Array<NavigationItem>
  isError: boolean
  navigationItems: Options<string>
  navigationActiveType?: NavigationActiveType
  selectedItem: string
  style?: Partial<ComponentTheme['navigation']>
  title?: string
}

export const Navigation = (props: Props) => {
  const theme = useComponentTheme()

  const getCSSStyles = useCSSStyles(theme, 'navigation')(props.style)

  let itemActiveIndex = props.navigationItems.findIndex((item) => item.value === props.selectedItem)

  if (itemActiveIndex === -1) {
    const itemIndex = props.items.findIndex((item) => item.group === props.selectedItem)
    let previousActiveItemIndex = itemIndex - 1
    let notFound = true
    while (notFound) {
      if (previousActiveItemIndex < 0) {
        notFound = false
        itemActiveIndex = 0
      } else if (props.items[previousActiveItemIndex].isNotPartOfNavigation) {
        previousActiveItemIndex--
      } else {
        notFound = false
        itemActiveIndex = previousActiveItemIndex
      }
    }

    itemActiveIndex = previousActiveItemIndex
  }

  const isErrorGroup = props.selectedItem === 'Error'

  return (
    <Div {...getCSSStyles('wrapperOuter')}>
      <Div {...getCSSStyles({ itemTitleWrapper: true })}>
        <P {...getCSSStyles({ itemLabel: true, itemTitle: true })} label={props.title} />

        {!isErrorGroup && (
          <P
            {...getCSSStyles({ itemLabel: true, itemTitle: true })}
            label={'navigation.stepIndicationMobile'}
            data={{
              current: `${itemActiveIndex + 1}`,
              total: `${props.navigationItems.length}`,
            }}
          />
        )}
      </Div>

      <Div {...getCSSStyles('wrapperInner')}>
        {props.navigationItems.map((item, itemIndex) => (
          <Div key={`item-${itemIndex}`} {...getCSSStyles('itemWrapper')}>
            <Div
              {...getCSSStyles({
                item: true,
                itemActive:
                  props.navigationActiveType === NavigationActiveType.Single
                    ? itemIndex === itemActiveIndex
                    : itemIndex <= itemActiveIndex,
              })}
            >
              <Text
                {...getCSSStyles({
                  itemNumber: true,
                  itemLabelActive: itemActiveIndex === itemIndex,
                  itemLabelCompleted: itemActiveIndex > itemIndex,
                })}
              >
                {itemIndex + 1}.{' '}
              </Text>
              <P
                {...getCSSStyles({
                  itemLabel: true,
                  itemLabelActive: itemActiveIndex === itemIndex,
                  itemLabelCompleted: itemActiveIndex > itemIndex,
                })}
                label={item.label}
                isLabelTranslated={item.isLabelTranslated}
              />
            </Div>

            <Div
              {...getCSSStyles(
                {
                  progressBar: true,
                  progressBarActive: itemActiveIndex === itemIndex,
                  progressBarCompleted: itemActiveIndex > itemIndex,
                  progressBarError: (itemActiveIndex >= itemIndex && props.isError) || isErrorGroup,
                },
                (itemIndex === 0 && {
                  marginLeft: 0,
                  borderBottomLeftRadius: 4,
                  borderTopLeftRadius: 4,
                }) ||
                  (itemIndex === props.navigationItems.length - 1 && {
                    marginRight: 0,
                    borderBottomRightRadius: 4,
                    borderTopRightRadius: 4,
                  }) ||
                  {},
              )}
            />
            <Div
              {...getCSSStyles({
                itemCircle: true,
                itemCircleActive: item.label === props.selectedItem,
              })}
            />
            {itemIndex !== props.items.length - 1 && <Text {...getCSSStyles('carrot')}>{'>'}</Text>}
          </Div>
        ))}
      </Div>
    </Div>
  )
}

const Div = createStyled('div')
const Text = createStyled('p')
