import { Card, CardHeader, CardTitle } from '../ui';

import { useRecipeCard } from './useRecipeCard';

export const Ingredients = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <ul className='flex flex-col gap-2'>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={`${index}-${ingredient}`}>
          <Card className='py-2'>
            <CardHeader className='px-4'>
              <CardTitle>{ingredient}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
