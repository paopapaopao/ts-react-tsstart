import {
  array,
  literal,
  minLength,
  minValue,
  nonEmpty,
  number,
  object,
  picklist,
  pipe,
  string,
  union,
} from 'valibot';

import { DIFFICULTIES } from '#/lib/constants';

export const recipeFormSchema = object({
  image: string(),
  name: pipe(string(), nonEmpty('Required')),
  ingredient: string(),
  ingredients: pipe(
    array(string()),
    minLength(1, 'Must have a minimum of 1 entry'),
  ),
  instruction: string(),
  instructions: pipe(
    array(string()),
    minLength(1, 'Must have a minimum of 1 entry'),
  ),

  prepTime: pipe(number(), minValue(0, 'Must be positive or 0')),
  cookTime: pipe(number(), minValue(0, 'Must be positive or 0')),
  difficulty: union(
    [picklist(DIFFICULTIES), literal('')],
    'Must be an option from the list or blank',
  ),
  servings: pipe(number(), minValue(0, 'Must be positive or 0')),
  calories: pipe(number(), minValue(0, 'Must be positive or 0')),
  cuisine: string(),
  tag: string(),
  tags: array(string()),
  mealType: string(),
  mealTypes: array(string()),

  userId: number(),
  reviewCount: number(),
  rating: number(),
});
