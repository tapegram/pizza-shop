import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditAddressById, UpdateAddressInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormAddress = NonNullable<EditAddressById['address']>

interface AddressFormProps {
  address?: EditAddressById['address']
  onSave: (data: UpdateAddressInput, id?: FormAddress['id']) => void
  error: RWGqlError
  loading: boolean
}

const AddressForm = (props: AddressFormProps) => {
  const onSubmit = (data: FormAddress) => {
    props.onSave(data, props?.address?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAddress> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="street_address_1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street address 1
        </Label>

        <TextField
          name="street_address_1"
          defaultValue={props.address?.street_address_1}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="street_address_1" className="rw-field-error" />

        <Label
          name="street_address_2"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street address 2
        </Label>

        <TextField
          name="street_address_2"
          defaultValue={props.address?.street_address_2}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="street_address_2" className="rw-field-error" />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>

        <TextField
          name="city"
          defaultValue={props.address?.city}
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
          defaultValue={props.address?.state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="state" className="rw-field-error" />

        <Label
          name="zip"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Zip
        </Label>

        <TextField
          name="zip"
          defaultValue={props.address?.zip}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="zip" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AddressForm
