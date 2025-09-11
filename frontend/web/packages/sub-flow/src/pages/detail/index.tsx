import { Crumb, sdk } from '@zxiaosi/sdk';
import { Button } from 'antd';
import './index.less';

/** 详情页 */
const Detail = () => {
  /** 返回上一级 */
  const handleGoBack = () => {
    sdk.client.navigate(-1);
  };

  return (
    <div className="detail">
      <div className="detail-crumb">
        <Crumb />
      </div>

      <Button onClick={handleGoBack} type="primary">
        返回上一级
      </Button>
    </div>
  );
};

export default Detail;
