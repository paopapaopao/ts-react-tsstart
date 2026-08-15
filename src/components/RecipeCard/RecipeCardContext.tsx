import { createContext } from 'react';

import type { Recipe } from '#/lib/types';

export const RecipeCardContext = createContext<{ recipe: Recipe } | null>(null);
