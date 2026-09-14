import { DIFFICULTIES } from '#/lib/constants';

import { useRecipeFormContext } from './RecipeFormContext';
import { handleValueChange, inputClassNames, isInvalid } from './helpers';
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

export const DifficultyField = (): React.JSX.Element => {
  const { form } = useRecipeFormContext();

  return (
    <form.Field name='difficulty'>
      {(field) => (
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
              value={field.state.value}
              onValueChange={handleValueChange(field.handleChange)}
            >
              <ComboboxInput
                className={inputClassNames}
                aria-invalid={isInvalid(field.state)}
                placeholder='Select difficulty'
                onBlur={field.handleBlur}
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
              {field.state.meta.isTouched &&
                field.state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
