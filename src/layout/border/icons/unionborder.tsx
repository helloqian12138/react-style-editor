import React from 'react';

export interface UnionBorderRadiusProps {
  width?: number;
  height?: number;
}

const UnionBorderRadius = (props: UnionBorderRadiusProps) => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 16}
    height={props.height ?? 16}
    fill="currentColor"
  >
    <path
      // eslint-disable-next-line max-len
      d="M597.568 91.008 429.184 91.008c0 0-339.52 0-339.52 338.304l0 166.784c0 0 0 336.704 339.52 336.704l168.384 0c0 0 335.104 0 335.104-336.704L932.672 429.312C932.672 429.312 932.672 91.008 597.568 91.008zM846.912 596.032c0 252.544-249.344 252.544-249.344 252.544L429.184 848.576c-250.944 0-252.544-252.544-252.544-252.544L176.64 429.312c1.6-252.544 252.544-252.544 252.544-252.544l168.384 0c249.344 0 249.344 252.544 249.344 252.544L846.912 596.032z"
    ></path>
  </svg>
);

export default UnionBorderRadius;
