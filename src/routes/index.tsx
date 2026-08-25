import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import type { Recipe } from '#/lib/types';

import { Button } from '#/components/ui';
import { RecipeCard } from '#/components';

const Page = (): React.JSX.Element => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await fetch(
        'https://node-ts-fastify-production.up.railway.app/recipes',
      );

      const data = await response.json();

      return data.data;
    },
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <main className='px-16 py-8 min-h-dvh flex justify-center items-center'>
        <h1 className='text-2xl font-bold text-yellow-400'>Loading...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='px-16 py-8 min-h-dvh flex flex-col gap-2 justify-center items-center'>
        <h1 className='text-2xl font-bold text-red-400'>Error</h1>
        <p>Error: {error?.message}</p>
      </main>
    );
  }

  return (
    <main className='px-16 py-8 flex flex-col items-center gap-8'>
      <Button
        onClick={() => {
          navigate({ to: '/recipes/form' });
        }}
      >
        Add Recipe
      </Button>
      <ul
        className='grid gap-x-4 gap-y-4'
        style={{
          width: 'clamp(600px, 50%, 1600px)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        {data?.recipes.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe}>
              <div className='max-w-sm rounded-lg bg-white shadow-md overflow-hidden'>
                <RecipeCard.Image />
                <div className='p-4'>
                  <Link
                    to={`/recipes/$id`}
                    params={{ id: recipe?.id.toString() }}
                    className='text-xl font-semibold mb-2'
                  >
                    <RecipeCard.Name />
                  </Link>
                  <dl className='grid grid-cols-1 gap-1 text-sm'>
                    <div className='flex justify-between'>
                      <dt className='font-medium'>Prep Time</dt>
                      <dd>{recipe.prepTime} min</dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='font-medium'>Cook Time</dt>
                      <dd>{recipe.cookTime} min</dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='font-medium'>Difficulty</dt>
                      <dd>{recipe.difficulty}</dd>
                    </div>
                  </dl>
                  {recipe?.tags?.length && (
                    <p className='mt-2 text-sm text-gray-600'>
                      Tags: {recipe.tags.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </RecipeCard>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const Route = createFileRoute('/')({ component: Page });
