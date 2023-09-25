import EditPizzaTypeCell from 'src/components/PizzaType/EditPizzaTypeCell'

type PizzaTypePageProps = {
  id: number
}

const EditPizzaTypePage = ({ id }: PizzaTypePageProps) => {
  return <EditPizzaTypeCell id={id} />
}

export default EditPizzaTypePage
