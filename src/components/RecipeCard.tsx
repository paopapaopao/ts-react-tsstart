import { Link } from '@tanstack/react-router';

import type { Recipe } from '#/lib/types';

type Props = { recipe?: Recipe };

export const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className='max-w-sm rounded-lg bg-white shadow-md overflow-hidden'>
      <img
        src={recipe?.image}
        alt={recipe?.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <Link
          to={`/recipes/$id`}
          params={{ id: recipe?.id.toString()! }}
          className='text-xl font-semibold mb-2'
        >
          {recipe?.name}
        </Link>
        <dl className='grid grid-cols-1 gap-1 text-sm'>
          {recipe?.prepTime !== undefined && (
            <div className='flex justify-between'>
              <dt className='font-medium'>Prep Time</dt>
              <dd>{recipe.prepTime} min</dd>
            </div>
          )}
          {recipe?.cookTime !== undefined && (
            <div className='flex justify-between'>
              <dt className='font-medium'>Cook Time</dt>
              <dd>{recipe.cookTime} min</dd>
            </div>
          )}
          {recipe?.servings !== undefined && (
            <div className='flex justify-between'>
              <dt className='font-medium'>Servings</dt>
              <dd>{recipe.servings}</dd>
            </div>
          )}
          {recipe?.difficulty && (
            <div className='flex justify-between'>
              <dt className='font-medium'>Difficulty</dt>
              <dd>{recipe.difficulty}</dd>
            </div>
          )}
          {recipe?.calories !== undefined && (
            <div className='flex justify-between'>
              <dt className='font-medium'>Calories/Serv.</dt>
              <dd>{recipe.calories}</dd>
            </div>
          )}
        </dl>
        {recipe?.tags?.length && (
          <p className='mt-2 text-sm text-gray-600'>
            Tags: {recipe.tags.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};
