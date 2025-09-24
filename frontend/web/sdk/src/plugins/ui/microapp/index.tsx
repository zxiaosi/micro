import { sdk } from '@/core';
import { lifeCyclesUtil } from '@/utils';
import { loadMicroApp } from 'qiankun';
import React, { memo, useEffect } from 'react';
import { useStore } from 'zustand';

interface Props {
  name: string;
  rootId: string;
}

/** 子应用挂载节点 */
const Microapp: React.FC<Props> = ({ name, rootId }) => {
  const microAppState = useStore(sdk.store, (state) => state.microAppState);

  useEffect(() => {
    if (!name || sdk.config.qiankunMode !== 'load') return;

    const instance = sdk.app.microAppsInstance.get(name);
    if (instance) {
      instance.mount();
    } else {
      const microApp = sdk.app.microApps.find((item) => item.name === name);
      if (!microApp) return;
      const newInstance = loadMicroApp(microApp, {}, lifeCyclesUtil);
      sdk.app.microAppsInstance.set(name, newInstance);
    }

    console.log('Microapp', name);

    return () => {
      const ins = sdk.app.microAppsInstance.get(name);
      if (ins) ins.unmount();
    };
  }, [name]);

  return (
    <>
      {microAppState && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
