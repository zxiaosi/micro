import sdk from '@/core';
import { Button, Flex, Form, FormProps, Input, message } from 'antd';

/** 登录页（可从主应用传入覆盖） */
const Login = () => {
  /** 表单提交成功事件 */
  const handleFinish: FormProps['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      const resp = await sdk.api.loginApi?.(values);
      const token = resp?.data?.token || '';
      if (token) {
        localStorage.setItem('token', token);
        sdk.client.navigate('/');
      } else {
        message.error('登录失败');
      }
    } catch (err) {
      console.error('登录异常---', err);
      message.error('登录异常');
    }
  };

  return (
    <Flex
      style={{ width: '100%', height: '100%' }}
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
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
