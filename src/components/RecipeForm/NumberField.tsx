import { useRecipeFormContext } from './RecipeFormContext';
import { handleInputChange, inputClassNames, isInvalid } from './helpers';
import { Field, FieldError, FieldLabel, Input } from '../ui';

type Props = {
  name: 'prepTime' | 'cookTime' | 'servings' | 'calories';
  label: string;
  placeholder: string;
  suffix?: string;
};

export const NumberField = ({
  name,
  label,
  placeholder,
  suffix,
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
            <div className='flex items-center gap-4'>
              <Input
                className={inputClassNames}
                aria-invalid={isInvalid(field.state)}
                placeholder={placeholder}
                id={name}
                type='number'
                value={field.state.value}
                onChange={handleInputChange({
                  onChange: field.handleChange,
                  parse: Number,
                })}
                onBlur={field.handleBlur}
              />
              {suffix && <p>{suffix}</p>}
            </div>
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
