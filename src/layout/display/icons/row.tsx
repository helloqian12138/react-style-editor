import React from 'react';

export interface RowOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const RowOutlined = (props: RowOutlinedProps) => (
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
      d="M413.866667 138.666667H226.133333c-24.746667 0-44.8 20.053333-44.8 44.8v358.4c0 24.746667 20.053333 44.8 44.8 44.8h187.733334c24.746667 0 44.8-20.053333 44.8-44.8V183.466667c0-24.746667-20.053333-44.8-44.8-44.8z m-19.2 63.957333v320.042667h-149.333334V202.624h149.333334zM789.333333 138.666667h-170.666666c-29.44 0-53.333333 23.893333-53.333334 53.333333v341.333333c0 29.44 23.893333 53.333333 53.333334 53.333334h170.666666c29.44 0 53.333333-23.893333 53.333334-53.333334v-341.333333c0-29.44-23.893333-53.333333-53.333334-53.333333zM140.8 736h614.4a12.8 12.8 0 0 1 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4a12.8 12.8 0 0 1 12.8-12.8z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M882.346667 778.24l-136.533334 102.4a12.8 12.8 0 0 1-20.48-10.24v-204.8a12.8 12.8 0 0 1 20.48-10.24l136.533334 102.4a12.8 12.8 0 0 1 0 20.48z"
    ></path>
  </svg>
);

export default RowOutlined;
