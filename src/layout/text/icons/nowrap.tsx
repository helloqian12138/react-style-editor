import React from 'react';

export interface NoWrapOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const NoWrapOutlined = (props: NoWrapOutlinedProps) => (
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
      d="M0 64h1024v85.333333H0zM0 405.333333h1024v85.333334H0zM810.666667 618.666667l213.333333 170.666666-213.333333 170.666667v-128H0v-85.333333h810.666667v-128z"
    ></path>
  </svg>
);

export default NoWrapOutlined;
