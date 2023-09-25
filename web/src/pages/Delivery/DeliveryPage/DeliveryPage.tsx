import DeliveryCell from 'src/components/Delivery/DeliveryCell'

type DeliveryPageProps = {
  id: number
}

const DeliveryPage = ({ id }: DeliveryPageProps) => {
  return <DeliveryCell id={id} />
}

export default DeliveryPage
