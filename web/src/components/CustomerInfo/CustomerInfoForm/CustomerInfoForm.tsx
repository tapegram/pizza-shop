import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditCustomerInfoById,
  UpdateCustomerInfoInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormCustomerInfo = NonNullable<EditCustomerInfoById['customerInfo']>

interface CustomerInfoFormProps {
  customerInfo?: EditCustomerInfoById['customerInfo']
  onSave: (data: UpdateCustomerInfoInput, id?: FormCustomerInfo['id']) => void
  error: RWGqlError
  loading: boolean
}

const CustomerInfoForm = (props: CustomerInfoFormProps) => {
  const onSubmit = (data: FormCustomerInfo) => {
    props.onSave(data, props?.customerInfo?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormCustomerInfo> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.customerInfo?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>

        <TextField
          name="phone"
          defaultValue={props.customerInfo?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.customerInfo?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="orderId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order id
        </Label>

        <NumberField
          name="orderId"
          defaultValue={props.customerInfo?.orderId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="orderId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CustomerInfoForm
