import { createContext, useContext } from 'react';
import { useForm } from '@tanstack/react-form';

import { recipeFormSchema } from '#/lib/schemas';
import type { RecipeFormSchema } from '#/lib/types';

// Type-only helper — never invoked. Its sole purpose is to give
// TypeScript a concrete, non-generic function to read a return type from.
function useRecipeFormShape() {
  return useForm({
    defaultValues: {} as RecipeFormSchema,
    validators: {
      onBlur: recipeFormSchema,
      onSubmit: recipeFormSchema,
    },
  });
}

export type RecipeFormApi = ReturnType<typeof useRecipeFormShape>;

type RecipeFormContextValue = { form: RecipeFormApi };

export const RecipeFormContext = createContext<RecipeFormContextValue | null>(
  null,
);

export const useRecipeFormContext = (): RecipeFormContextValue => {
  const context = useContext(RecipeFormContext);

  if (context === null) {
    throw new Error(
      'RecipeForm.* components must be rendered as a child of RecipeForm component',
    );
  }

  return context;
};
