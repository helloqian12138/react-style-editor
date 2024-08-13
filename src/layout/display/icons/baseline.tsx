import React from 'react';

export interface BaselineOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const BaselineOutlined = (props: BaselineOutlinedProps) => (
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
      d="M874.666667 834.133333v38.4a12.8 12.8 0 0 1-12.8 12.8H162.133333a12.8 12.8 0 0 1-12.8-12.8v-38.4a12.8 12.8 0 0 1 12.8-12.8h699.733334a12.8 12.8 0 0 1 12.8 12.8zM460.885333 157.866667L256.682667 729.6a12.8 12.8 0 0 0 12.074666 17.066667h62.634667a12.8 12.8 0 0 0 12.117333-8.704l49.066667-145.237334h238.08l49.066667 145.237334a12.8 12.8 0 0 0 12.117333 8.704h63.402667a12.8 12.8 0 0 0 12.074666-17.066667L563.114667 157.866667a12.8 12.8 0 0 0-12.032-8.533334h-78.165334a12.8 12.8 0 0 0-12.032 8.533334zM418.133333 517.376l92.330667-270.208h3.072l91.562667 270.208H418.133333z"
    ></path>
  </svg>
);

export default BaselineOutlined;
