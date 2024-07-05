import React from 'react';
import { Button } from 'antd';
import { ReactStyleEditorProps } from '../typing';

const sizeMap = {
  small: 'small' as const,
  default: 'middle' as const,
  large: 'large' as const,
};

const EditorLayout = (props: ReactStyleEditorProps) => {
  return <Button size={props.size ? sizeMap[props.size] : void 0}>BTN</Button>;
};

export default EditorLayout;
