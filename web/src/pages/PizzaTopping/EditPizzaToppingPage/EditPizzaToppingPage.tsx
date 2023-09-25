import EditPizzaToppingCell from 'src/components/PizzaTopping/EditPizzaToppingCell'

type PizzaToppingPageProps = {
  id: number
}

const EditPizzaToppingPage = ({ id }: PizzaToppingPageProps) => {
  return <EditPizzaToppingCell id={id} />
}

export default EditPizzaToppingPage
