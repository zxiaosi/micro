import { sdk } from '@zxiaosi/sdk';
import { Button, Card, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

let timer: any = null;

/** 自定义引导页 */
const Guide = () => {
  const countRef = useRef(0);
  const [list, setList] = useState<any[]>([]);

  /** 测试接口 */
  const getData = async () => {
    const count = countRef.current + 1;

    sdk.api
      .request('/test', { method: 'get' })
      .then((resp) => {
        setList((_) => [..._, { count, data: resp?.data }]);
      })
      .catch((error) => {
        setList((_) => [..._, { count, data: '取消请求' }]);
      });

    countRef.current = count;
  };

  /** 开始轮询 */
  const handleStart = () => {
    timer = setInterval(() => {
      getData();
    }, 1000);
  };

  /** 结束轮询 */
  const handleCancel = () => {
    clearInterval(timer);
  };

  /** 清空 */
  const handleClear = () => {
    setList([]);
    countRef.current = 0;
  };

  useEffect(() => {
    return () => {
      handleCancel();
      handleClear();

      const controllers = sdk.api.controllers;
      controllers?.forEach((controller) => {
        controller.abort();
      });
    };
  }, []);

  return (
    <div className="guide">
      <Card title="引导页">
        <div>测试接口取消功能</div>

        <Space>
          <Button type="primary" onClick={handleStart}>
            开始轮询
          </Button>
          <Button type="primary" onClick={handleCancel}>
            结束轮询
          </Button>
          <Button type="primary" onClick={handleClear}>
            清空
          </Button>
        </Space>

        {list?.map(({ count, data }) => (
          <div key={count}>
            第 {count} 次请求 -- {data}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Guide;
