import { DIFFICULTIES } from '#/lib/constants';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldError,
  FieldLabel,
} from '../ui';
import { handleValueChange, inputClassNames, isInvalid } from './helpers';
import { useRecipeFormContext } from './RecipeFormContext';

export const Difficulty = () => {
  const { form } = useRecipeFormContext();

  return (
    <form.Field name='difficulty'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='difficulty'
          >
            Difficulty
          </FieldLabel>
          <Field className='gap-2'>
            <Combobox
              id='difficulty'
              items={DIFFICULTIES}
              value={state.value}
              onValueChange={handleValueChange(handleChange)}
            >
              <ComboboxInput
                className={inputClassNames}
                aria-invalid={isInvalid(state)}
                placeholder='Select difficulty'
                onBlur={handleBlur}
              />
              <ComboboxContent>
                <ComboboxEmpty>Difficulty not found</ComboboxEmpty>
                <ComboboxList>
                  {(difficulty) => (
                    <ComboboxItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldError>
              {state.meta.isTouched && state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
