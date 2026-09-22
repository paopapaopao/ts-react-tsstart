import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { createRecipe } from '#/lib/apis';
import type { RecipeFormSchema } from '#/lib/types';

import { RecipeForm } from '#/components';
import { FieldSeparator } from '#/components/ui';

const Page = (): React.JSX.Element => {
  const { mutate } = useMutation({
    mutationFn: createRecipe,
  });

  const handleSubmit = (payload: RecipeFormSchema) => {
    mutate(payload, {
      onSuccess: (): void => {
        alert('Recipe created successfully!');
      },
      onError: (error: Error): void => {
        alert(Object.values(error).flat().join('. ').trim());
      },
    });
  };

  return (
    <main className='justify-center'>
      <div style={{ width: 'clamp(500px, 50%, 1000px)' }}>
        <RecipeForm onSubmit={handleSubmit}>
          <RecipeForm.Name />
          <RecipeForm.Ingredients />
          <RecipeForm.Instructions />

          <FieldSeparator className='py-8 col-span-2' />

          <RecipeForm.PrepTime />
          <RecipeForm.CookTime />
          <RecipeForm.Difficulty />
          <RecipeForm.Servings />
          <RecipeForm.Calories />
          <RecipeForm.Cuisine />
          <RecipeForm.Tags />
          <RecipeForm.MealTypes />

          <RecipeForm.Submit label='Create Recipe' />
        </RecipeForm>
      </div>
    </main>
  );
};

export const Route = createFileRoute('/recipes/form')({
  component: Page,
});
