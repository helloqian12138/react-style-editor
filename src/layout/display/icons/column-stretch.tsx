import React from 'react';

export interface ColumnStretchOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const ColumnStretchOutlined = (props: ColumnStretchOutlinedProps) => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 16}
    height={props.height ?? 16}
    style={props.style}
    fill="currentColor"
  >
    <path
      // eslint-disable-next-line max-len
      d="M170.666667 277.333333h682.666666V469.333333H170.666667zM170.666667 554.666667h682.666666v192H170.666667z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M202.666667 162.133333v699.733334a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V162.133333a12.8 12.8 0 0 1 12.8-12.8h38.4a12.8 12.8 0 0 1 12.8 12.8zM885.333333 162.133333v699.733334a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V162.133333a12.8 12.8 0 0 1 12.8-12.8h38.4a12.8 12.8 0 0 1 12.8 12.8z"
    ></path>
  </svg>
);

export default ColumnStretchOutlined;
