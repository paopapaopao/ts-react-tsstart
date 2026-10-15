import { Field, FieldError, FieldLabel, Input } from '../ui';
import { handleInputChange, inputClassNames, isInvalid } from './helpers';
import { useRecipeForm } from './useRecipeForm';

export const Servings = (): React.JSX.Element => {
  const { form } = useRecipeForm();

  return (
    <form.Field name='servings'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='servings'
          >
            Servings
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(state)}
              placeholder='Enter servings'
              id='servings'
              type='number'
              value={state.value}
              onChange={handleInputChange({
                onChange: handleChange,
                parse: Number,
              })}
              onBlur={handleBlur}
            />
            <FieldError>
              {state.meta.isTouched && state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
