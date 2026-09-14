import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { createRecipe } from '#/lib/apis';
import type { RecipeFormSchema } from '#/lib/types';

import { RecipeForm } from '#/components';

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
          <RecipeForm.NameField />
          <RecipeForm.IngredientsField />
          <RecipeForm.InstructionsField />

          <RecipeForm.Separator className='py-8 col-span-2' />

          <RecipeForm.PrepTimeField />
          <RecipeForm.CookTimeField />
          <RecipeForm.DifficultyField />
          <RecipeForm.ServingsField />
          <RecipeForm.CaloriesField />
          <RecipeForm.CuisineField />
          <RecipeForm.TagsField />
          <RecipeForm.MealTypesField />

          <RecipeForm.Submit label='Create Recipe' />
        </RecipeForm>
      </div>
    </main>
  );
};

export const Route = createFileRoute('/recipes/form')({
  component: Page,
});
