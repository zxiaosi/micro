import { NormalizedOutputOptions, OutputBundle } from 'rolldown';

/** 注入 css 文件 */
export function injectCssImport() {
  return {
    name: 'inject-css-import',
    generateBundle(_: NormalizedOutputOptions, bundle: OutputBundle) {
      // 过滤出所有的 CSS 文件
      const cssFiles = Object.keys(bundle).filter((fileName) =>
        fileName.endsWith('.css'),
      );

      // 过滤出所有的 JS chunk 文件
      const jsFiles = Object.entries(bundle).filter(
        ([fileName, asset]) =>
          (fileName.endsWith('.mjs') || fileName.endsWith('.cjs')) &&
          asset.type === 'chunk',
      );

      if (cssFiles.length === 0) return;

      for (const [fileName, chunk] of jsFiles) {
        const cssImportPath = cssFiles.find((cssFile) =>
          cssFile.includes(chunk.name),
        );

        if (!cssImportPath) continue;

        if (fileName.endsWith('.mjs')) {
          // 在 js chunk 开头插入 import css
          chunk.code = `import './${cssImportPath}';${chunk.code}`;
        }

        if (fileName.endsWith('.cjs')) {
          // CommonJS 模块需要使用 require
          chunk.code = `require('./${cssImportPath}');${chunk.code}`;
        }
      }
    },
  };
}
