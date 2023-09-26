import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPizzaSizeById, UpdatePizzaSizeInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPizzaSize = NonNullable<EditPizzaSizeById['pizzaSize']>

interface PizzaSizeFormProps {
  pizzaSize?: EditPizzaSizeById['pizzaSize']
  onSave: (data: UpdatePizzaSizeInput, id?: FormPizzaSize['id']) => void
  error: RWGqlError
  loading: boolean
}

const PizzaSizeForm = (props: PizzaSizeFormProps) => {
  const onSubmit = (data: FormPizzaSize) => {
    props.onSave(data, props?.pizzaSize?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPizzaSize> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.pizzaSize?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="isAvailable"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is available
        </Label>

        <CheckboxField
          name="isAvailable"
          defaultChecked={props.pizzaSize?.isAvailable}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isAvailable" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PizzaSizeForm
