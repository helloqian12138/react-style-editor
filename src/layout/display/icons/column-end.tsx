import React from 'react';

export interface ColumnEndOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const ColumnEndOutlined = (props: ColumnEndOutlinedProps) => (
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
      d="M277.333333 512m42.666667 0l106.666667 0q42.666667 0 42.666666 42.666667l0 256q0 42.666667-42.666666 42.666666l-106.666667 0q-42.666667 0-42.666667-42.666666l0-256q0-42.666667 42.666667-42.666667Z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M554.666667 384m42.666666 0l106.666667 0q42.666667 0 42.666667 42.666667l0 384q0 42.666667-42.666667 42.666666l-106.666667 0q-42.666667 0-42.666666-42.666666l0-384q0-42.666667 42.666666-42.666667Z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M874.666667 834.133333v38.4a12.8 12.8 0 0 1-12.8 12.8H162.133333a12.8 12.8 0 0 1-12.8-12.8v-38.4a12.8 12.8 0 0 1 12.8-12.8h699.733334a12.8 12.8 0 0 1 12.8 12.8z"
    ></path>
  </svg>
);

export default ColumnEndOutlined;
