import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

type Post = {
  id: number;
  title: string;
  body: string;
};

const Home = (): React.JSX.Element => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/posts?limit=0');

      const data: {
        posts: Post[];
        skip: number;
        limit: number;
        total: number;
      } = await response.json();

      return { data: data.posts };
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
    <main className='px-16 py-8'>
      <ul className='flex flex-col gap-4'>
        {data?.data.map((post: Post) => (
          <li key={post.id}>
            <p className='text-xl font-bold'>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const Route = createFileRoute('/')({ component: Home });
