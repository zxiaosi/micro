import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { name } from './package.json';

// https://vite.dev/config/
export default ({ mode }) => {
  // 环境变量文件夹
  const envDir = resolve(__dirname, 'env');
  // 加载环境变量
  const env = loadEnv(mode, envDir);

  return defineConfig({
    envDir: envDir,
    server: {
      port: Number(env.VITE_PORT),
    },
    plugins: [
      react({
        // babel: {
        //   plugins: [['babel-plugin-react-compiler', { target: '19' }]],
        // },
      }),
      viteMockServe({
        enable: true,
        mockPath: resolve(__dirname, `mock/${mode}`),
        watchFiles: true,
        logger: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      emptyOutDir: true,
      outDir: resolve(__dirname, `../../deploy/${name}`),
    },
  });
};
