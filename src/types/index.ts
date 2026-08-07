import type { InferOutput } from 'valibot';

import { recipeFormSchema } from '#/schemas';

export type RecipeFormSchema = InferOutput<typeof recipeFormSchema>;
