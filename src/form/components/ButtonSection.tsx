import styled from 'styled-components'
import { createStyled } from '../../theme/util'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { Fragment, ReactNode } from 'react'
import { Button, ButtonType, Props as OriginalButtonProps } from '../../components/Button'

export const ButtonSectionWrapper = (props: {
  dataTestId?: string
  style?: Partial<FormTheme['form']>
  disabled?: boolean
  children: ReactNode
}) => {
  const theme = useFormTheme()
  const getFormStyle = useCSSStyles(theme, 'form')(props.style || {})

  return (
    <ButtonContainer
      disabled={props.disabled}
      dataTestId={props.dataTestId}
      {...getFormStyle('buttonContainer')}
    >
      {props.children}
    </ButtonContainer>
  )
}

export type ButtonProps<FormData> = Omit<OriginalButtonProps, 'onClick'> & {
  onClick: (params: { submit: () => void }) => void
  isDisabled?: (d: FormData) => boolean
}

type ButtonSectionProps<FormData> = {
  buttons: Array<ButtonProps<FormData>>
  data: FormData
  isEdit: boolean
  style?: Partial<FormTheme['form']>
  submit: () => void
}

export const ButtonSection = <FormData extends {}>(props: ButtonSectionProps<FormData>) => {
  return (
    <ButtonSectionWrapper disabled={!props.isEdit} dataTestId="form-actions" style={props.style}>
      {props.buttons.map((button, buttonKey) => {
        // By default the browsers do not focus disabled elements
        // In case the form is controlled by a disabled function, we need to have a tab step before the button to allow it to become anabled once the validation passes
        const shouldAddTabIndexDiv = button.isDisabled && button.type === ButtonType.Primary

        return (
          <Fragment key={`button-${buttonKey}`}>
            {shouldAddTabIndexDiv && <div tabIndex={0} />}
            <Button
              {...button}
              dataTestId={mapButtonDataTestId(button, buttonKey)}
              disabled={button.isDisabled ? button.isDisabled(props.data) : !!button.disabled}
              onClick={() => button.onClick({ submit: props.submit })}
              tabIndex={button.type === ButtonType.Secondary ? -1 : 0}
            />
          </Fragment>
        )
      })}
    </ButtonSectionWrapper>
  )
}

const mapButtonDataTestId = (button: ButtonProps<any>, k: number) =>
  button.dataTestId ||
  (button.type === ButtonType.Primary && 'form:primary') ||
  `form:${(button.type || ButtonType.Secondary).toLowerCase()}:${k + 1}`

const ButtonContainer = createStyled(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`)
