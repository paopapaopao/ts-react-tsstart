import { useRecipeCard } from './useRecipeCard';

export const Cuisine = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.cuisine}</p>;
};
