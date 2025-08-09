/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const cssH1 = css`
  color: red;
`;

/** 找不到页面 */
const NotFound = () => {
  return (
    <div>
      <h1 css={cssH1}>404</h1>
    </div>
  );
};

export default NotFound;
