import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditDeliveryById, UpdateDeliveryInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormDelivery = NonNullable<EditDeliveryById['delivery']>

interface DeliveryFormProps {
  delivery?: EditDeliveryById['delivery']
  onSave: (data: UpdateDeliveryInput, id?: FormDelivery['id']) => void
  error: RWGqlError
  loading: boolean
}

const DeliveryForm = (props: DeliveryFormProps) => {
  const onSubmit = (data: FormDelivery) => {
    props.onSave(data, props?.delivery?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormDelivery> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="addressId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address id
        </Label>

        <NumberField
          name="addressId"
          defaultValue={props.delivery?.addressId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="addressId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DeliveryForm
