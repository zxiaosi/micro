import { sdk } from '@/core';
import { memo } from 'react';
import { useStore } from 'zustand';

/** 渲染微应用 */
const Microapp = ({ rootId }) => {
  const microAppState = useStore(sdk.store, (state) => state.microAppState);

  return (
    <>
      {microAppState && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
