export interface ReactStyleEditorProps {
  lib?: 'antd';
  size?: 'small' | 'default' | 'large';
}

export interface ReactStyleEditorHandler {
  getStyle: () => string;
  getCSSProperties: () => React.CSSProperties;
}
