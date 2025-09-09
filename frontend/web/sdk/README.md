## SDK 实现功能

### 挂载 `SDK`

- 主应用, `use(Plugin, options)`, `mount('sdk')` 使用插件, 挂载到 window 上

```js
// main.ts

import { ApiPlugin, sdk } from '@es/sdk';

sdk
  .use(ApiPlugin, {
    config: {
      baseURL: '/api',
    },
  })
  .mount('sdk');
```

- 子应用 `mount('sdk')`, 从 window 上找实例

```js
// main.ts

import { sdk } from '@es/sdk';

// qiankun 生命周期
export async function mount(props: any) {
  sdk.mount('sdk');
  render(props);
}
```

### `Axios` 网络请求

- 项目中调用 `sdk.api.request`

### `qiankun` 微前端

- 主应用使用 `ApiPlugin` 插件的时候, 传入 `getRoutesApi` 接口, SDK 会自动调用并注册路由信息

- 主应用调用 `sdk.app.getRootComponent()` 获取根组件

### `zustand` 全局状态管理

- 项目中通过 `useStore(sdk.store, (state) => state.xxx)` 订阅

### 国际化

- 主应用使用 `I18nPlugin` 插件的时候, 传入 `intlConfig`(ReactIntl-Message) 和 `loadLocale`(antd) 配置

- 项目中通过 `sdk.i18n.intl.formatMessage` 获取转换后的语言

- 或者获取通过 `const intl = useIntl()` 的方式获取

### 图标库

- 目前两种方案

- 方案一: 封装成单独的 `@es/icons` 包, 优点方便使用, 缺点会导致包体积一直增大

- 方案二: 主应用使用 `AppPlugin` 插件的时候, 传入 `iconfontUrl` 地址, `SDK` 会自动加载图标库, 项目中通过从 `SDK` 中导出 `<IconFont />` 使用图标, 优点是不用打包, 确定是会报 `React 多实例错误`, 需要排除依赖

### 路由动态添加

- 主应用使用 `AppPlugin` 插件的时候, 传入 `customRoutes` 属性, `SDK` 会注册路由信息, 当前只支持最外层路由, 子路由不支持

### 待开发

- [] echart 样式
- [] 面包屑
- [] ClI 工具

## 如何开发一个自己的插件？

1. 在 `/src/plugins` 下新建一个文件夹,比如 `customPlugin`, 然后在 `index.ts` 中导出插件的构造函数

```ts
// 按需引入
import merge from 'lodash/merge';

interface CustomProps {}

interface CustomResult extends Required<Readonly<CustomProps>> {}

/** 插件名称 */
const pluginName = 'customPlugin';

/**
 * MyPlugin 插件
 * - 详见配置 {@link CustomProps} {@link CustomResult}
 */
const CustomPlugin: Plugin<'customPlugin'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {} satisfies CustomResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { CustomPlugin, CustomProps, CustomResult };
```

2. 在 `/src/types` 中的 `InstanceProps` 和 `InstanceResult` 加上自己的插件类型定义

```ts
interface InstanceProps {
  myPlugin?: CustomProps;
}

interface InstanceResult {
  myPlugin: CustomResult;
}
```

3. 在 `/src/core/index.ts` 中定义插件变量

```ts
class Sdk implements SdkResult {
  name: BaseProps['name'];
  plugins: BaseProps['plugins'];

  myPlugin: SdkResult['myPlugin'];
}
```

4. 在 `/src/index.ts` 导出插件

```ts
export { CustomPlugin, Sdk };
```
