import { useForm } from '@tanstack/react-form';
// import { useState } from 'react';

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

type Props = {
  values?: RecipeFormSchema;
  onSubmit?: (payload: RecipeFormSchema) => void | Promise<void>;
  label?: string;
};

const defaultValues: RecipeFormSchema = {
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
  mealTypes: [],

  userId: 0,
  reviewCount: 0,
  rating: 0,
};

export const RecipeForm = ({
  values = defaultValues,
  onSubmit = () => {},
  label = 'Submit',
}: Props): React.JSX.Element => {
  // const [image, setImage] = useState('');

  const {
    state: formState,
    setFieldValue,
    handleSubmit,
    Field: FormField,
  } = useForm({
    defaultValues: values,
    validators: {
      onBlur: recipeFormSchema,
      onSubmit: recipeFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
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
      // className='flex flex-col gap-4'
      className='grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4'
    >
      {/* <FormField name='image'>
        {({ state, handleChange }) => (
          <>
            <FieldLabel
              htmlFor='image'
              className='justify-self-end self-start leading-9'
            >
              Image
            </FieldLabel>
            <Field className='hidden'>
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
              htmlFor='name'
              className='justify-self-end self-start leading-9'
            >
              Name
            </FieldLabel>
            <Field>
              <Input
                id='name'
                placeholder='Enter name'
                type='text'
                aria-invalid={!state.meta.isValid}
                value={state.value}
                onChange={(event) => {
                  handleChange(event.target.value);
                }}
                onBlur={handleBlur}
              />
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='ingredient'>
        {({ state: ingredientState, handleChange, handleBlur }) => (
          <FormField name='ingredients'>
            {({ state: ingredientsState }) => (
              <>
                <FieldLabel
                  htmlFor='ingredient'
                  className='justify-self-end self-start leading-9'
                >
                  Ingredients
                </FieldLabel>
                <Field>
                  <Input
                    id='ingredient'
                    placeholder='Enter ingredients'
                    type='text'
                    aria-invalid={!ingredientsState.meta.isValid}
                    value={ingredientState.value}
                    onChange={(event) => {
                      handleChange(event.target.value);
                    }}
                    onKeyDown={handleKeyDown('ingredient', 'ingredients')}
                    onBlur={handleBlur}
                  />
                  {ingredientsState.value.length > 0 && (
                    <ul className='flex flex-col gap-2'>
                      {ingredientsState.value.map((ingredient, index) => (
                        <Card className='py-0' key={`${index}-${ingredient}`}>
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
                                className='cursor-pointer'
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
                    {ingredientsState.meta.errors[0]?.message}
                  </FieldError>
                </Field>
              </>
            )}
          </FormField>
        )}
      </FormField>

      <FormField name='instruction'>
        {({ state: instructionState, handleChange, handleBlur }) => (
          <FormField name='instructions'>
            {({ state: instructionsState }) => (
              <>
                <FieldLabel
                  htmlFor='instruction'
                  className='justify-self-end self-start leading-9'
                >
                  Instructions
                </FieldLabel>
                <Field>
                  <Input
                    id='instruction'
                    placeholder='Enter instructions'
                    type='text'
                    aria-invalid={!instructionsState.meta.isValid}
                    value={instructionState.value}
                    onChange={(event) => {
                      handleChange(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter') return;

                      event.preventDefault();

                      const instruction = instructionState.value.trim();

                      if (instruction === '') return;

                      setFieldValue('instructions', (prevValues) => [
                        ...prevValues,
                        instruction,
                      ]);

                      setFieldValue('instruction', '');
                    }}
                    onBlur={handleBlur}
                  />
                  {instructionsState.value.length > 0 && (
                    <ul className='flex flex-col gap-2'>
                      {instructionsState.value.map((instruction, index) => (
                        <Card className='py-0' key={`${index}-${instruction}`}>
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
                                className='cursor-pointer'
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
                    {instructionsState.meta.errors[0]?.message}
                  </FieldError>
                </Field>
              </>
            )}
          </FormField>
        )}
      </FormField>

      <FieldSeparator className='py-8 col-span-2' />

      <FormField name='prepTime'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              htmlFor='prepTime'
              className='justify-self-end self-start leading-9'
            >
              Prep Time<i> (mins)</i>
            </FieldLabel>
            <Field>
              <Input
                id='prepTime'
                placeholder='Enter preparation time (minutes)'
                type='number'
                aria-invalid={!state.meta.isValid}
                value={state.value}
                onChange={(event) => {
                  handleChange(Number(event.target.value));
                }}
                onBlur={handleBlur}
              />
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='cookTime'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              htmlFor='cookTime'
              className='justify-self-end self-start leading-9'
            >
              Cook Time<i> (mins)</i>
            </FieldLabel>
            <Field>
              <Input
                id='cookTime'
                placeholder='Enter cook time (minutes)'
                type='number'
                aria-invalid={!state.meta.isValid}
                value={state.value}
                onChange={(event) => {
                  handleChange(Number(event.target.value));
                }}
                onBlur={handleBlur}
              />
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='difficulty'>
        {({ state, handleChange }) => (
          <>
            <FieldLabel
              htmlFor='difficulty'
              className='justify-self-end self-start leading-9'
            >
              Difficulty
            </FieldLabel>
            <Field>
              <Combobox
                id='difficulty'
                items={DIFFICULTIES}
                value={state.value}
                onValueChange={(value) => {
                  handleChange(value as RecipeFormSchema['difficulty']);
                }}
              >
                <ComboboxInput
                  placeholder='Select difficulty'
                  aria-invalid={!state.meta.isValid}
                />
                <ComboboxContent>
                  <ComboboxList>
                    {(difficulty) => (
                      <ComboboxItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='servings'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              htmlFor='servings'
              className='justify-self-end self-start leading-9'
            >
              Servings
            </FieldLabel>
            <Field>
              <Input
                id='servings'
                placeholder='Enter servings'
                type='number'
                aria-invalid={!state.meta.isValid}
                value={state.value}
                onChange={(event) => {
                  handleChange(Number(event.target.value));
                }}
                onBlur={handleBlur}
              />
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='calories'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              htmlFor='calories'
              className='justify-self-end self-start leading-9'
            >
              Calories<i> (/serving)</i>
            </FieldLabel>
            <Field>
              <Input
                id='calories'
                placeholder='Enter calories'
                type='number'
                aria-invalid={!state.meta.isValid}
                value={state.value}
                onChange={(event) => {
                  handleChange(Number(event.target.value));
                }}
                onBlur={handleBlur}
              />
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='cuisine'>
        {({ state, handleChange, handleBlur }) => (
          <>
            <FieldLabel
              htmlFor='cuisine'
              className='justify-self-end self-start leading-9'
            >
              Cuisine
            </FieldLabel>
            <Field>
              <Input
                id='cuisine'
                placeholder='Enter cuisine'
                type='text'
                aria-invalid={!state.meta.isValid}
                value={state.value}
                onChange={(event) => {
                  handleChange(event.target.value);
                }}
                onBlur={handleBlur}
              />
              <FieldError>{state.meta.errors[0]?.message}</FieldError>
            </Field>
          </>
        )}
      </FormField>

      <FormField name='tag'>
        {({ state: tagState, handleChange }) => (
          <FormField name='tags'>
            {({ state: tagsState }) => (
              <>
                <FieldLabel
                  htmlFor='tag'
                  className='justify-self-end self-start leading-9'
                >
                  Tags
                </FieldLabel>
                <Field>
                  <Input
                    id='tag'
                    placeholder='Enter tags'
                    type='text'
                    aria-invalid={!tagsState.meta.isValid}
                    value={tagState.value}
                    onChange={(event) => {
                      handleChange(event.target.value);
                    }}
                    onKeyDown={handleKeyDown('tag', 'tags')}
                  />
                  {tagsState.value.length > 0 && (
                    <ul className='flex flex-wrap gap-2'>
                      {tagsState.value.map((tag, index) => (
                        <Badge className='px-4 py-4'>
                          {tag}
                          <span
                            onClick={handleRemoveClick('tags', index)}
                            className='cursor-pointer'
                          >
                            X
                          </span>
                        </Badge>
                      ))}
                    </ul>
                  )}
                  <FieldError>{tagsState.meta.errors[0]?.message}</FieldError>
                </Field>
              </>
            )}
          </FormField>
        )}
      </FormField>

      <FormField name='mealType'>
        {({ state: mealTypeState }) => (
          <FormField name='mealTypes'>
            {({ state: mealTypesState }) => (
              <>
                <FieldLabel
                  htmlFor='mealType'
                  className='justify-self-end self-start leading-9'
                >
                  Meal Types
                </FieldLabel>
                <Field>
                  <Combobox
                    id='mealType'
                    items={MEAL_TYPES}
                    value={mealTypeState.value}
                    onValueChange={(value) => {
                      if (value === null) return;

                      const mealType =
                        value as RecipeFormSchema['mealTypes'][number];

                      if (formState.values.mealTypes.includes(mealType)) return;

                      setFieldValue('mealTypes', (prevValues) => [
                        ...prevValues,
                        mealType,
                      ]);

                      setFieldValue('mealType', '');
                    }}
                  >
                    <ComboboxInput
                      placeholder='Select meal types'
                      aria-invalid={!mealTypesState.meta.isValid}
                    />
                    <ComboboxContent>
                      <ComboboxList>
                        {(mealType) => (
                          <ComboboxItem key={mealType} value={mealType}>
                            {mealType}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {mealTypesState.value.length > 0 && (
                    <ul className='flex flex-wrap gap-2'>
                      {mealTypesState.value.map((mealType, index) => (
                        <Badge className='px-4 py-4'>
                          {mealType}
                          <span
                            onClick={handleRemoveClick('mealTypes', index)}
                            className='cursor-pointer'
                          >
                            X
                          </span>
                        </Badge>
                      ))}
                    </ul>
                  )}
                  <FieldError>
                    {mealTypesState.meta.errors[0]?.message}
                  </FieldError>
                </Field>
              </>
            )}
          </FormField>
        )}
      </FormField>

      <Button type='submit' className='mbs-8 col-start-2 cursor-pointer'>
        {label}
      </Button>
    </form>
  );
};
