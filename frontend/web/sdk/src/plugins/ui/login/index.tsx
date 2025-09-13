import { sdk } from '@/core';
import { Button, Flex, Form, FormProps, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** 登录页（可从主应用传入覆盖） */
const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /** 表单提交成功事件 */
  const handleFinish: FormProps['onFinish'] = async (values) => {
    setLoading(() => true);
    const resp = await sdk.api.loginApi(values);
    setLoading(() => false);
    const token = resp?.data?.token || '';
    if (!token) return;

    localStorage.setItem(sdk.config.tokenName, token);
    const defaultPath = sdk.app.getRedirectPath();
    navigate(defaultPath, { replace: true }); // 这里可以用 navigation, 不用刷新页面, 因为下方调用了初始化接口
    await sdk.app.initData();
  };

  return (
    <Flex
      style={{ width: '100%', height: '100%', background: 'var(--bg-color)' }}
      justify={'center'}
      align={'center'}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
