import { useMobileTouch } from '../hooks/useMobileTouch'
import { P } from '../html'
import { MdMenu } from '../icons/new/MdMenu'
import { MdOutlineExpandMore } from '../icons/new/MdOutlineExpandMore'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { PopoverWithItems, Props as PopoverWithItemsProps } from './PopoverWithItems'

const DrodownSelector = createStyled('div')

export type Props = {
  hasIcon?: boolean
  hasMobileBurgerMenu?: boolean
  label: string
  localeNamespace?: LocaleNamespace
  style?: Partial<ComponentTheme['popoverDropdown']>
} & Omit<PopoverWithItemsProps, 'trigger'>

export const PopoverDropdown = (props: Props) => {
  const { style, label, hasIcon, ...otherProps } = props
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'popoverDropdown')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'popoverDropdown')(props.style)

  const { isMobile } = useMobileTouch()

  return (
    <PopoverWithItems
      {...otherProps}
      trigger={({ onClick }) => (
        <DrodownSelector
          onClick={onClick}
          {...getCSSStyles({
            button: true,
            burgerMenuButton: isMobile && props.hasMobileBurgerMenu,
          })}
        >
          {isMobile && props.hasMobileBurgerMenu ? (
            <MdMenu width={20} />
          ) : (
            <>
              <P
                label={props.label}
                localeNamespace={props.localeNamespace}
                {...getCSSStyles(['label'])}
              />
              {props.hasIcon && <MdOutlineExpandMore width={18} {...getInlineStyle(['icon'])} />}{' '}
            </>
          )}
        </DrodownSelector>
      )}
    />
  )
}
