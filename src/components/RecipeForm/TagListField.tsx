import { useState } from 'react';

import { useRecipeFormContext } from './RecipeFormContext';
import {
  handleInputChange,
  handleKeyDown,
  inputClassNames,
  isInvalid,
} from './helpers';
import { Field, FieldError, FieldLabel, Input } from '../ui';

type Props = {
  name: 'ingredients' | 'instructions' | 'tags';
  label: string;
  placeholder: string;
  unique?: boolean;
  itemsClassName?: string;
  renderItem: (
    value: string,
    index: number,
    onRemove: () => void,
  ) => React.ReactNode;
};

export const TagListField = ({
  name,
  label,
  placeholder,
  unique = false,
  itemsClassName = 'flex flex-col gap-2',
  renderItem,
}: Props): React.JSX.Element => {
  const { form } = useRecipeFormContext();
  const [draft, setDraft] = useState('');

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
              value={draft}
              onKeyDown={handleKeyDown({
                isUnique: unique,
                onChange: field.handleChange,
                setState: setDraft,
              })}
              onChange={handleInputChange({
                onChange: setDraft,
                parse: (value) => value,
              })}
              onBlur={field.handleBlur}
            />
            {field.state.value.length > 0 && (
              <ul className={itemsClassName}>
                {field.state.value.map((value, index) =>
                  renderItem(value, index, () => {
                    field.handleChange((previous) =>
                      previous.filter((_, i) => i !== index),
                    );
                  }),
                )}
              </ul>
            )}
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
