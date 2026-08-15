import { useRecipeCard } from './useRecipeCard';

export const Image = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <img
      src={recipe?.image}
      alt={recipe?.name}
      className='w-full h-48 object-cover'
    />
  );
};
