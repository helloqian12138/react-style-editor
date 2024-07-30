import React from 'react';
import { Collapse } from 'antd';
import { ReactStyleEditorProps } from '../typing';
import BoxStylesEditor from './box';
import { CaretRightOutlined, ClearOutlined } from '@ant-design/icons';

import BorderStylesEditor, { BorderStylesEditorHandler } from './border';
import TextStylesEditor, { TextStylesEditorHandler } from './text';
import BackgroundEditor from './background';
import BoxShadowEditor, { BoxShadowEditorHandler } from './shadow';

import './index.less';

const EditorLayout = (props: ReactStyleEditorProps) => {
  const container = React.useRef<HTMLDivElement>(null);
  const borderEditor = React.useRef<BorderStylesEditorHandler>(null);
  const textEditor = React.useRef<TextStylesEditorHandler>(null);
  const boxShadowEditor = React.useRef<BoxShadowEditorHandler>(null);
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
      defaultActiveKey={['5']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      ghost
      size={props.size}
      expandIconPosition="end"
      items={[
        {
          key: '1',
          label: '容器样式',
          children: <BoxStylesEditor {...{ ...props, containerWidth }} />,
          style: { borderBottom: '1px solid #e6e6e6', borderRadius: 0 },
        },
        {
          key: '2',
          label: '边框及圆角样式',
          children: <BorderStylesEditor ref={borderEditor} />,
          extra: (
            <ClearOutlined
              onClick={(e) => {
                e.stopPropagation();
                borderEditor.current?.clearState();
              }}
            />
          ),
          style: { borderBottom: '1px solid #e6e6e6', borderRadius: 0 },
        },
        {
          key: '3',
          label: '文字样式',
          children: <TextStylesEditor ref={textEditor} />,
          extra: (
            <ClearOutlined
              onClick={(e) => {
                e.stopPropagation();
                textEditor.current?.clearState();
              }}
            />
          ),
          style: { borderBottom: '1px solid #e6e6e6', borderRadius: 0 },
        },
        {
          key: '4',
          label: '背景样式',
          children: <BackgroundEditor ref={textEditor} />,
          extra: (
            <ClearOutlined
              onClick={(e) => {
                e.stopPropagation();
                textEditor.current?.clearState();
              }}
            />
          ),
          style: { borderBottom: '1px solid #e6e6e6', borderRadius: 0 },
        },
        {
          key: '5',
          label: '阴影样式',
          children: <BoxShadowEditor ref={boxShadowEditor} />,
          extra: (
            <ClearOutlined
              onClick={(e) => {
                e.stopPropagation();
                boxShadowEditor.current?.clearState();
              }}
            />
          ),
          style: { borderBottom: '1px solid #e6e6e6', borderRadius: 0 },
        },
      ]}
    />
  );
};

export default EditorLayout;
