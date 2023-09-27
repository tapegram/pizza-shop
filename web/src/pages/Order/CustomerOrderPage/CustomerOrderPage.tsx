import CustomerOrderCell from 'src/components/Order/CustomerOrderCell'

type CustomerOrderPageProps = {
  id: number
}

const CustomerOrderPage = ({ id }: CustomerOrderPageProps) => {
  return <CustomerOrderCell id={id} />
}

export default CustomerOrderPage
