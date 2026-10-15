import { Field, FieldError, FieldLabel, Input } from '../ui';
import { handleInputChange, inputClassNames, isInvalid } from './helpers';
import { useRecipeForm } from './useRecipeForm';

export const CookTime = (): React.JSX.Element => {
  const { form } = useRecipeForm();

  return (
    <form.Field name='cookTime'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='cookTime'
          >
            Cook Time
          </FieldLabel>
          <Field className='gap-2'>
            <div className='flex items-center gap-4'>
              <Input
                className={inputClassNames}
                aria-invalid={isInvalid(state)}
                placeholder='Enter cook time'
                id='cookTime'
                type='number'
                value={state.value}
                onChange={handleInputChange({
                  onChange: handleChange,
                  parse: Number,
                })}
                onBlur={handleBlur}
              />
              <p>mins</p>
            </div>
            <FieldError>
              {state.meta.isTouched && state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
