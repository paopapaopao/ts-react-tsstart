import { Field, FieldError, FieldLabel, Input } from '../ui';
import { handleInputChange, inputClassNames, isInvalid } from './helpers';
import { useRecipeForm } from './useRecipeForm';

export const Name = (): React.JSX.Element => {
  const { form } = useRecipeForm();

  return (
    <form.Field name='name'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='name'
          >
            Name
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(state)}
              placeholder='Enter name'
              id='name'
              value={state.value}
              onChange={handleInputChange({
                onChange: handleChange,
                parse: (value: string) => value,
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
