import { RedoOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Input, Tooltip } from 'antd';
import React from 'react';

import './index.less';

const prefixCls = 'rse-color-picker';

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const RSEColorPicker = (props: ColorPickerProps) => {
  return (
    <div className={`${prefixCls}-editor`}>
      <ColorPicker
        size="small"
        value={props.value ?? ''}
        onChange={(color) => {
          props.onChange(color.toHexString());
        }}
      >
        <Button className="trigger" size="small">
          {props.value ? (
            <div
              className={`${prefixCls}-block`}
              style={{
                backgroundColor: props.value,
              }}
            />
          ) : (
            <div className={`${prefixCls}-clear`} />
          )}
        </Button>
      </ColorPicker>
      <Input
        size="small"
        className="no-border"
        style={{ margin: '0 4px' }}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      <Tooltip title="清空颜色">
        <Button
          size="small"
          shape="circle"
          icon={<RedoOutlined />}
          onClick={() => {
            props.onChange('');
          }}
        />
      </Tooltip>
    </div>
  );
};

RSEColorPicker.displayName = 'RSEColorPicker';
export default RSEColorPicker;
