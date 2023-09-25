import EditPizzaSizeCell from 'src/components/PizzaSize/EditPizzaSizeCell'

type PizzaSizePageProps = {
  id: number
}

const EditPizzaSizePage = ({ id }: PizzaSizePageProps) => {
  return <EditPizzaSizeCell id={id} />
}

export default EditPizzaSizePage
