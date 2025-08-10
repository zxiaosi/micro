// 使用按需加载的方式引入 lodash
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

import Layout from './layout';
import Microapp from './microapp';
import Root from './root';
const Login = React.lazy(() => import('@/components/login/index'));
const NotFound = React.lazy(() => import('@/components/notFound/index'));
// const Root = React.lazy(() => import('@/components/root/index'));

import { SdkResult } from '@/global';
import { MicroStateProvider } from '@/hooks/useMicroState';
import { RootProvider } from '@/hooks/useRoot';
import React, { ComponentType } from 'react';

interface Props {
  /** 组件 */
  [key: string]: ComponentType | any;
}

interface Result extends Required<Readonly<Props>> {
  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  readonly setComponent: (component: ComponentType, name?: string) => void;
  /**
   * 获取组件
   * @param name 组件名称
   */
  readonly getComponent: (name: string) => ComponentType;
  /**
   * 获取根组件
   */
  readonly getRootComponent: () => ComponentType;
}

/** 组件配置 */
const createComponents = (sdk: SdkResult, opt: Props = {}): Result => {
  // 返回结果
  const result: Result = {
    Login,
    NotFound,
    Root,
    Layout, // 不使用懒加载 - 防止多次渲染
    Microapp, // 不使用懒加载 - 防止qiankun挂载不上

    setComponent: (component, name) => {
      if (!component) throw new Error('setComponent -- 组件不能为空');

      const componentName = name || component.displayName || component.name;
      if (!componentName) throw new Error('setComponent -- 组件名称不能为空');

      set(sdk.components, componentName, component);
    },
    getComponent: (name: string) => {
      if (!name) throw new Error('getComponent -- 组件名称不能为空');

      return get(sdk.components, name) as ComponentType;
    },
    getRootComponent: () => {
      return () => (
        <RootProvider sdk={sdk}>
          <MicroStateProvider>
            <Root />
          </MicroStateProvider>
        </RootProvider>
      );
    },
  };

  // 合并属性
  return merge(result, sdk.components, opt);
};

export {
  Props as ComponentsProps,
  Result as ComponentsResult,
  createComponents,
};
