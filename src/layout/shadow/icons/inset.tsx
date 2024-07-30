import React from 'react';

export interface InSetOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const InSetOutlined = (props: InSetOutlinedProps) => (
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
      d="M782 62H62v900h900V62z m120 150.9L811.1 122H902zM523 782l120 120h-134.58l-120-120z m84.86 0h134.34l120 120h-134.34zM782 736.94v-134.3l120 120v134.3z m0-219.16v-134.34l120 120v134.34zM122 122h600v600H122z m0 683.1L218.9 902H122zM303.76 902l-120-120h119.8l120 120zM782 298.58V177.76l120 120v120.82z"
    ></path>
  </svg>
);

export default InSetOutlined;
