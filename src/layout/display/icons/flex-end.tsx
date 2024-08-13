import React from 'react';

export interface FlexEndOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const FlexEndOutlined = (props: FlexEndOutlinedProps) => (
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
      d="M341.33333333 329.9555552m45.51111147 0l113.77777707 0q45.51111147 0 45.51111146 45.51111147l0 273.06666666q0 45.51111147-45.51111146 45.51111147l-113.77777707 0q-45.51111147 0-45.51111147-45.51111147l0-273.06666666q0-45.51111147 45.51111147-45.51111147Z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M637.1555552 329.9555552m45.51111147 0l113.77777813 0q45.51111147 0 45.5111104 45.51111147l0 273.06666666q0 45.51111147-45.5111104 45.51111147l-113.77777813 0q-45.51111147 0-45.51111147-45.51111147l0-273.06666666q0-45.51111147 45.51111147-45.51111147Z"
    ></path>
    <path
      // eslint-disable-next-line max-len
      d="M910.22222187 138.80888853v746.38222294a13.65333333 13.65333333 0 0 1-13.65333334 13.65333333h-40.96a13.65333333 13.65333333 0 0 1-13.65333333-13.65333333V138.80888853a13.65333333 13.65333333 0 0 1 13.65333333-13.65333333h40.96a13.65333333 13.65333333 0 0 1 13.65333334 13.65333333z"
    ></path>
  </svg>
);

export default FlexEndOutlined;
