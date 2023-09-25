import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import CreateOrderCell from 'src/components/CreateOrderCell'

const CreateOrderPage = () => {
  return (
    <>
      <MetaTags
        title="Create Order"
        description="Create a new order for a delicious pizza"
      />

      <CreateOrderCell />
    </>
  )
}

export default CreateOrderPage
