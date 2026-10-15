import { useContext } from 'react';

import { type RecipeFormApi, RecipeFormContext } from './RecipeFormContext';

export const useRecipeForm = (): { form: RecipeFormApi } => {
  const context = useContext(RecipeFormContext);

  if (context === null) {
    throw new Error(
      'RecipeForm.* components must be rendered as a child of RecipeForm component',
    );
  }

  return context;
};
