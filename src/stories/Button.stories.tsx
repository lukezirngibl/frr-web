import React from 'react'
// @ts-ignore
import { ComponentMeta } from '@storybook/react'

import { Button, Props, ButtonType } from '../components/Button'
import { createStory, meta } from './storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta({
  title: 'Components/Button',
  component: Button,
})

const story = createStory<Props, typeof Button>(Button)

export const Primary = story({ label: 'Primary Button', type: ButtonType.Primary })
export const Secondary = story({ label: 'Secondary Button', type: ButtonType.Secondary })
export const Chromeless = story({ label: 'Chromeless Button', type: ButtonType.Chromeless })
export const Disabled = story({ label: 'Disabled Button', type: ButtonType.Primary, disabled: true })
