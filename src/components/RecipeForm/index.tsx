import { useForm } from '@tanstack/react-form';

import { recipeFormSchema } from '#/lib/schemas';
import type { RecipeFormSchema } from '#/lib/types';
import { cn } from '#/lib/utils';

import { FieldSeparator } from '../ui';
import { RecipeFormContext } from './RecipeFormContext';
import { DifficultyField } from './DifficultyField';
import { MealTypesField } from './MealTypesField';
import {
  IngredientsField,
  InstructionsField,
  SubmitButton,
  TagsField,
} from './fields';
import { Calories } from './Calories';
import { CookTime } from './CookTime';
import { Cuisine } from './Cuisine';
import { Name } from './Name';
import { PrepTime } from './PrepTime';
import { Servings } from './Servings';

type Props = {
  className?: string;
  values?: RecipeFormSchema;
  onSubmit?: (payload: RecipeFormSchema) => void | Promise<void>;
  children: React.ReactNode;
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

export const RecipeForm = ({
  className = '',
  values = defaultValues,
  onSubmit = () => {},
  children,
}: Props): React.JSX.Element => {
  const form = useForm({
    defaultValues: values,
    validators: {
      onBlur: recipeFormSchema,
      onSubmit: recipeFormSchema,
    },
    onSubmit: ({ value }) => {
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
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
        }}
      >
        {children}
      </form>
    </RecipeFormContext.Provider>
  );
};

RecipeForm.Name = Name;
RecipeForm.IngredientsField = IngredientsField; //
RecipeForm.InstructionsField = InstructionsField; //

RecipeForm.PrepTime = PrepTime;
RecipeForm.CookTime = CookTime;
RecipeForm.DifficultyField = DifficultyField; //
RecipeForm.Servings = Servings;
RecipeForm.Calories = Calories;
RecipeForm.Cuisine = Cuisine;
RecipeForm.TagsField = TagsField; //
RecipeForm.MealTypesField = MealTypesField; //

RecipeForm.Submit = SubmitButton; //
RecipeForm.Separator = FieldSeparator; //
