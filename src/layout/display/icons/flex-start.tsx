import React from 'react';

export interface FlexStartOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const FlexStartOutlined = (props: FlexStartOutlinedProps) => (
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
      d="M170.666667 277.333333h149.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v384a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667V277.333333z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M448 277.333333m42.666667 0l106.666666 0q42.666667 0 42.666667 42.666667l0 384q0 42.666667-42.666667 42.666667l-106.666666 0q-42.666667 0-42.666667-42.666667l0-384q0-42.666667 42.666667-42.666667Z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M202.666667 162.133333v699.733334a12.8 12.8 0 0 1-12.8 12.8H151.466667a12.8 12.8 0 0 1-12.8-12.8V162.133333A12.8 12.8 0 0 1 151.466667 149.333333h38.4a12.8 12.8 0 0 1 12.8 12.8z"
    ></path>
  </svg>
);

export default FlexStartOutlined;