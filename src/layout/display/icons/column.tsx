import React from 'react';

export interface ColumnOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const ColumnOutlined = (props: ColumnOutlinedProps) => (
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
      d="M586.666667 789.333333v-170.666666c0-29.44-23.893333-53.333333-53.333334-53.333334h-341.333333c-29.44 0-53.333333 23.893333-53.333333 53.333334v170.666666c0 29.44 23.893333 53.333333 53.333333 53.333334h341.333333c29.44 0 53.333333-23.893333 53.333334-53.333334zM586.666667 413.866667V226.133333c0-24.746667-20.053333-44.8-44.8-44.8H183.466667c-24.746667 0-44.8 20.053333-44.8 44.8v187.733334c0 24.746667 20.053333 44.8 44.8 44.8h358.4c24.746667 0 44.8-20.053333 44.8-44.8z m-63.957334-19.2H202.666667v-149.333334h320.042666v149.333334zM736 755.2V140.8a12.8 12.8 0 0 1 12.8-12.8h38.4a12.8 12.8 0 0 1 12.8 12.8v614.4a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M757.76 882.346667l-102.4-136.533334a12.8 12.8 0 0 1 10.24-20.48h204.8a12.8 12.8 0 0 1 10.24 20.48l-102.4 136.533334a12.8 12.8 0 0 1-20.48 0z"
    ></path>
  </svg>
);

export default ColumnOutlined;
