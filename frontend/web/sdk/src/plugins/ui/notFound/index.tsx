import { sdk } from '@/core';
import { Empty, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * 404页面
 * - 需要注册 navigate 实例，用于跳转页面
 */
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  sdk.client.navigate = navigate;

  return (
    <Flex
      style={{ width: '100%', height: '100%', background: 'var(--bg-color)' }}
      justify={'center'}
      align={'center'}
    >
      <Empty description={'找不到页面'} />
    </Flex>
  );
};

export default NotFound;
