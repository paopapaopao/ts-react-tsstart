import { createFileRoute } from '@tanstack/react-router';

import { RecipeForm } from '#/components';

const RecipeFormPage = (): React.JSX.Element => {
  return (
    <main className='px-16 py-8 min-h-dvh flex flex-col gap-2 items-center'>
      <div
        style={{
          width: 'clamp(500px, 50%, 1000px)',
        }}
      >
        <RecipeForm label='Create Recipe' />
      </div>
    </main>
  );
};

export const Route = createFileRoute('/recipes/form')({
  component: RecipeFormPage,
});
