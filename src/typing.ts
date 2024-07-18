export interface CSSValueType {
  rawValue: Record<string, string | number>;
  toCSSStyle: () => string;
  toCSSProperties: () => React.CSSProperties;
}

export interface ReactStyleEditorProps {
  lib?: 'antd';
  size?: 'small' | 'middle' | 'large';
  value?: string | React.CSSProperties;
  onChange?: (value: CSSValueType) => void;
}

export interface ReactStyleEditorHandler {
  getCSSStyle: () => string;
  getCSSProperties: () => React.CSSProperties;
}
