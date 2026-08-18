import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = { children: React.JSX.Element };

const queryClient = new QueryClient();

export const Provider = ({ children }: Props): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
