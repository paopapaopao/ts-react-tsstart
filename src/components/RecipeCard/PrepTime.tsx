import { useRecipeCard } from './useRecipeCard';

export const PrepTime = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.prepTime}</p>;
};
