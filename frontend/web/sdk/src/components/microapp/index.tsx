import { memo } from 'react';

/** 渲染微应用 */
const Microapp = ({ rootId }) => {
  return <main id={rootId}></main>;
};

export default memo(Microapp);
