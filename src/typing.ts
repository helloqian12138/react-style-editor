export interface ReactStyleEditorProps {
  lib?: 'antd';
  size?: 'small' | 'middle' | 'large';
}

export interface ReactStyleEditorHandler {
  getStyle: () => string;
  getCSSProperties: () => React.CSSProperties;
}
