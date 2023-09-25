// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import CreateOrder from './CreateOrder'

const meta: Meta<typeof CreateOrder> = {
  component: CreateOrder,
}

export default meta

type Story = StoryObj<typeof CreateOrder>

export const Primary: Story = {}
