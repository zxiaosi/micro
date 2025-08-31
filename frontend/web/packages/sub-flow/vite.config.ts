import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import prefixer from 'postcss-prefix-selector';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import qiankun from 'vite-plugin-qiankun-lite';
import { name } from './package.json';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  /** 静态资源路径 */
  const prodBase = `/subapp/${name}`;

  // 环境变量文件夹
  const envDir = resolve(__dirname, 'env');
  // 加载环境变量
  const env = loadEnv(mode, envDir);

  return defineConfig({
    base: mode === 'production' ? prodBase : '/',
    envDir: envDir,
    server: {
      port: Number(env.VITE_PORT),
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', { target: '19' }]],
        },
      }),
      qiankun({ name: name, sandbox: !!process.env.VITE_SANDBOX }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins: [
          prefixer({
            prefix: `[data-qiankun-${name}]`, // 添加作用域
          }),
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      emptyOutDir: true,
      outDir: resolve(__dirname, `../../deploy${prodBase}`),
    },
  });
};
