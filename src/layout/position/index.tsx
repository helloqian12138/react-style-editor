import React from 'react';
import { EditorContext } from '../../hook';
import { Form, Input, InputNumber, Select } from 'antd';

import positionOptions from './options/positions';
import { ReactStyleEditorProps } from '../../typing';

export interface PositionEditorHandler {
  clearState: () => void;
}

export interface PositionEditorProps extends ReactStyleEditorProps {
  containerWidth: number;
}

const prefixCls = 'rse-box';

const parseNumber = (str: string, max: number, min: number, handler: (val: number | undefined) => void) => {
  if (str === '' || str === void 0 || str === null) {
    return handler(void 0);
  }
  const value = Number(str);
  if (Number.isNaN(value)) {
    return handler(void 0);
  }
  if (value > max || value < min) {
    return;
  }
  return handler(value);
};

const PositionEditor = React.forwardRef(
  (props: PositionEditorProps, ref: React.ForwardedRef<PositionEditorHandler>) => {
    const { styles, setState } = React.useContext(EditorContext);
    const [position, setPosition] = React.useState(styles.position);
    const [containerSize, setContainerSize] = React.useState(props.containerWidth > 400 ? 'middle' : 'small');
    const [top, setTop] = React.useState(styles.top);
    const [bottom, setBottom] = React.useState(styles.bottom);
    const [left, setLeft] = React.useState(styles.left);
    const [right, setRight] = React.useState(styles.right);
    const [zIndex, setZIndex] = React.useState(styles.zIndex);

    React.useEffect(() => {
      const newStyles = { ...styles };
      newStyles.top = top;
      newStyles.bottom = bottom;
      newStyles.left = left;
      newStyles.right = right;
      setState({ styles: newStyles });
    }, [top, bottom, left, right]);

    React.useEffect(() => {
      setContainerSize(props.containerWidth > 400 ? 'middle' : 'small');
    }, [props.containerWidth]);

    React.useImperativeHandle(ref, () => ({
      clearState: () => {
        setPosition(void 0);
        setTop(void 0);
        setBottom(void 0);
        setLeft(void 0);
        setRight(void 0);
        setZIndex(void 0);
        const newStyles = { ...styles };
        delete newStyles.position;
        delete newStyles.top;
        delete newStyles.bottom;
        delete newStyles.left;
        delete newStyles.right;
        delete newStyles.zIndex;
        setState({ styles: newStyles });
      },
    }));

    return (
      <div>
        <Form.Item
          label={<span className={`${prefixCls}-style-editor-label`}>定位类型</span>}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          style={{ marginBottom: '8px' }}
        >
          <Select
            size="small"
            allowClear
            options={positionOptions}
            value={position}
            onChange={(value) => {
              setPosition(value);
              const newStyles = { ...styles };
              newStyles.position = value;
              if (!value) {
                delete newStyles.position;
              }
              setState({ styles: newStyles });
            }}
          />
        </Form.Item>

        <div className={`${prefixCls}-margin-top ${containerSize}`}>
          <Input
            className={`${prefixCls}-transparent-input`}
            size={props.size}
            value={String(top ?? '')}
            onChange={(e) => parseNumber(e.target.value, 999, -999, setTop)}
          />
        </div>
        <div className={`${prefixCls}-middle-container`}>
          <div className={`${prefixCls}-margin-left`}>
            <Input
              className={`${prefixCls}-transparent-input`}
              size={props.size}
              value={String(left ?? '')}
              onChange={(e) => parseNumber(e.target.value, 999, -999, setLeft)}
            />
          </div>
          <div className={`${prefixCls}-margin-right`}>
            <Input
              className={`${prefixCls}-transparent-input`}
              size={props.size}
              value={String(right ?? '')}
              onChange={(e) => parseNumber(e.target.value, 999, -999, setRight)}
            />
          </div>
        </div>
        <div className={`${prefixCls}-margin-bottom ${containerSize}`}>
          <span className={`${prefixCls}-bottom-title`}>定位距离</span>
          <Input
            className={`${prefixCls}-transparent-input`}
            size={props.size}
            value={String(bottom ?? '')}
            onChange={(e) => parseNumber(e.target.value, 999, -999, setBottom)}
          />
        </div>

        <Form.Item
          label={<span className={`${prefixCls}-style-editor-label`}>Z值/优先等级</span>}
          labelCol={{ span: 8 }}
          labelAlign="left"
          wrapperCol={{ span: 16 }}
          className="no-margin"
          style={{ marginTop: 8 }}
        >
          <InputNumber
            size="small"
            min={-999}
            max={9999}
            style={{ width: '100%' }}
            value={zIndex as number}
            onChange={(v) => setZIndex(v ?? void 0)}
          />
        </Form.Item>
      </div>
    );
  },
);

PositionEditor.displayName = 'PositionEditor';
export default PositionEditor;
