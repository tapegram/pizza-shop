import ShopOrderCell from 'src/components/Order/ShopOrderCell'

type ShopOrderPageProps = {
  id: number
}

const ShopOrderPage = ({ id }: ShopOrderPageProps) => {
  return <ShopOrderCell id={id} />
}

export default ShopOrderPage
