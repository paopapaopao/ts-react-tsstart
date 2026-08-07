import {
  array,
  minLength,
  nonEmpty,
  number,
  object,
  picklist,
  pipe,
  string,
} from 'valibot';

export const recipeFormSchema = object({
  image: string(),
  name: pipe(string(), nonEmpty('Name is required')),
  ingredient: string(),
  ingredients: pipe(array(string()), minLength(1, 'Add at least 1 ingredient')),
  instruction: string(),
  instructions: pipe(
    array(string()),
    minLength(1, 'Add at least 1 instruction'),
  ),

  prepTime: number(),
  cookTime: number(),
  difficulty: picklist(['Easy', 'Medium', 'Hard']),
  servings: number(),
  calories: number(),
  cuisine: string(),
  tag: string(),
  tags: array(string()),
  mealType: string(),
  mealTypes: array(string()),

  userId: number(),
  reviewCount: number(),
  rating: number(),
});
