import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { peerDependencies } from './package.json';

const common = defineConfig({
  input: './src/index.ts',
  external: Object.keys(peerDependencies),
  platform: 'node',
});

const config = defineConfig([
  {
    ...common,
    plugins: [dts()],
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
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
    },
  },
  {
    ...common,
    plugins: [dts({ emitDtsOnly: true })],
    output: {
      dir: 'dist/cjs',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
    },
  },
]);

export default config;
