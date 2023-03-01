import React from 'react'
import { ChecklistType, StaticChecklist } from '../../src/components/StaticChecklist'
import { StaticFieldType } from '../../src/form/components/StaticField'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/StaticChecklist',
  component: StaticChecklist,
}

export const Initial = () => {
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      <StaticChecklist
        title={'I am a list'}
        list={[
          {
            title: 'Allowed items',
            type: ChecklistType.Allowed,
            items: [
              {
                label: 'Allowed item 1',
              },
              {
                label: 'Allowed item 2',
              },
              {
                label: 'Allowed item 3',
              },
            ],
          },
          {
            title: 'Disallowed items',
            type: ChecklistType.Disallowed,
            items: [
              {
                label: 'Disallowed item 1',
              },
              {
                label: 'Disallowed item 2',
              },
              {
                label: 'Disallowed item 3',
              },
            ],
          },
        ]}
      />
    </div>
  )
}
