import { Card, CardHeader, CardTitle } from '../ui';

import { useRecipeCard } from './useRecipeCard';

export const Instructions = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <ul>
      {recipe.instructions.map((instruction, index) => (
        <li key={`${index}-${instruction}`}>
          <Card className='py-0'>
            <CardHeader className='flex items-center'>
              <CardTitle className='flex-1'>{instruction}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
