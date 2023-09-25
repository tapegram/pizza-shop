import PizzaSizeCell from 'src/components/PizzaSize/PizzaSizeCell'

type PizzaSizePageProps = {
  id: number
}

const PizzaSizePage = ({ id }: PizzaSizePageProps) => {
  return <PizzaSizeCell id={id} />
}

export default PizzaSizePage
