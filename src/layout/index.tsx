import React from 'react';
import { Collapse } from 'antd';
import { ReactStyleEditorProps } from '../typing';
import BoxStylesEditor from './box';
import { CaretRightOutlined } from '@ant-design/icons';

import './index.less';

const EditorLayout = (props: ReactStyleEditorProps) => {
  const container = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  React.useEffect(() => {
    let ro: ResizeObserver | undefined;
    if (container.current) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === container.current) {
            setContainerWidth(entry.contentRect.width ?? 0);
          }
        }
      });
      ro.observe(container.current);
    }
    setContainerWidth(container.current?.offsetWidth ?? 0);
    // 在组件卸载时取消监听
    return () => {
      if (ro) {
        ro.disconnect();
      }
    };
  }, []);

  return (
    <Collapse
      ref={container}
      bordered={false}
      className="rse-collapse-header"
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      ghost
      size={props.size}
      expandIconPosition="end"
      items={[
        {
          key: '1',
          label: '盒模型样式',
          children: <BoxStylesEditor {...{ ...props, containerWidth }} />,
        },
      ]}
    />
  );
};

export default EditorLayout;
