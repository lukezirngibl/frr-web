import React from 'react'
import styled from 'styled-components'
import { Button, Props as ButtonProps } from '../../components/Button'
import { Label, LabelProps } from '../../components/Label'
import { Checklist, StaticChecklist } from '../../components/StaticChecklist'
import { P } from '../../html'
import { createStyled } from '../../theme/util'
import { LocaleNamespace } from '../../translation'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'

export const FieldRowWrapper = createStyled(styled.div`
  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`)

const StaticWrapper = createStyled('div')

export enum StaticFieldType {
  Text = 'Text',
  Button = 'Button',
  Checklist = 'Checklist',
}

export type Props = {
  label?: LabelProps
} & (
  | {
      subtype: StaticFieldType.Button
      button: ButtonProps
    }
  | {
      subtype: StaticFieldType.Text
      text: string
    }
  | {
      subtype: StaticFieldType.Checklist
      checklistDescription?: string
      checklist: Array<Checklist>
    }
)

export const StaticField = (
  props: Props & { fieldIndex: number; localeNamespace?: LocaleNamespace; formReadOnly: boolean },
) => {
  const theme = useFormTheme()

  const getCSSStyle = useCSSStyles(theme, 'staticField')({})
  const getInlineStyle = useInlineStyle(theme, 'staticField')({})
  const getRowStyle = useCSSStyles(theme, 'row')({})

  const label = { localeNamespace: props.localeNamespace, ...props.label }

  return props.formReadOnly ? null : (
    <FieldRowWrapper key={`row-${props.fieldIndex}`} {...getRowStyle('wrapper')}>
      {props.label ? <Label {...label} /> : <Label label={() => ''} />}

      <StaticWrapper {...getCSSStyle('wrapper')}>
        {props.subtype === StaticFieldType.Text && (
          <P label={props.text} localeNamespace={props.localeNamespace} {...getCSSStyle('text')} />
        )}
        {props.subtype === StaticFieldType.Checklist && (
          <>
            {props.checklistDescription && (
              <P
                label={props.checklistDescription}
                localeNamespace={props.localeNamespace}
                {...getCSSStyle('title')}
              />
            )}
            <StaticChecklist list={props.checklist} localeNamespace={props.localeNamespace} />
          </>
        )}
        {props.subtype === StaticFieldType.Button && (
          <Button
            {...props.button}
            override={getInlineStyle(['button'], props.button.override || {}).style}
          />
        )}
      </StaticWrapper>
    </FieldRowWrapper>
  )
}
