import { MEAL_TYPES } from '#/lib/constants';

import { useRecipeFormContext } from './RecipeFormContext';
import { handleValueChange, inputClassNames, isInvalid } from './helpers';
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

export const MealTypesField = (): React.JSX.Element => {
  const { form } = useRecipeFormContext();

  return (
    <form.Field name='mealTypes'>
      {(field) => (
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
              value={field.state.value}
              onValueChange={handleValueChange(field.handleChange)}
            >
              <ComboboxInput
                className={inputClassNames}
                aria-invalid={isInvalid(field.state)}
                placeholder='Select meal types'
                onBlur={field.handleBlur}
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
              {field.state.meta.isTouched &&
                field.state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
