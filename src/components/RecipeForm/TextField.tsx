import { useRecipeFormContext } from './RecipeFormContext';
import { handleInputChange, inputClassNames, isInvalid } from './helpers';
import { Field, FieldError, FieldLabel, Input } from '../ui';

type Props = {
  name: 'name' | 'cuisine';
  label: string;
  placeholder: string;
};

export const TextField = ({
  name,
  label,
  placeholder,
}: Props): React.JSX.Element => {
  const { form } = useRecipeFormContext();

  return (
    <form.Field name={name}>
      {(field) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor={name}
          >
            {label}
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(field.state)}
              placeholder={placeholder}
              id={name}
              value={field.state.value}
              onChange={handleInputChange({
                onChange: field.handleChange,
                parse: (value) => value,
              })}
              onBlur={field.handleBlur}
            />
            <FieldError>
              {field.state.meta.isTouched &&
                field.state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
