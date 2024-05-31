import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { theme } from './theme';
import { store } from '@/data/store';

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Router />
        </MantineProvider>
      </Provider>
    </StrictMode>
  );
}
