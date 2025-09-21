## 目录

```sh
├── src
├── src/components       # 公共组件(不可替换)
├── src/core             # sdk 实例
├── src/hooks            # hooks
├── src/plugins          # sdk 插件
    ├── api              # 请求插件
    ├── app              # 应用数据和业务逻辑
    ├── client           # 路由信息
    ├── config           # 配置
    ├── i18n             # 国际化
    ├── router           # 全局状态
    ├── ui               # 组件(可传入覆盖)
├── src/utils            # 工具类
```

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

- 主应用使用 `<MainApp />`

### `zustand` 全局状态管理

- 项目中通过 `useStore(sdk.store, (state) => state.xxx)` 订阅

### 国际化

- 主应用使用 `I18nPlugin` 插件的时候, 传入 `intlConfig`(Message) 和 `loadLocale`(antd) 配置

- 项目中通过 `sdk.i18n.intl.formatMessage` 获取转换后的语言

- 或者获取通过 `const intl = useIntl()` 的方式获取

### 图标库

- 方案一: 封装成单独的 `@zxiaosi/icons` 包
  - 优点: 方便使用
  - 缺点: 会导致包体积一直增大

- 方案二: 主应用使用 `ConfigPlugin` 插件的时候, 传入 `iconfontUrl` 地址, `SDK` 会自动加载图标库, 项目中通过从 `SDK` 中导出 `<IconFont />` 使用图标
  - 优点: 不用打包
  - 缺点：会报 `React 多实例错误`, 需要排除依赖

### 路由动态添加

- 主应用使用 `ConfigPlugin` 插件的时候, 传入 `customRoutes` 属性, `SDK` 会注册路由信息, 当前只支持最外层路由, 子路由不支持

### Echarts 图表

- 方案一: 语言包放前端
  - 优点: 切换不需要刷新页面
  - 缺点: 图表的国际化不好实现，在调用接口之前，并不知道图表的xAxis.data（x轴文案）和 series.name（tooltip对应的名称），所以需要后端返回

- 方案二: 语言包放在后端（接口返回）
  - 优点: 可以满足图表需求, 且能不发布修改
  - 缺点: 需要刷新页面或者刷新组件重新请求接口
    1. 当语言切换时, `window.location.reload()` 刷新页面重新请求接口
    2. 当语言切换时, 添加请求接口回调, 刷新根组件
    ```tsx
    const AppWrapper = () => {
      const containerKey = useMemo(
        () => new Date().getTime().toString(),
        [lang],
      );
      return (
        <div key={containerKey}>
          <App />
        </div>
      );
    };
    ```

### 待开发

- [] Cli 工具

## 如何开发一个自己的插件？

1. 在 `/src/plugins` 下新建一个文件夹,比如 `customPlugin`, 然后在 `index.ts` 中导出插件的构造函数

```ts
// 按需引入
import merge from 'lodash/merge';

interface CustomProps {}

interface CustomResult extends Required<CustomProps> {}

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
