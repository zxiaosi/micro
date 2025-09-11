import { Crumb } from '@zxiaosi/sdk';
import { Anchor } from 'antd';
import './index.less';

/** 角色管理页面 */
const Role = () => {
  return (
    <div className="role-page">
      <div className="role-page-header">
        <Crumb />
      </div>

      <div className="role-page-content">
        <div style={{ width: 'calc(100% - 200px)' }}>
          <div
            id="part-1"
            style={{ height: '100vh', background: 'rgba(255,0,0,0.1)' }}
          />
          <div
            id="part-2"
            style={{ height: '100vh', background: 'rgba(0,255,0,0.1)' }}
          />
          <div
            id="part-3"
            style={{ height: '100vh', background: 'rgba(0,0,255,0.1)' }}
          />
        </div>
        <div style={{ width: '200px' }}>
          <Anchor
            getContainer={() =>
              document.querySelector('.role-page-content') || document.body
            }
            items={[
              { key: 'part-1', href: '#part-1', title: 'Part 1' },
              { key: 'part-2', href: '#part-2', title: 'Part 2' },
              { key: 'part-3', href: '#part-3', title: 'Part 3' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Role;
