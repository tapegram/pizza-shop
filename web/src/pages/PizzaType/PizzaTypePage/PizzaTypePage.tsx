import PizzaTypeCell from 'src/components/PizzaType/PizzaTypeCell'

type PizzaTypePageProps = {
  id: number
}

const PizzaTypePage = ({ id }: PizzaTypePageProps) => {
  return <PizzaTypeCell id={id} />
}

export default PizzaTypePage
