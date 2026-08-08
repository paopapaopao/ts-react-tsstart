import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { DIFFICULTIES, MEAL_TYPES } from '#/lib/constants';
import { recipeFormSchema } from '#/lib/schemas';
import type { RecipeFormSchema } from '#/lib/types';

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
  Input,
} from './ui';

const defaultValues = {
  image: '',
  name: '',
  ingredient: '',
  ingredients: [] as string[],
  instruction: '',
  instructions: [] as string[],

  prepTime: 0,
  cookTime: 0,
  difficulty: '',
  servings: 0,
  calories: 0,
  cuisine: '',
  tag: '',
  tags: [] as string[],
  mealType: '',
  mealTypes: [] as string[],

  userId: 0,
  reviewCount: 0,
  rating: 0,
};

export const RecipeForm = () => {
  const [image, setImage] = useState('');

  const { mutate } = useMutation({
    mutationFn: async (payload: RecipeFormSchema) => {
      const response = await fetch(
        'https://node-ts-fastify-production.up.railway.app/recipes',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            ingredients: [payload.ingredients],
            instructions: [payload.instructions],
            tags: [payload.tags],
            mealType: [payload.mealType],
          }),
        },
      );

      const result = await response.json();

      if (!response.ok && result.errors !== null) {
        throw new Error(Object.values(result.errors).flat().join('. ').trim());
      }

      return result;
    },
  });

  const {
    state: formState,
    setFieldValue,
    handleSubmit,
    Field: FormField,
  } = useForm({
    defaultValues,
    validators: {
      onSubmit: recipeFormSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value as RecipeFormSchema, {
        onSuccess: (): void => {
          alert('Recipe created successfully!');
        },
        onError: (error: Error): void => {
          alert(Object.values(error).flat().join('. ').trim());
        },
      });
    },
  });

  const handleKeyDown = (
    inputField: 'ingredient' | 'instruction' | 'tag',
    arrayField: 'ingredients' | 'instructions' | 'tags',
  ) => {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;

      event.preventDefault();

      const value = event.currentTarget.value.trim();

      if (value === '') return;

      if (formState.values[arrayField].includes(value)) {
        setFieldValue(inputField, '');

        return;
      }

      setFieldValue(arrayField, (prev) => {
        if (prev.includes(value)) {
          return prev;
        }

        return [...prev, value];
      });

      setFieldValue(inputField, '');
    };
  };

  const handleRemoveClick = (
    field: 'ingredients' | 'instructions' | 'tags' | 'mealTypes',
    index: number,
  ) => {
    return () => {
      setFieldValue(field, (prev) => prev.filter((_, i) => i !== index));
    };
  };

  return (
    <form
      action=''
      onSubmit={(event) => {
        event.preventDefault();

        handleSubmit();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') return;

        const target = event.target as HTMLElement;

        if (
          target instanceof HTMLInputElement &&
          ['ingredient', 'instruction', 'tag'].includes(target.id)
        ) {
          return;
        }

        event.preventDefault();
      }}
      className='flex flex-col gap-4'
    >
      <FormField name='image'>
        {({ state, handleChange }) => (
          <Field className='hidden'>
            <FieldLabel htmlFor='image'>Image</FieldLabel>
            <Input
              type='file'
              id='image'
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
        )}
      </FormField>
      {image && (
        <img
          src={image}
          alt='Preview'
          className='h-48 w-48 rounded-md object-cover border'
        />
      )}

      <FormField name='name'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='name'>Name</FieldLabel>
            <Input
              id='name'
              placeholder='Enter name'
              type='text'
              value={state.value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
            />
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='ingredient'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='ingredient'>Ingredients</FieldLabel>
            <Input
              id='ingredient'
              placeholder='Enter ingredients'
              type='text'
              value={state.value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              onKeyDown={handleKeyDown('ingredient', 'ingredients')}
            />
            <FormField name='ingredients'>
              {({ state }) => (
                <>
                  {state.value.length > 0 && (
                    <ul className='flex flex-col gap-2'>
                      {state.value.map((ingredient, index) => (
                        <Card
                          className='py-0'
                          key={`${index}-${ingredient}`}
                        >
                          <CardHeader className='flex items-center'>
                            <CardTitle className='flex-1'>
                              {ingredient}
                            </CardTitle>
                            <CardAction>
                              <Button
                                variant='link'
                                onClick={handleRemoveClick(
                                  'ingredients',
                                  index,
                                )}
                              >
                                X
                              </Button>
                            </CardAction>
                          </CardHeader>
                        </Card>
                      ))}
                    </ul>
                  )}
                  <FieldError>
                    {state.meta.errors
                      .map((error) => error?.message)
                      .join(', ')}
                  </FieldError>
                </>
              )}
            </FormField>
          </Field>
        )}
      </FormField>

      <FormField name='instruction'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='instruction'>Instructions</FieldLabel>
            <Input
              id='instruction'
              placeholder='Enter instructions'
              type='text'
              value={state.value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return;

                event.preventDefault();

                const instruction = state.value.trim();

                if (instruction === '') return;

                setFieldValue('instructions', (prevValues) => [
                  ...prevValues,
                  instruction,
                ]);

                setFieldValue('instruction', '');
              }}
            />
            <FormField name='instructions'>
              {({ state }) => (
                <>
                  {state.value.length > 0 && (
                    <ul className='flex flex-col gap-2'>
                      {state.value.map((instruction, index) => (
                        <Card
                          className='py-0'
                          key={`${index}-${instruction}`}
                        >
                          <CardHeader className='flex items-center'>
                            <CardTitle className='flex-1'>
                              {instruction}
                            </CardTitle>
                            <CardAction>
                              <Button
                                variant='link'
                                onClick={handleRemoveClick(
                                  'instructions',
                                  index,
                                )}
                              >
                                X
                              </Button>
                            </CardAction>
                          </CardHeader>
                        </Card>
                      ))}
                    </ul>
                  )}
                  <FieldError>
                    {state.meta.errors
                      .map((error) => error?.message)
                      .join(', ')}
                  </FieldError>
                </>
              )}
            </FormField>
          </Field>
        )}
      </FormField>

      <FieldSeparator className='py-8' />

      <FormField name='prepTime'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='prepTime'>Prep Time</FieldLabel>
            <Input
              id='prepTime'
              placeholder='Enter preparation time (minutes)'
              type='number'
              value={state.value}
              onChange={(event) => {
                handleChange(Number(event.target.value));
              }}
            />
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='cookTime'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='cookTime'>Cook Time</FieldLabel>
            <Input
              id='cookTime'
              placeholder='Enter cook time (minutes)'
              type='number'
              value={state.value}
              onChange={(event) => {
                handleChange(Number(event.target.value));
              }}
            />
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='difficulty'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='difficulty'>Difficulty</FieldLabel>
            <Combobox
              id='difficulty'
              items={DIFFICULTIES}
              value={state.value}
              onValueChange={(value) => {
                handleChange(value as RecipeFormSchema['difficulty']);
              }}
            >
              <ComboboxInput placeholder='Select difficulty' />
              <ComboboxContent>
                <ComboboxList>
                  {(difficulty) => (
                    <ComboboxItem
                      key={difficulty}
                      value={difficulty}
                    >
                      {difficulty}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='servings'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='servings'>Servings</FieldLabel>
            <Input
              id='servings'
              placeholder='Enter servings'
              type='number'
              value={state.value}
              onChange={(event) => {
                handleChange(Number(event.target.value));
              }}
            />
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='calories'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='calories'>Calories</FieldLabel>
            <Input
              id='calories'
              placeholder='Enter calories'
              type='number'
              value={state.value}
              onChange={(event) => {
                handleChange(Number(event.target.value));
              }}
            />
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='cuisine'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='cuisine'>Cuisine</FieldLabel>
            <Input
              id='cuisine'
              placeholder='Enter cuisine'
              type='text'
              value={state.value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
            />
            <FieldError>
              {state.meta.errors.map((error) => error?.message).join(', ')}
            </FieldError>
          </Field>
        )}
      </FormField>

      <FormField name='tag'>
        {({ state, handleChange }) => (
          <Field>
            <FieldLabel htmlFor='tag'>Tags</FieldLabel>
            <Input
              id='tag'
              placeholder='Enter tags'
              type='text'
              value={state.value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              onKeyDown={handleKeyDown('tag', 'tags')}
            />
            <FormField name='tags'>
              {({ state }) => (
                <>
                  {state.value.length > 0 && (
                    <ul className='flex flex-wrap gap-2'>
                      {state.value.map((tag, index) => (
                        <Badge className='px-4 py-4'>
                          {tag}
                          <span onClick={handleRemoveClick('tags', index)}>
                            X
                          </span>
                        </Badge>
                      ))}
                    </ul>
                  )}
                  <FieldError>
                    {state.meta.errors
                      .map((error) => error?.message)
                      .join(', ')}
                  </FieldError>
                </>
              )}
            </FormField>
          </Field>
        )}
      </FormField>

      <FormField name='mealType'>
        {({ state }) => (
          <Field>
            <FieldLabel htmlFor='mealType'>Meal Types</FieldLabel>
            <Combobox
              id='mealType'
              items={MEAL_TYPES}
              value={state.value}
              onValueChange={(value) => {
                if (value === null) return;

                if (formState.values.mealTypes.includes(value)) return;

                setFieldValue('mealTypes', (prevValues) => [
                  ...prevValues,
                  value,
                ]);

                setFieldValue('mealType', '');
              }}
            >
              <ComboboxInput placeholder='Select meal types' />
              <ComboboxContent>
                <ComboboxList>
                  {(mealType) => (
                    <ComboboxItem
                      key={mealType}
                      value={mealType}
                    >
                      {mealType}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FormField name='mealTypes'>
              {({ state }) => (
                <>
                  {state.value.length > 0 && (
                    <ul className='flex flex-wrap gap-2'>
                      {state.value.map((mealType, index) => (
                        <Badge className='px-4 py-4'>
                          {mealType}
                          <span onClick={handleRemoveClick('mealTypes', index)}>
                            X
                          </span>
                        </Badge>
                      ))}
                    </ul>
                  )}
                  <FieldError>
                    {state.meta.errors
                      .map((error) => error?.message)
                      .join(', ')}
                  </FieldError>
                </>
              )}
            </FormField>
          </Field>
        )}
      </FormField>

      <Button
        type='submit'
        className='mbs-8'
      >
        Create Recipe
      </Button>
    </form>
  );
};
