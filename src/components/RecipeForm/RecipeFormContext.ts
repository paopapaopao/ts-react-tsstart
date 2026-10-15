import { useForm } from '@tanstack/react-form';
import { createContext } from 'react';

import { recipeFormSchema } from '#/lib/schemas';
import type { RecipeFormSchema } from '#/lib/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useRecipeForm = () => {
  return useForm({
    defaultValues: {} as RecipeFormSchema,
    validators: {
      onBlur: recipeFormSchema,
      onSubmit: recipeFormSchema,
    },
  });
};

export type RecipeFormApi = ReturnType<typeof useRecipeForm>;

export const RecipeFormContext = createContext<{ form: RecipeFormApi } | null>(
  null,
);
