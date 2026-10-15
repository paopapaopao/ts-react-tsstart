import { useState } from 'react';

import { Badge, Field, FieldError, FieldLabel, Input } from '../ui';
import {
  handleClick,
  handleInputChange,
  handleKeyDown,
  inputClassNames,
  isInvalid,
} from './helpers';
import { useRecipeForm } from './useRecipeForm';

export const Tags = (): React.JSX.Element => {
  const { form } = useRecipeForm();
  const [tag, setTag] = useState('');

  return (
    <form.Field name='tags'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='tags'
          >
            Tags
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(state)}
              placeholder='Enter tags'
              id='tags'
              value={tag}
              onKeyDown={handleKeyDown({
                onChange: handleChange,
                isUnique: true,
                setState: setTag,
              })}
              onChange={handleInputChange({
                onChange: setTag,
                parse: (value: string) => value,
              })}
              onBlur={handleBlur}
            />
            {state.value.length > 0 && (
              <ul className='flex flex-wrap gap-2'>
                {state.value.map((tag: string, index: number) => (
                  <li key={`${index}-${tag}`}>
                    <Badge className='px-4 py-4'>
                      {tag}
                      <span
                        className='cursor-pointer'
                        onClick={handleClick({
                          index,
                          onChange: handleChange,
                        })}
                      >
                        X
                      </span>
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
            <FieldError>
              {state.meta.isTouched && state.meta.errors[0]?.message}
            </FieldError>
          </Field>
        </>
      )}
    </form.Field>
  );
};
