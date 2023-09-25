import CustomerInfoCell from 'src/components/CustomerInfo/CustomerInfoCell'

type CustomerInfoPageProps = {
  id: number
}

const CustomerInfoPage = ({ id }: CustomerInfoPageProps) => {
  return <CustomerInfoCell id={id} />
}

export default CustomerInfoPage
