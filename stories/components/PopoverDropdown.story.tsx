import React from 'react'
import { PopoverDropdown } from '../../src/components/PopoverDropdown'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PopoverDropdown',
  component: PopoverDropdown,
}

export const Initial = () => {
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      <PopoverDropdown
        label={'Open me'}
        items={[
          {
            label: 'Item 1',
            onClick: () => console.log('Item 1 clicked'),
          },
          {
            label: 'Item 2',
            onClick: () => console.log('Item 2 clicked'),
          },
        ]}
        hasIcon
        hasMobileBurgerMenu
      />
    </div>
  )
}

