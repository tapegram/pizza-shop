import type { EditOrderById, CreateOrderFormInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  Submit,
  SelectField,
  CheckboxField,
  TextField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

interface OrderFormProps {
  order?: EditOrderById['order']
  onSave: (data: CreateOrderFormInput) => void
  error: RWGqlError
  loading: boolean
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
const OrderForm = (props: OrderFormProps) => {
  const onSubmit = (data) => {
    const castInput = {
      ...data,
      toppings: data.toppings.map((topping: string) => parseInt(topping)),
    }
    props.onSave(castInput)
  }

  const [delivery, setDelivery] = React.useState(false)

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Style
        </Label>

        <SelectField
          name="style"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, valueAsNumber: true }}
        >
          {props.types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="style" className="rw-field-error" />

        <Label
          name="size"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Size
        </Label>

        <SelectField
          name="size"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, valueAsNumber: true }}
        >
          {props.sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="size" className="rw-field-error" />

        <Label
          name="toppings"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Toppings
        </Label>

        <SelectField
          name="toppings"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            valueAsNumber: true,
          }}
          multiple={true}
        >
          {props.toppings.map((topping) => (
            <option key={topping.id} value={topping.id}>
              {topping.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="toppings" className="rw-field-error" />

        <Label
          name="customerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Your Name
        </Label>
        <TextField
          name="customerName"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerName" className="rw-field-error" />

        <Label
          name="customerPhoneNumber"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone Number
        </Label>
        <TextField
          name="customerPhoneNumber"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerPhoneNumber" className="rw-field-error" />

        <Label
          name="customerEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="customerEmail"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerEmail" className="rw-field-error" />

        <Label
          name="delivery"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Need delivery?
        </Label>

        <CheckboxField
          name="delivery"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={() => setDelivery(!delivery)}
        ></CheckboxField>

        <FieldError name="delivery" className="rw-field-error" />

        {delivery && (
          <span>
            <Label
              name="streetAddress1"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Street Address
            </Label>
            <TextField
              name="streetAddress1"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="streetAddress1" className="rw-field-error" />

            <Label
              name="streetAddress2"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Street Address Line 2
            </Label>
            <TextField
              name="streetAddress2"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: false }}
            />
            <FieldError name="streetAddress2" className="rw-field-error" />

            <Label
              name="city"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              City
            </Label>
            <TextField
              name="city"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="city" className="rw-field-error" />

            <Label
              name="state"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              State
            </Label>
            <TextField
              name="state"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="state" className="rw-field-error" />

            <Label
              name="zipCode"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Zip
            </Label>
            <TextField
              name="zipCode"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="zipCode" className="rw-field-error" />
          </span>
        )}
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Gimmie that pizza!
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrderForm
