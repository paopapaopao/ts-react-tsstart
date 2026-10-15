import { useForm } from '@tanstack/react-form';

import { recipeFormSchema } from '#/lib/schemas';
import type { RecipeFormSchema } from '#/lib/types';
import { cn } from '#/lib/utils';

import { RecipeFormContext } from './RecipeFormContext';
import { Calories } from './Calories';
import { CookTime } from './CookTime';
import { Cuisine } from './Cuisine';
import { Difficulty } from './Difficulty';
import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';
import { MealTypes } from './MealTypes';
import { Name } from './Name';
import { PrepTime } from './PrepTime';
import { Servings } from './Servings';
import { Submit } from './Submit';
import { Tags } from './Tags';

type Props = {
  children: React.ReactNode;
  className?: string;
  values?: RecipeFormSchema;
  onSubmit?: (payload: RecipeFormSchema) => void | Promise<void>;
};

const defaultValues: RecipeFormSchema = {
  image: '',
  name: '',
  ingredients: [],
  instructions: [],

  prepTime: 0,
  cookTime: 0,
  difficulty: '',
  servings: 0,
  calories: 0,
  cuisine: '',
  tags: [],
  mealTypes: [],

  userId: 0,
  reviewCount: 0,
  rating: 0,
};

/**
 * TODO
 *  - Add on focus styles (yellow)
 *  - Set combobox and input:number icons to cursor pointer
 */

export const RecipeForm = ({
  children,
  className = '',
  values = defaultValues,
  onSubmit = () => {},
}: Props): React.JSX.Element => {
  const form = useForm({
    defaultValues: values,
    validators: {
      onBlur: recipeFormSchema,
      onSubmit: recipeFormSchema,
    },
    onSubmit: ({ value }: { value: RecipeFormSchema }) => {
      onSubmit(value);
    },
  });

  const formClassName = cn(
    'grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4',
    className,
  );

  return (
    <RecipeFormContext.Provider value={{ form }}>
      <form
        className={formClassName}
        action=''
        onKeyDown={(event: React.KeyboardEvent<HTMLFormElement>) => {
          if (event.key !== 'Enter') return;

          event.preventDefault();
        }}
        onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
          event.preventDefault();

          form.handleSubmit();
        }}
      >
        {children}
      </form>
    </RecipeFormContext.Provider>
  );
};

RecipeForm.Name = Name;
RecipeForm.Ingredients = Ingredients;
RecipeForm.Instructions = Instructions;

RecipeForm.PrepTime = PrepTime;
RecipeForm.CookTime = CookTime;
RecipeForm.Difficulty = Difficulty;
RecipeForm.Servings = Servings;
RecipeForm.Calories = Calories;
RecipeForm.Cuisine = Cuisine;
RecipeForm.Tags = Tags;
RecipeForm.MealTypes = MealTypes;

RecipeForm.Submit = Submit;
