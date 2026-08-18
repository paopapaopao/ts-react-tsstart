import { useRecipeCard } from './useRecipeCard';

export const Servings = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.servings}</p>;
};
