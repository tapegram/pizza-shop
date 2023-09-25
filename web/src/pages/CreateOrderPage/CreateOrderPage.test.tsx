import { render } from '@redwoodjs/testing/web'

import CreateOrderPage from './CreateOrderPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateOrderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateOrderPage />)
    }).not.toThrow()
  })
})
