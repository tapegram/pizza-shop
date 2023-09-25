type Props = {
  sizes: Size[]
  types: Type[]
  toppings: Topping[]
}

type Size = {
  id: number
  name: string
}

type Type = {
  id: number
  name: string
}

type Topping = {
  id: number
  name: string
}

const CreateOrder = (props: Props) => {
  return (
    <div>
      <div>{JSON.stringify([props.sizes, props.types, props.toppings])}</div>
      <h2>{'CreateOrder'}</h2>
      <p>{'Find me in ./web/src/components/CreateOrder/CreateOrder.tsx'}</p>
    </div>
  )
}

export default CreateOrder
