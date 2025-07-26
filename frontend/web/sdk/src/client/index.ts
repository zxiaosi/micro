import { NavigateFunction } from 'react-router';

/** 客户端配置 */
export interface ClientConfigProps {
  /** 主应用navigate（解决子应用跳转问题） */
  navigate: NavigateFunction;
}

/** 客户端配置 */
const clientConfig: ClientConfigProps = {
  navigate: null,
};

export default clientConfig;
