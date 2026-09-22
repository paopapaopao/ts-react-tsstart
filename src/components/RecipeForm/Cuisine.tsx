import { Field, FieldError, FieldLabel, Input } from '../ui';
import { handleInputChange, inputClassNames, isInvalid } from './helpers';
import { useRecipeFormContext } from './RecipeFormContext';

export const Cuisine = () => {
  const { form } = useRecipeFormContext();

  return (
    <form.Field name='cuisine'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='cuisine'
          >
            Cuisine
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(state)}
              placeholder='Enter cuisine'
              id='cuisine'
              value={state.value}
              onChange={handleInputChange({
                onChange: handleChange,
                parse: (value) => value,
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
