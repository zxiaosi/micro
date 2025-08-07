/** 侧边菜单底部的配置 */
const CustomMenuFooter = (props) => {
  if (props?.collapsed) return undefined;

  return (
    <div style={{ textAlign: 'center' }}>
      ©2020 - {new Date().getFullYear()} By Mr.XiaoSi
    </div>
  );
};

export default CustomMenuFooter;
