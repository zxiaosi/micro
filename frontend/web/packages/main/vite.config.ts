import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { name } from './package.json';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
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
          plugins: [['babel-plugin-react-compiler', { target: '19' }]],
        },
      }),
      // https://blog.csdn.net/XH_jing/article/details/150554654
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        watchFiles: true,
        logger: true,
        injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
        `,
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
