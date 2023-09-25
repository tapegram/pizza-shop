import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditOrderById, UpdateOrderInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormOrder = NonNullable<EditOrderById['order']>

interface OrderFormProps {
  order?: EditOrderById['order']
  onSave: (data: UpdateOrderInput, id?: FormOrder['id']) => void
  error: RWGqlError
  loading: boolean
}

const OrderForm = (props: OrderFormProps) => {
  const onSubmit = (data: FormOrder) => {
    props.onSave(data, props?.order?.id)
  }

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
          name="customerInfoId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer info id
        </Label>

        <NumberField
          name="customerInfoId"
          defaultValue={props.order?.customerInfoId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerInfoId" className="rw-field-error" />

        <Label
          name="deliveryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Delivery id
        </Label>

        <NumberField
          name="deliveryId"
          defaultValue={props.order?.deliveryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="deliveryId" className="rw-field-error" />

        <Label
          name="pizzaTypeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pizza type id
        </Label>

        <NumberField
          name="pizzaTypeId"
          defaultValue={props.order?.pizzaTypeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="pizzaTypeId" className="rw-field-error" />

        <Label
          name="pizzaSizeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pizza size id
        </Label>

        <NumberField
          name="pizzaSizeId"
          defaultValue={props.order?.pizzaSizeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="pizzaSizeId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrderForm
