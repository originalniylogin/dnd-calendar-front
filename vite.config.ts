import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  server: {
    port: 3000,
    hmr: {
      clientPort: 80,
    },
  },
  resolve: {
    alias: {
      '~app': path.resolve(__dirname, './src/app'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~shared': path.resolve(__dirname, './src/shared'),
      '~features': path.resolve(__dirname, './src/features'),
      '~widgets': path.resolve(__dirname, './src/widgets'),
      '~entities': path.resolve(__dirname, './src/entities'),
    },
  },
});
