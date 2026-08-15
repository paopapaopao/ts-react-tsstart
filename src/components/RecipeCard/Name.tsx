import { useRecipeCard } from './useRecipeCard';

export const Name = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.name}</p>;
};
