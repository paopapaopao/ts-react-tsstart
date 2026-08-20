import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import type { RecipeFormSchema } from '#/lib/types';

import { RecipeForm } from '#/components';

const RecipeFormPage = (): React.JSX.Element => {
  const { mutate } = useMutation({
    mutationFn: async (payload: RecipeFormSchema) => {
      const { mealTypes, ...filteredPayload } = payload;

      const response = await fetch(
        'https://node-ts-fastify-production.up.railway.app/recipes',
        {
          method: 'POST',
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
    <main className='px-16 py-8 min-h-dvh flex flex-col gap-2 items-center'>
      <div
        style={{
          width: 'clamp(500px, 50%, 1000px)',
        }}
      >
        <RecipeForm label='Create Recipe' onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export const Route = createFileRoute('/recipes/form')({
  component: RecipeFormPage,
});
