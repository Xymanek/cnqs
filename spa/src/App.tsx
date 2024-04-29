import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </StrictMode>
  );
}
