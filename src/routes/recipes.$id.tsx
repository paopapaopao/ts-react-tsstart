import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

const RecipeDetails = (): React.JSX.Element => {
  const { id } = Route.useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['recipes', id],
    queryFn: async () => {
      const response = await fetch(
        `https://node-ts-fastify-production.up.railway.app/recipes/${id}`,
      );

      const data = await response.json();

      return data.data;
    },
  });

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
    <main className='px-16 py-8 flex justify-center'>
      <article className='max-w-sm rounded-lg bg-white shadow-md overflow-hidden'>
        <img
          src={data.image}
          alt={data.name}
          className='w-full h-48 object-cover'
        />
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-2'>{data.name}</h2>
          <dl className='grid grid-cols-1 gap-1 text-sm'>
            {data.prepTime !== undefined && (
              <div className='flex justify-between'>
                <dt className='font-medium'>Prep Time</dt>
                <dd>{data.prepTime} min</dd>
              </div>
            )}
            {data.cookTime !== undefined && (
              <div className='flex justify-between'>
                <dt className='font-medium'>Cook Time</dt>
                <dd>{data.cookTime} min</dd>
              </div>
            )}
            {data.servings !== undefined && (
              <div className='flex justify-between'>
                <dt className='font-medium'>Servings</dt>
                <dd>{data.servings}</dd>
              </div>
            )}
            {data.difficulty && (
              <div className='flex justify-between'>
                <dt className='font-medium'>Difficulty</dt>
                <dd>{data.difficulty}</dd>
              </div>
            )}
            {data.calories !== undefined && (
              <div className='flex justify-between'>
                <dt className='font-medium'>Calories/Serv.</dt>
                <dd>{data.calories}</dd>
              </div>
            )}
          </dl>
          {data.tags?.length && (
            <p className='mt-2 text-sm text-gray-600'>
              Tags: {data.tags.join(', ')}
            </p>
          )}
        </div>
      </article>
    </main>
  );
};

export const Route = createFileRoute('/recipes/$id')({
  component: RecipeDetails,
});
