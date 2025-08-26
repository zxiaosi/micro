import babel, { RollupBabelInputPluginOptions } from '@rollup/plugin-babel';
import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import nodeExternals from 'rollup-plugin-node-externals';
import LightningCSS from 'unplugin-lightningcss/rolldown';
import { injectCssImport } from './rolldown-plugin';

/** lightningcss 配置   */
const lightningCSSOptions = {
  options: {
    minify: true,
  },
};

/** babel 配置 */
const babelOptions: RollupBabelInputPluginOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // 不转换模块语法, 让 Rollup 处理模块语法
        targets: {
          node: 'current', // 当前 Node.js 版本
        },
      },
    ],
    '@babel/preset-react',
  ], // 使用 React 和 ES6+ 预设
  exclude: 'node_modules/**', // 排除 node_modules 中的文件
  babelHelpers: 'bundled', // 使用打包的 Babel 辅助函数, 避免重复打包
};

/** 通用配置 */
const common = defineConfig({
  input: './src/index.tsx',
  platform: 'browser', // 作用于浏览器环境
  tsconfig: './tsconfig.json', // 指定 tsconfig 文件
  output: {
    // sourcemap: true, // 生成 sourcemap 文件
    minify: true, // 启用代码压缩, 调试时可以关闭
  },
});

const config = defineConfig([
  {
    ...common,
    plugins: [
      nodeExternals(), // 排除 deps、peerDeps 中的依赖
      babel(babelOptions),
      LightningCSS(lightningCSSOptions),
      injectCssImport(),
      dts(),
    ],
    output: {
      dir: 'dist/esm',
      format: 'es',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      ...common.output,
    },
  },
  {
    ...common,
    plugins: [
      nodeExternals(), // 排除 deps、peerDeps 中的依赖
      babel(babelOptions),
      LightningCSS(lightningCSSOptions),
      injectCssImport(),
    ],
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      ...common.output,
    },
  },
  {
    ...common,
    plugins: [dts({ emitDtsOnly: true })],
    output: {
      dir: 'dist/cjs',
      format: 'esm',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      ...common.output,
    },
  },
]);

export default config;
