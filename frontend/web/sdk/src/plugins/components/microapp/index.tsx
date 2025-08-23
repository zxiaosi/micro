import { useMicroState } from '@/plugins/hooks/useMicroState';
import { memo } from 'react';

/** 渲染微应用 */
const Microapp = ({ rootId }) => {
  const { microAppState } = useMicroState();

  return (
    <>
      {microAppState && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
