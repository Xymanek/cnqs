import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const devBackendOrigin = 'http://localhost:5041';
const devBackendProxyOptions = {
  target: devBackendOrigin,
  xfwd: true,
};


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': devBackendProxyOptions,
      '/l': devBackendProxyOptions,
      '/swagger': devBackendProxyOptions,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
