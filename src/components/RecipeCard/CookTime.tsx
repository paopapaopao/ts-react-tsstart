import { useRecipeCard } from './useRecipeCard';

export const CookTime = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.cookTime}</p>;
};
