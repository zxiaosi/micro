import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import qiankun from 'vite-plugin-qiankun-lite';

// babel.config.js
const ReactCompilerConfig = {
  target: '18', // '17' | '18' | '19'
};

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
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }),
      qiankun({ name: 'user', sandbox: true }),
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
      rollupOptions: {
        // 排除 react react-dom, 使用 cdn 加载
        // https://github.com/umijs/qiankun/issues/627
        external: ['react', 'react-dom'],
      },
    },
  });
};
