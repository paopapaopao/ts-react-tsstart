import { Badge } from '../ui';

import { useRecipeCard } from './useRecipeCard';

export const Tags = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <ul className='flex flex-wrap gap-2'>
      {(recipe.tags ?? []).map((tag, index) => (
        <li key={`${index}-${tag}`}>
          <Badge className='px-4 py-4'>{tag}</Badge>
        </li>
      ))}
    </ul>
  );
};
