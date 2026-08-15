import { Card, CardHeader, CardTitle } from '../ui';

import { useRecipeCard } from './useRecipeCard';

export const Ingredients = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <ul>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={`${index}-${ingredient}`}>
          <Card className='py-0'>
            <CardHeader className='flex items-center'>
              <CardTitle className='flex-1'>{ingredient}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
