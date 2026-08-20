import { useRecipeCard } from './useRecipeCard';

type Props = { className?: string };

export const PrepTime = ({ className = '' }: Props): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return <p className={className}>{recipe.prepTime}</p>;
};
