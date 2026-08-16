import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import type { Recipe, RecipeFormSchema } from '#/lib/types';

import { Button, FieldSeparator } from '#/components/ui';
import { RecipeCard, RecipeForm } from '#/components';

const RecipeDetails = (): React.JSX.Element => {
  const { id } = Route.useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['recipes', id],
    queryFn: async () => {
      const response = await fetch(
        `https://node-ts-fastify-production.up.railway.app/recipes/${id}`,
      );

      const { data }: { data: Recipe } = await response.json();

      return data;
    },
  });

  const defaultValues: RecipeFormSchema = {
    image: data?.image ?? '',
    name: data?.name ?? '',
    ingredient: '',
    ingredients: data?.ingredients ?? [],
    instruction: '',
    instructions: data?.instructions ?? [],

    prepTime: Number(data?.prepTime),
    cookTime: Number(data?.cookTime),
    difficulty: (data?.difficulty ?? '') as RecipeFormSchema['difficulty'],
    servings: Number(data?.servings),
    calories: Number(data?.calories),
    cuisine: data?.cuisine ?? '',
    tag: '',
    tags: data?.tags ?? [],
    mealType: '',
    mealTypes: (data?.mealType ?? []) as RecipeFormSchema['mealTypes'],

    userId: Number(data?.userId),
    reviewCount: Number(data?.reviewCount),
    rating: Number(data?.rating),
  };

  const { mutate } = useMutation({
    mutationFn: async (payload: RecipeFormSchema) => {
      const { ingredient, instruction, tag, mealTypes, ...filteredPayload } =
        payload;

      const response = await fetch(
        `https://node-ts-fastify-production.up.railway.app/recipes/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...filteredPayload, mealType: mealTypes }),
        },
      );

      const result = await response.json();

      if (!response.ok && result.errors !== null) {
        throw new Error(Object.values(result.errors).flat().join('. ').trim());
      }

      return result;
    },
  });

  const [mode, setMode] = useState('VIEW');

  const handleSubmit = (payload: RecipeFormSchema) => {
    mutate(payload, {
      onSuccess: (): void => {
        alert('Recipe updated successfully!');
      },
      onError: (error: Error): void => {
        alert(Object.values(error).flat().join('. ').trim());
      },
    });
  };

  if (isLoading) {
    return (
      <main className='px-16 py-8 min-h-dvh flex justify-center items-center'>
        <h1 className='text-2xl font-bold text-yellow-400'>Loading...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='px-16 py-8 min-h-dvh flex flex-col gap-2 justify-center items-center'>
        <h1 className='text-2xl font-bold text-red-400'>Error</h1>
        <p>Error: {error?.message}</p>
      </main>
    );
  }

  return (
    <main className='px-16 py-8 flex flex-col gap-8 justify-center'>
      <Button
        onClick={() => {
          setMode((prevMode) => (prevMode === 'VIEW' ? 'EDIT' : 'VIEW'));
        }}
      >
        Edit Recipe
      </Button>

      {mode === 'VIEW' ? (
        <RecipeCard recipe={data}>
          {/* <div className='grid gap-4'> */}
          <div className='grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4'>
            <p className='justify-self-end'>Image</p>
            <RecipeCard.Image />
            <p className='justify-self-end'>Name</p>
            <RecipeCard.Name />
            <p className='justify-self-end'>Ingredients</p>
            <RecipeCard.Ingredients />
            <p className='justify-self-end'>Instructions</p>
            <RecipeCard.Instructions />

            <FieldSeparator className='py-8 col-span-2' />

            <p className='justify-self-end'>
              Preparation Time
              <i> (mins)</i>
            </p>
            <RecipeCard.PrepTime />
            <p className='justify-self-end'>
              Cook Time
              <i> (mins)</i>
            </p>
            <RecipeCard.CookTime />
            <p className='justify-self-end'>Difficulty</p>
            <RecipeCard.Difficulty />
            <p className='justify-self-end'>Servings</p>
            <RecipeCard.Servings />
            <p className='justify-self-end'>
              Calories
              <i> (/serving)</i>
            </p>
            <RecipeCard.Calories />
            <p className='justify-self-end'>Cuisine</p>
            <RecipeCard.Cuisine />
            <p className='justify-self-end'>Tags</p>
            <RecipeCard.Tags />
            <p className='justify-self-end'>Meal Types</p>
            <RecipeCard.MealTypes />
          </div>
        </RecipeCard>
      ) : (
        <RecipeForm
          values={{
            ...defaultValues,
            difficulty: defaultValues.difficulty as
              | ''
              | 'Easy'
              | 'Medium'
              | 'Hard',
          }}
          onSubmit={handleSubmit}
          label='Update Recipe'
        />
      )}
    </main>
  );
};

export const Route = createFileRoute('/recipes/$id')({
  component: RecipeDetails,
});
