import React from 'react';
const Login = React.lazy(() => import('@/components/login/index'));
const NotFound = React.lazy(() => import('@/components/notFound/index'));
const Root = React.lazy(() => import('@/components/root/index'));

export default {
  Login,
  NotFound,
  Root,
};
