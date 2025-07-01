import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { peerDependencies, dependencies } from './package.json';

const common = defineConfig({
  input: './src/index.ts',
  external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)], // 排除 peerDependencies 中的依赖
  platform: 'browser', // 作用于浏览器环境
  resolve: {
    alias: { '@': './src' }, // 设置别名
    tsconfigFilename: './tsconfig.json', // 指定 TypeScript 配置文件
  },
});

const config = defineConfig([
  {
    ...common,
    plugins: [dts(), nodeResolve({ browser: true })],
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      // minify: true, // 启用代码压缩
    },
  },
  {
    ...common,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      // minify: true, // 启用代码压缩
    },
  },
  {
    ...common,
    plugins: [dts({ emitDtsOnly: true }), nodeResolve({ browser: true })],
    output: {
      dir: 'dist/cjs',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      // minify: true, // 启用代码压缩
    },
  },
]);

export default config;
