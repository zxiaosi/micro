import { Empty, Flex } from 'antd';

/** 找不到页面 */
const NotFound: React.FC = () => {
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
