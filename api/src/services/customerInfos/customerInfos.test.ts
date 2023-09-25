import type { CustomerInfo } from '@prisma/client'

import {
  customerInfos,
  customerInfo,
  createCustomerInfo,
  updateCustomerInfo,
  deleteCustomerInfo,
} from './customerInfos'
import type { StandardScenario } from './customerInfos.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerInfos', () => {
  scenario('returns all customerInfos', async (scenario: StandardScenario) => {
    const result = await customerInfos()

    expect(result.length).toEqual(Object.keys(scenario.customerInfo).length)
  })

  scenario(
    'returns a single customerInfo',
    async (scenario: StandardScenario) => {
      const result = await customerInfo({ id: scenario.customerInfo.one.id })

      expect(result).toEqual(scenario.customerInfo.one)
    }
  )

  scenario('creates a customerInfo', async (scenario: StandardScenario) => {
    const result = await createCustomerInfo({
      input: {
        name: 'String',
        phone: 'String',
        email: 'String',
        updatedAt: '2023-09-25T15:47:54.869Z',
        orderId: scenario.customerInfo.two.orderId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.phone).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-09-25T15:47:54.869Z'))
    expect(result.orderId).toEqual(scenario.customerInfo.two.orderId)
  })

  scenario('updates a customerInfo', async (scenario: StandardScenario) => {
    const original = (await customerInfo({
      id: scenario.customerInfo.one.id,
    })) as CustomerInfo
    const result = await updateCustomerInfo({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a customerInfo', async (scenario: StandardScenario) => {
    const original = (await deleteCustomerInfo({
      id: scenario.customerInfo.one.id,
    })) as CustomerInfo
    const result = await customerInfo({ id: original.id })

    expect(result).toEqual(null)
  })
})
