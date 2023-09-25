import EditCustomerInfoCell from 'src/components/CustomerInfo/EditCustomerInfoCell'

type CustomerInfoPageProps = {
  id: number
}

const EditCustomerInfoPage = ({ id }: CustomerInfoPageProps) => {
  return <EditCustomerInfoCell id={id} />
}

export default EditCustomerInfoPage
