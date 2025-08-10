import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.less';

/** 详情页 */
const Detail = () => {
  const navigate = useNavigate();

  /** 返回上一级 */
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="detail-page">
      <div className="detail-page-title">子应用 Flow - 详情页</div>

      <Button onClick={handleGoBack} type="primary">
        返回上一级
      </Button>
    </div>
  );
};

export default Detail;
