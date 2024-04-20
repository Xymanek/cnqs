import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { StrictMode } from 'react';

export default function App() {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </StrictMode>
  );
}
