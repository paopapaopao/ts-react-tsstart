import { useRecipeCard } from './useRecipeCard';

export const Difficulty = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p>{recipe.difficulty}</p>;
};
