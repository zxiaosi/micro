import { sdk } from '@/core';
import React, { memo } from 'react';
import { useStore } from 'zustand';

interface Props {
  rootId: string;
}

/** 子应用挂载节点 */
const Microapp: React.FC<Props> = ({ rootId }) => {
  const microAppState = useStore(sdk.store, (state) => state.microAppState);

  return (
    <>
      {microAppState && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
