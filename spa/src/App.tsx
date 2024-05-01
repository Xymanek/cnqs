import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router } from './Router';
import { theme } from './theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}
