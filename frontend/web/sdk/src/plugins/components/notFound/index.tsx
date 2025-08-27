import { Empty, Flex } from 'antd';

/** 找不到页面 */
const NotFound = () => {
  return (
    <Flex
      style={{ width: '100%', height: '100%' }}
      justify={'center'}
      align={'center'}
    >
      <Empty description={'找不到页面'} />
    </Flex>
  );
};

export default NotFound;
