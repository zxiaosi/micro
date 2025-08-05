import { useMicroState } from '@/hooks/useMicroState';
import { memo } from 'react';

/** 渲染微应用 */
const Microapp = ({ rootId }) => {
  const { loading } = useMicroState();

  return (
    <>
      {loading && <div>Loading...</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
