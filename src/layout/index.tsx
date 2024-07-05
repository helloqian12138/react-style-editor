import React from 'react';
import { Collapse } from 'antd';
import { ReactStyleEditorProps } from '../typing';
import BoxStylesEditor from './box';
import './index.less';

const EditorLayout = (props: ReactStyleEditorProps) => {
  return (
    <Collapse
      bordered={false}
      className="rse-collapse-header"
      style={{ borderTop: '1px solid #303030' }}
      defaultActiveKey={['1']}
      ghost
      items={[
        {
          key: '1',
          label: '盒模型样式',
          children: <BoxStylesEditor {...props} />,
        },
      ]}
    />
  );
};

export default EditorLayout;
