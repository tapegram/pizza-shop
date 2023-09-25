import EditDeliveryCell from 'src/components/Delivery/EditDeliveryCell'

type DeliveryPageProps = {
  id: number
}

const EditDeliveryPage = ({ id }: DeliveryPageProps) => {
  return <EditDeliveryCell id={id} />
}

export default EditDeliveryPage
