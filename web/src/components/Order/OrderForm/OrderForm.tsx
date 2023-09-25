import type { EditOrderById, UpdateOrderInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
  SelectField,
  CheckboxField,
  TextField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormOrder = NonNullable<EditOrderById['order']>

interface OrderFormProps {
  order?: EditOrderById['order']
  onSave: (data: UpdateOrderInput, id?: FormOrder['id']) => void
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
  const onSubmit = (data: FormOrder) => {
    props.onSave(data, props?.order?.id)
  }

  const [delivery, setDelivery] = React.useState(false)

  return (
    <div className="rw-form-wrapper">
      <Form<FormOrder> onSubmit={onSubmit} error={props.error}>
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
            <option value={type.id}>{type.name}</option>
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
            <option value={size.id}>{size.name}</option>
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
          validation={{ required: true, valueAsNumber: true }}
          multiple={true}
        >
          {props.toppings.map((topping) => (
            <option value={topping.id}>{topping.name}</option>
          ))}
        </SelectField>

        <FieldError name="toppings" className="rw-field-error" />

        <Label
          name="customer_name"
          className="rw-label"
          errorClassName="label error"
        >
          Your Name
        </Label>
        <TextField
          name="customer_name"
          className="rw-input"
          errorClassName="input error"
          validation={{ required: true }}
        />

        <FieldError name="customer_name" className="rw-field-error" />

        <Label
          name="customer_phone_number"
          className="rw-label"
          errorClassName="label error"
        >
          Phone Number
        </Label>
        <TextField
          name="customer_phone_number"
          className="rw-input"
          errorClassName="input error"
          validation={{ required: true }}
        />

        <FieldError name="customer_phone_number" className="rw-field-error" />

        <Label
          name="customer_email"
          className="rw-label"
          errorClassName="label error"
        >
          Email
        </Label>
        <TextField
          name="customer_email"
          className="rw-input"
          errorClassName="input error"
          validation={{ required: true }}
        />

        <FieldError name="customer_email" className="rw-field-error" />

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
              name="street_address_1"
              className="rw-label"
              errorClassName="label error"
            >
              Street Address
            </Label>
            <TextField
              name="street_address_1"
              className="rw-input"
              errorClassName="input error"
              validation={{ required: true }}
            />
            <FieldError name="street_address_1" className="rw-field-error" />

            <Label
              name="street_address_2"
              className="rw-label"
              errorClassName="label error"
            >
              Street Address Line 2
            </Label>
            <TextField
              name="street_address_2"
              className="rw-input"
              errorClassName="input error"
              validation={{ required: false }}
            />
            <FieldError name="street_address_1" className="rw-field-error" />

            <Label
              name="city"
              className="rw-label"
              errorClassName="label error"
            >
              City
            </Label>
            <TextField
              name="city"
              className="rw-input"
              errorClassName="input error"
              validation={{ required: true }}
            />
            <FieldError name="city" className="rw-field-error" />

            <Label
              name="state"
              className="rw-label"
              errorClassName="label error"
            >
              State
            </Label>
            <TextField
              name="state"
              className="rw-input"
              errorClassName="input error"
              validation={{ required: true }}
            />
            <FieldError name="state" className="rw-field-error" />

            <Label name="zip" className="rw-label" errorClassName="label error">
              Zip
            </Label>
            <TextField
              name="zip"
              className="rw-input"
              errorClassName="input error"
              validation={{ required: true }}
            />
            <FieldError name="zip" className="rw-field-error" />
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
