import { sdk } from '@zxiaosi/sdk';
import { createRoot, type Root } from 'react-dom/client';
import { name } from '../package.json';
import App from './App.tsx';

let root: Root;
const render = (props: any = {}) => {
  const container = props?.container
    ? props.container.querySelector('#root')
    : document.getElementById('root');

  /**
   * 添加属性，用于样式隔离
   * 注意：这里的属性名要和 postcss-prefix-selector 插件中的 prefix 保持一致
   */
  container.setAttribute(`data-qiankun-${name}`, 'true');

  root = createRoot(container);

  root.render(<App basename={props?.name} container={container}/>);
};

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log(`${name} bootstrap`);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function mount(props: any) {
  console.log(`${name} mount`, props);
  sdk.mount(props?.sdk?.name);
  render(props);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function unmount(props: any) {
  console.log(`${name} unmount`, props);
  root.unmount();
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function update(props: any) {
  console.log(`${name} update`, props);
}
