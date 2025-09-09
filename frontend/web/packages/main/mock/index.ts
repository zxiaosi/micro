import getResource from '../mock/getResource';
import getRoutes from '../mock/getRoutes';
import getTest from '../mock/getTest';
import getUserInfo from '../mock/getUserInfo';
import login from '../mock/login';

export default [
  ...getResource,
  ...getRoutes,
  ...getTest,
  ...getUserInfo,
  ...login,
];
