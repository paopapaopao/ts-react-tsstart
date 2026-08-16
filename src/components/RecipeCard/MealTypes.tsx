import { Badge } from '../ui';

import { useRecipeCard } from './useRecipeCard';

export const MealTypes = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <ul className='flex flex-wrap gap-2'>
      {(recipe.mealType ?? []).map((mealType, index) => (
        <li key={`${index}-${mealType}`}>
          <Badge className='px-4 py-4'>{mealType}</Badge>
        </li>
      ))}
    </ul>
  );
};
