import { useState } from 'react';

import {
  Button,
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from '../ui';
import {
  handleClick,
  handleInputChange,
  handleKeyDown,
  inputClassNames,
  isInvalid,
} from './helpers';
import { useRecipeFormContext } from './RecipeFormContext';

export const Instructions = () => {
  const [instruction, setInstruction] = useState('');
  const { form } = useRecipeFormContext();

  return (
    <form.Field name='instructions'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='instructions'
          >
            Instructions
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(state)}
              placeholder='Enter instructions'
              id='instructions'
              value={instruction}
              onKeyDown={handleKeyDown({
                isUnique: false,
                onChange: handleChange,
                setState: setInstruction,
              })}
              onChange={handleInputChange({
                onChange: setInstruction,
                parse: (value) => value,
              })}
              onBlur={handleBlur}
            />
            {state.value.length > 0 && (
              <ul className='flex flex-col gap-2'>
                {state.value.map((instruction, index) => (
                  <li key={`${index}-${instruction}`}>
                    <Card className='py-0'>
                      <CardHeader className='flex items-center'>
                        <CardTitle className='flex-1'>{instruction}</CardTitle>
                        <CardAction>
                          <Button
                            variant='link'
                            onClick={handleClick({
                              index,
                              onChange: handleChange,
                            })}
                          >
                            X
                          </Button>
                        </CardAction>
                      </CardHeader>
                    </Card>
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
