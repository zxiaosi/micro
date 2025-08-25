/** 侧边菜单底部的配置 */
const CustomMenuFooter = (props) => {
  if (props?.collapsed) return undefined;

  return (
    <div style={{ textAlign: 'center' }}>
      ©2020 - {new Date().getFullYear()} By <a href="https://github.com/zxiaosi/micro/tree/master/frontend/web">ZXiaoSi</a>
    </div>
  );
};

export default CustomMenuFooter;
