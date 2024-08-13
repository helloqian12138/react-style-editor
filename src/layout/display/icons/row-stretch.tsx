import React from 'react';

export interface RowStretchOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const RowStretchOutlined = (props: RowStretchOutlinedProps) => (
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
      d="M874.666667 194.133333v38.4a12.8 12.8 0 0 1-12.8 12.8H162.133333a12.8 12.8 0 0 1-12.8-12.8v-38.4a12.8 12.8 0 0 1 12.8-12.8h699.733334a12.8 12.8 0 0 1 12.8 12.8zM874.666667 791.466667v38.4a12.8 12.8 0 0 1-12.8 12.8H162.133333a12.8 12.8 0 0 1-12.8-12.8v-38.4a12.8 12.8 0 0 1 12.8-12.8h699.733334a12.8 12.8 0 0 1 12.8 12.8z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M277.333333 213.333333h469.333334v213.333334a42.666667 42.666667 0 0 1-42.666667 42.666666h-384a42.666667 42.666667 0 0 1-42.666667-42.666666V213.333333zM320 554.666667h384a42.666667 42.666667 0 0 1 42.666667 42.666666v213.333334h-469.333334v-213.333334a42.666667 42.666667 0 0 1 42.666667-42.666666z"
    ></path>
  </svg>
);

export default RowStretchOutlined;
