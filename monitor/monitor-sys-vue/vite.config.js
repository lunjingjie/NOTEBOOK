import { fileURLToPath, URL } from 'node:url';
import WindiCSS from 'vite-plugin-windicss';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import PurgeIcons from 'vite-plugin-purge-icons';
import sourceMapUpload from '@heimdallr-sdk/vite-plugin-sourcemap-upload';

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    PurgeIcons({}),
    sourceMapUpload({
      appname: 'playground',
      url: 'http://localhost:7001/sourcemap/upload',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5173',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
