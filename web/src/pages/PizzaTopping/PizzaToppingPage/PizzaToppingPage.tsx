import PizzaToppingCell from 'src/components/PizzaTopping/PizzaToppingCell'

type PizzaToppingPageProps = {
  id: number
}

const PizzaToppingPage = ({ id }: PizzaToppingPageProps) => {
  return <PizzaToppingCell id={id} />
}

export default PizzaToppingPage
