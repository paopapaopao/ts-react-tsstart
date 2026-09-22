import { MEAL_TYPES } from '#/lib/constants';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  Field,
  FieldError,
  FieldLabel,
} from '../ui';
import { handleValueChange, inputClassNames, isInvalid } from './helpers';
import { useRecipeFormContext } from './RecipeFormContext';

export const MealTypes = () => {
  const { form } = useRecipeFormContext();

  return (
    <form.Field name='mealTypes'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='mealTypes'
          >
            Meal Types
          </FieldLabel>
          <Field className='gap-2'>
            <Combobox
              id='mealTypes'
              items={MEAL_TYPES}
              multiple
              value={state.value}
              onValueChange={handleValueChange(handleChange)}
            >
              <ComboboxInput
                className={inputClassNames}
                aria-invalid={isInvalid(state)}
                placeholder='Select meal types'
                onBlur={handleBlur}
              />
              <ComboboxChips>
                <ComboboxValue>
                  {(values) =>
                    values.length > 0 && (
                      <ul className='flex flex-wrap gap-2'>
                        {values.map((mealType: string, index: number) => (
                          <li key={`${index}-${mealType}`}>
                            <ComboboxChip>{mealType}</ComboboxChip>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent>
                <ComboboxEmpty>Meal type not found</ComboboxEmpty>
                <ComboboxList>
                  {(mealType) => (
                    <ComboboxItem key={mealType} value={mealType}>
                      {mealType}
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
