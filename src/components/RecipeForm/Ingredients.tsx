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
import { useRecipeForm } from './useRecipeForm';

export const Ingredients = (): React.JSX.Element => {
  const { form } = useRecipeForm();
  const [ingredient, setIngredient] = useState('');

  return (
    <form.Field name='ingredients'>
      {({ state, handleChange, handleBlur }) => (
        <>
          <FieldLabel
            className='justify-self-end self-start leading-9'
            htmlFor='ingredients'
          >
            Ingredients
          </FieldLabel>
          <Field className='gap-2'>
            <Input
              className={inputClassNames}
              aria-invalid={isInvalid(state)}
              placeholder='Enter ingredients'
              id='ingredients'
              value={ingredient}
              onKeyDown={handleKeyDown({
                isUnique: true,
                onChange: handleChange,
                setState: setIngredient,
              })}
              onChange={handleInputChange({
                onChange: setIngredient,
                parse: (value: string) => value,
              })}
              onBlur={handleBlur}
            />
            {state.value.length > 0 && (
              <ul className='flex flex-col gap-2'>
                {state.value.map((ingredient: string, index: number) => (
                  <li key={`${index}-${ingredient}`}>
                    <Card className='py-0'>
                      <CardHeader className='flex items-center'>
                        <CardTitle className='flex-1'>{ingredient}</CardTitle>
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
