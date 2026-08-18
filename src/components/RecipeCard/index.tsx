import { type ReactNode } from 'react';

import type { Recipe } from '#/lib/types';

import { RecipeCardContext } from './RecipeCardContext';
import { Calories } from './Calories';
import { CookTime } from './CookTime';
import { Cuisine } from './Cuisine';
import { Difficulty } from './Difficulty';
import { Image } from './Image';
import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';
import { MealTypes } from './MealTypes';
import { Name } from './Name';
import { PrepTime } from './PrepTime';
import { Servings } from './Servings';
import { Tags } from './Tags';

type Props = { recipe: Recipe; children: ReactNode };

export const RecipeCard = ({ recipe, children }: Props): React.JSX.Element => {
  return (
    <RecipeCardContext.Provider value={{ recipe }}>
      {children}
    </RecipeCardContext.Provider>
  );
};

RecipeCard.Image = Image;
RecipeCard.Name = Name;
RecipeCard.Ingredients = Ingredients;
RecipeCard.Instructions = Instructions;

RecipeCard.PrepTime = PrepTime;
RecipeCard.CookTime = CookTime;
RecipeCard.Difficulty = Difficulty;
RecipeCard.Servings = Servings;
RecipeCard.Calories = Calories;
RecipeCard.Cuisine = Cuisine;
RecipeCard.Tags = Tags;
RecipeCard.MealTypes = MealTypes;
