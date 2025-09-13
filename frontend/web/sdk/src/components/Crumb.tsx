import { sdk } from '@/core';
import { useCrumb, useIntl } from '@/hooks';
import { Breadcrumb, BreadcrumbItemProps } from 'antd';
import { useMemo } from 'react';

/** 面包屑 */
const Crumb: React.FC = (props: BreadcrumbItemProps) => {
  const crumb = useCrumb();
  const { formatMessage } = useIntl();

  /** 页面跳转 */
  const handlePageTo = (url, e?: any) => {
    e?.preventDefault(); // 阻止默认跳转行为
    sdk.client?.navigate(url);
  };

  const items = useMemo(() => {
    if (!crumb || crumb.length === 0) return [];

    return crumb.map((item, index) => {
      let path = item.path;
      const { name, locale } = item;

      // 首页的子页面，默认选中第一个子页面
      if (path === '/' && item.children && item.children.length > 0) {
        const children = item.children?.filter((_) => !_.hideInMenu);
        path = children[0].path;
      }

      const text = formatMessage({ id: locale }) || name;
      if (index === crumb.length - 1) {
        return { title: text };
      } else {
        return {
          title: text,
          href: path,
          onClick: (e) => handlePageTo(path, e),
        };
      }
    });
  }, [crumb]);

  return <Breadcrumb items={items} {...props} />;
};

export { Crumb };
