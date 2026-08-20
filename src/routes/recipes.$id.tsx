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
    ingredients: data?.ingredients ?? [],
    instructions: data?.instructions ?? [],

    prepTime: Number(data?.prepTime),
    cookTime: Number(data?.cookTime),
    difficulty: (data?.difficulty ?? '') as RecipeFormSchema['difficulty'],
    servings: Number(data?.servings),
    calories: Number(data?.calories),
    cuisine: data?.cuisine ?? '',
    tags: data?.tags ?? [],
    mealTypes: (data?.mealType ?? []) as RecipeFormSchema['mealTypes'],

    userId: Number(data?.userId),
    reviewCount: Number(data?.reviewCount),
    rating: Number(data?.rating),
  };

  const { mutate } = useMutation({
    mutationFn: async (payload: RecipeFormSchema) => {
      const { mealTypes, ...filteredPayload } = payload;

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

  const handleClick = () => {
    setMode((mode) => (mode === 'VIEW' ? 'EDIT' : 'VIEW'));
  };

  if (isLoading) {
    return (
      <main className='justify-center items-center'>
        <h1 className='text-2xl font-bold text-yellow-400'>Loading...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='flex-col gap-2 justify-center items-center'>
        <h1 className='text-2xl font-bold text-red-400'>Error</h1>
        <p>Error: {error?.message}</p>
      </main>
    );
  }

  return (
    <main className='justify-center'>
      <div
        className='flex flex-col gap-8'
        style={{ width: 'clamp(500px, 50%, 1000px)' }}
      >
        <Button onClick={handleClick}>
          {mode === 'VIEW' ? 'Edit Recipe' : 'Cancel'}
        </Button>

        {mode === 'VIEW' ? (
          <RecipeCard recipe={data}>
            <div className='grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4'>
              <p className='justify-self-end leading-10 text-sm font-medium'>
                Image
              </p>
              <RecipeCard.Image />

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Name
              </p>
              <RecipeCard.Name />

              <p className='justify-self-end leading-10 text-sm font-medium'>
                Ingredients
              </p>
              <RecipeCard.Ingredients />

              <p className='justify-self-end leading-10 text-sm font-medium'>
                Instructions
              </p>
              <RecipeCard.Instructions />

              <FieldSeparator className='py-8 col-span-2' />

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Prep Time
              </p>
              <div className='flex items-center gap-4'>
                <RecipeCard.PrepTime className='flex-1' />
                <p>mins</p>
              </div>

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Cook Time
              </p>
              <div className='flex items-center gap-4'>
                <RecipeCard.CookTime className='flex-1' />
                <p>mins</p>
              </div>

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Difficulty
              </p>
              <RecipeCard.Difficulty />

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Servings
              </p>
              <RecipeCard.Servings />

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Calories
              </p>
              <div className='flex items-center gap-4'>
                <RecipeCard.Calories className='flex-1' />
                <p>/serving</p>
              </div>

              <p className='justify-self-end leading-6 text-sm font-medium'>
                Cuisine
              </p>
              <RecipeCard.Cuisine />

              <p className='justify-self-end leading-8 text-sm font-medium'>
                Tags
              </p>
              <RecipeCard.Tags />

              <p className='justify-self-end leading-8 text-sm font-medium'>
                Meal Types
              </p>
              <RecipeCard.MealTypes />
            </div>
          </RecipeCard>
        ) : (
          <RecipeForm
            label='Update Recipe'
            values={{
              ...defaultValues,
              difficulty: defaultValues.difficulty as
                | ''
                | 'Easy'
                | 'Medium'
                | 'Hard',
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export const Route = createFileRoute('/recipes/$id')({
  component: RecipeDetails,
});
