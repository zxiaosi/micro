import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun-lite';

// babel.config.js
const ReactCompilerConfig = {
  target: '19', // '17' | '18' | '19'
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    qiankun({ name: 'user', sandbox: true }),
  ],
});
