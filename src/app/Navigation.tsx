import { Div, Img, Options, OptionType, P } from '../html'
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
  isError?: boolean
  isWarning?: boolean
  navigationItems: Array<OptionType<string> & { stepNumber?: string }>
  navigationActiveType?: NavigationActiveType
  selectedItem: string
  showStepNumberAsCircle?: boolean
  style?: Partial<ComponentTheme['navigation']>
  title?: string
}

const NavigationItem = (props: {
  isError: boolean
  isItemActive: boolean
  isItemActiveOrCompleted: boolean
  isItemCompleted: boolean
  isLastItem?: boolean
  isWarning: boolean
  item: OptionType<string> & { stepNumber?: string }
  itemIndex: number
  style?: Partial<ComponentTheme['navigation']>
}) => {
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'navigation')(props.style)

  return (
    <Div {...getCSSStyles('itemWrapper')}>
      <Div
        {...getCSSStyles({
          item: true,
          itemActive: props.isItemActiveOrCompleted,
        })}
      >
        <Text
          {...getCSSStyles({
            itemNumber: true,
            itemLabelActive: props.isItemActive,
            itemLabelCompleted: props.isItemCompleted,
            itemNumberActive: props.isItemActive,
            itemNumberCompleted: props.isItemCompleted,
          })}
        >
          {props.item.icon ? (
            <Img {...getCSSStyles('itemIcon')} src={props.item.icon} />
          ) : (
            props.item.stepNumber
          )}
        </Text>

        <P
          {...getCSSStyles({
            itemLabel: true,
            itemLabelActive: props.isItemActive,
            itemLabelCompleted: props.isItemCompleted,
          })}
          label={props.item.label}
          isLabelTranslated={props.item.isLabelTranslated}
        />
      </Div>

      <Div
        {...getCSSStyles(
          {
            progressBar: true,
            progressBarActive: props.isItemActive,
            progressBarCompleted: props.isItemCompleted,
            progressBarError: props.isError,
            progressBarWarning: props.isWarning,
          },
          (props.itemIndex === 0 && {
            marginLeft: 0,
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 4,
          }) ||
            (props.isLastItem && {
              marginRight: 0,
              borderBottomRightRadius: 4,
              borderTopRightRadius: 4,
            }) ||
            {},
        )}
      />
    </Div>
  )
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
            {...getCSSStyles({ itemLabel: true, itemTitle: true, itemStepIndicator: true })}
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
          <NavigationItem
            key={`item-${itemIndex}`}
            item={item}
            itemIndex={itemIndex}
            isError={(itemActiveIndex >= itemIndex && props.isError) || isErrorGroup}
            isItemActive={itemIndex === itemActiveIndex}
            isItemActiveOrCompleted={
              props.navigationActiveType === NavigationActiveType.Single
                ? itemIndex === itemActiveIndex
                : itemIndex <= itemActiveIndex
            }
            isItemCompleted={itemIndex < itemActiveIndex}
            isLastItem={itemIndex === props.navigationItems.length - 1}
            isWarning={itemActiveIndex >= itemIndex && props.isWarning}
          />
        ))}
      </Div>
    </Div>
  )
}

const Text = createStyled('p')
