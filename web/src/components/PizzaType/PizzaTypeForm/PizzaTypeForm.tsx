import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPizzaTypeById, UpdatePizzaTypeInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPizzaType = NonNullable<EditPizzaTypeById['pizzaType']>

interface PizzaTypeFormProps {
  pizzaType?: EditPizzaTypeById['pizzaType']
  onSave: (data: UpdatePizzaTypeInput, id?: FormPizzaType['id']) => void
  error: RWGqlError
  loading: boolean
}

const PizzaTypeForm = (props: PizzaTypeFormProps) => {
  const onSubmit = (data: FormPizzaType) => {
    props.onSave(data, props?.pizzaType?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPizzaType> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.pizzaType?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="is_available"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is available
        </Label>

        <CheckboxField
          name="is_available"
          defaultChecked={props.pizzaType?.is_available}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="is_available" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PizzaTypeForm
