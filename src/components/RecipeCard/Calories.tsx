import { useRecipeCard } from './useRecipeCard';

export const Calories = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.calories}</p>;
};
