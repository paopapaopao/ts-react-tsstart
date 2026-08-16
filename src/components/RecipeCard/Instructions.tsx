import { Card, CardHeader, CardTitle } from '../ui';

import { useRecipeCard } from './useRecipeCard';

export const Instructions = (): React.JSX.Element => {
  const { recipe } = useRecipeCard();

  return (
    <ul className='flex flex-col gap-2'>
      {recipe.instructions.map((instruction, index) => (
        <li key={`${index}-${instruction}`}>
          <Card className='py-2'>
            <CardHeader className='px-4'>
              <CardTitle>{instruction}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};
