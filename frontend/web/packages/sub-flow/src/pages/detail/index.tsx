import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

/** 详情页 */
const Detail = () => {
  const navigate = useNavigate();

  /** 返回上一级 */
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.detail}>
      <div className={styles.title}>子应用-拓扑图模块-详情</div>

      <Button onClick={handleGoBack} type="primary">
        返回上一级
      </Button>
    </div>
  );
};

export default Detail;
