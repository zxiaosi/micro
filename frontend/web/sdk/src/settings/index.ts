/** 额外配置 */
export interface SettingsConfigProps {
  /** 登录接口 */
  loginApi?: (data?: any) => any;
  /** 获取用户信息接口 */
  getUserInfoApi?: (data?: any) => any;
  /** 获取路由数据接口 */
  getRoutesApi?: (data?: any) => any;
}

/** 额外配置 */
const settingsConfig: SettingsConfigProps = {
  loginApi: undefined,
  getUserInfoApi: undefined,
  getRoutesApi: undefined,
};

export default settingsConfig;
