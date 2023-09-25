import { render } from '@redwoodjs/testing/web'

import CreateOrder from './CreateOrder'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateOrder', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateOrder />)
    }).not.toThrow()
  })
})
