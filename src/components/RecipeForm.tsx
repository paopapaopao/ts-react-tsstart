import { type Updater, useForm } from '@tanstack/react-form';
import { useState } from 'react';

import { DIFFICULTIES, MEAL_TYPES } from '#/lib/constants';
import { recipeFormSchema } from '#/lib/schemas';
import type { RecipeFormSchema } from '#/lib/types';
import { cn } from '#/lib/utils';

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardHeader,
  CardTitle,
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
  FieldSeparator,
  Input,
} from './ui';

type Props = {
  className?: string;
  label?: string;
  values?: RecipeFormSchema;
  onSubmit?: (payload: RecipeFormSchema) => void | Promise<void>;
};

const defaultValues: RecipeFormSchema = {
  image: '',
  name: '',
  ingredients: [] as string[],
  instructions: [] as string[],

  prepTime: 0,
  cookTime: 0,
  difficulty: '',
  servings: 0,
  calories: 0,
  cuisine: '',
  tags: [] as string[],
  mealTypes: [],

  userId: 0,
  reviewCount: 0,
  rating: 0,
};

/**
 * TODO
 *  - Add on focus styles (yellow)
 *  - Set combobox and input:number icons to cursor pointer
 */

export const RecipeForm = ({
  className = '',
  label = 'Submit',
  values = defaultValues,
  onSubmit = () => {},
}: Props): React.JSX.Element => {
  // const [image, setImage] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [instruction, setInstruction] = useState('');
  const [tag, setTag] = useState('');

  const { handleSubmit, Field: FormField } = useForm({
    defaultValues: values,
    validators: {
      onBlur: recipeFormSchema,
      onSubmit: recipeFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const isInvalid = (state: {
    meta: { isTouched: boolean; isValid: boolean };
  }) => (state.meta.isTouched ? !state.meta.isValid : undefined);

  const handleKeyDown = ({
    isUnique,
    onChange,
    setState,
  }: {
    isUnique: boolean;
    onChange: (updater: Updater<string[]>) => void;
    setState: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;

      event.preventDefault();

      const value = event.currentTarget.value.trim();

      if (value === '') return;

      onChange((previousValue) => {
        if (previousValue.includes(value) && isUnique) {
          return previousValue;
        }

        return [...previousValue, value];
      });

      setState('');
    };
  };

  const handleInputChange = <T,>({
    onChange,
    parse,
  }: {
    onChange: (value: T) => void;
    parse: (value: string) => T;
  }) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parse(event.target.value));
    };
  };

  const handleValueChange = <T,>(onChange: (value: T) => void) => {
    return (value: T | null) => {
      if (value === null) return;

      onChange(value);
    };
  };

  const handleClick = ({
    index,
    onChange,
  }: {
    index: number;
    onChange: (updater: Updater<string[]>) => void;
  }) => {
    return () => {
      onChange((value) => value.filter((_, i) => i !== index));
    };
  };

  const formClassName = cn(
    'grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4',
    className,
  );

  const classNames = cn(
    'aria-[invalid=false]:ring-3',
    'aria-[invalid=false]:ring-green-500/30',
    'aria-[invalid=false]:border-green-500',
  );

  return (
    <form
      className={formClassName}
      action=''
      onSubmit={(event) => {
        event.preventDefault();

        handleSubmit();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();
      }}
    >
      {/* <FormField name='image'>
        {({ state, handleChange }) => (
          <>
            <FieldLabel
              className='justify-self-end self-start leading-9'
              htmlFor='image'
            >
              Image
            </FieldLabel>
            <Field className='hidden'>
              <Input
                id='image'
                type='file'
                value={state.value}
                onChange={(event) => {
                  handleChange(event.target.value);

                  const file = event.target.files?.[0];

                  if (!file) return;

                  setImage(URL.createObjectURL(file));
                }}
                accept='image/*'
              />
            </Field>
          </>
        )}
      </FormField>
      {image && (
        <img
          src={image}
          alt='Preview'
          className='h-48 w-48 rounded-md object-cover border'
        />
      )} */}

      <FormField name='name'>
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
                className={classNames}
                aria-invalid={isInvalid(state)}
                placeholder='Enter name'
                id='name'
                value={state.value}
                onChange={handleInputChange({
                  onChange: handleChange,
                  parse: (value) => value,
                })}
                onBlur={handleBlur}
              />
              <FieldError>
                {state.meta.isTouched && state.meta.errors[0]?.message}
              </FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='ingredients'>
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
                className={classNames}
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
                  parse: (value) => value,
                })}
                onBlur={handleBlur}
              />
              {state.value.length > 0 && (
                <ul className='flex flex-col gap-2'>
                  {state.value.map((ingredient, index) => (
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
      </FormField>

      <FormField name='instructions'>
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
                className={classNames}
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
                          <CardTitle className='flex-1'>
                            {instruction}
                          </CardTitle>
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
      </FormField>

      <FieldSeparator className='py-8 col-span-2' />

      <FormField name='prepTime'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              className='justify-self-end self-start leading-9'
              htmlFor='prepTime'
            >
              Prep Time
            </FieldLabel>
            <Field className='gap-2'>
              <div className='flex items-center gap-4'>
                <Input
                  className={classNames}
                  aria-invalid={isInvalid(state)}
                  placeholder='Enter preparation time'
                  id='prepTime'
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
      </FormField>

      <FormField name='cookTime'>
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
                  className={classNames}
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
      </FormField>

      <FormField name='difficulty'>
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
                  className={classNames}
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
      </FormField>

      <FormField name='servings'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              className='justify-self-end self-start leading-9'
              htmlFor='servings'
            >
              Servings
            </FieldLabel>
            <Field className='gap-2'>
              <Input
                className={classNames}
                aria-invalid={isInvalid(state)}
                placeholder='Enter servings'
                id='servings'
                type='number'
                value={state.value}
                onChange={handleInputChange({
                  onChange: handleChange,
                  parse: Number,
                })}
                onBlur={handleBlur}
              />
              <FieldError>
                {state.meta.isTouched && state.meta.errors[0]?.message}
              </FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='calories'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              className='justify-self-end self-start leading-9'
              htmlFor='calories'
            >
              Calories
            </FieldLabel>
            <Field className='gap-2'>
              <div className='flex items-center gap-4'>
                <Input
                  className={classNames}
                  aria-invalid={isInvalid(state)}
                  placeholder='Enter calories'
                  id='calories'
                  type='number'
                  value={state.value}
                  onChange={handleInputChange({
                    onChange: handleChange,
                    parse: Number,
                  })}
                  onBlur={handleBlur}
                />
                <p>/serving</p>
              </div>
              <FieldError>
                {state.meta.isTouched && state.meta.errors[0]?.message}
              </FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='cuisine'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              className='justify-self-end self-start leading-9'
              htmlFor='cuisine'
            >
              Cuisine
            </FieldLabel>
            <Field className='gap-2'>
              <Input
                className={classNames}
                aria-invalid={isInvalid(state)}
                placeholder='Enter cuisine'
                id='cuisine'
                value={state.value}
                onChange={handleInputChange({
                  onChange: handleChange,
                  parse: (value) => value,
                })}
                onBlur={handleBlur}
              />
              <FieldError>
                {state.meta.isTouched && state.meta.errors[0]?.message}
              </FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='tags'>
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
                className={classNames}
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
                  parse: (value) => value,
                })}
                onBlur={handleBlur}
              />
              {state.value.length > 0 && (
                <ul className='flex flex-wrap gap-2'>
                  {state.value.map((tag, index) => (
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
      </FormField>

      <FormField name='mealTypes'>
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
                  className={classNames}
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
      </FormField>

      <Button type='submit' className='mbs-8 col-start-2'>
        {label}
      </Button>
    </form>
  );
};
