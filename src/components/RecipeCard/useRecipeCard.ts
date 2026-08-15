import { useContext } from 'react';

import type { Recipe } from '#/lib/types';

import { RecipeCardContext } from './RecipeCardContext';

export const useRecipeCard = (): {
  recipe: Recipe;
} => {
  const context = useContext(RecipeCardContext);

  if (context === null) {
    throw new Error(
      'RecipeCard.* component must be rendered as a child of RecipeCard component',
    );
  }

  return context;
};
