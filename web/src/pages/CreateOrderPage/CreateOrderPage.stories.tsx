import type { Meta, StoryObj } from '@storybook/react'

import CreateOrderPage from './CreateOrderPage'

const meta: Meta<typeof CreateOrderPage> = {
  component: CreateOrderPage,
}

export default meta

type Story = StoryObj<typeof CreateOrderPage>

export const Primary: Story = {}
