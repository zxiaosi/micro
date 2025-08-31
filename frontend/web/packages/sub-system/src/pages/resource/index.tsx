import { sdk } from '@zxiaosi/sdk';
import { Button, Spin, Tree, type TreeDataNode, type TreeProps } from 'antd';
import { useState } from 'react';
import resourcesData from './getResource';
import './index.less';

// 递归获取所有 key
const getAllKeys = (resources: any[]) => {
  const keys: any[] = [];

  const traverse = (items: any) => {
    items.forEach((item) => {
      keys.push(item.key);
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    });
  };

  traverse(resources);
  return keys;
};

/** 资源管理页面 */
const Resource = () => {
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);

  /** 获取接口 */
  const getResources = async () => {
    setLoading(true);
    let resp = null;
    if (import.meta.env.DEV) {
      resp = await sdk.api.request('/getResources');
    } else {
      resp = resourcesData;
    }
    const data = resp?.data || ([] as any);
    setTreeData(data);
    setExpandedKeys(getAllKeys(data));
    setLoading(false);
  };

  const handleDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const handleDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };

  return (
    <div className="resource-page">
      <div className="resource-page-title">子应用-系统模块-资源管理</div>

      <Button type="primary" onClick={getResources}>
        测试接口
      </Button>

      <Spin spinning={loading}>
        <div className="resource-page-tree">
          <Tree
            draggable
            blockNode
            expandedKeys={expandedKeys}
            treeData={treeData}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          />
        </div>
      </Spin>
    </div>
  );
};

export default Resource;
