import type { RecipeFormSchema } from '../types';

export const createRecipe = async (payload: RecipeFormSchema) => {
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
};

export const updateRecipe = async ({
  id,
  payload,
}: {
  id: string;
  payload: RecipeFormSchema;
}) => {
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
};
