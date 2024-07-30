import React from 'react';

export interface OutSetOutlinedProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const OutSetOutlined = (props: OutSetOutlinedProps) => (
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
      d="M749.664 0.096c10.112 0 18.272 8.192 18.272 18.304v252.544h255.968V1024H255.968v-255.264H18.272A18.272 18.272 0 0 1 0 750.464V18.368C0 8.256 8.192 0.064 18.272 0.064h731.36z m-354.24 769.888h-48.032v162.528h201.056l-153.088-162.528z m299.872 0h-174.24l153.088 162.528h174.208l-153.056-162.528z m73.248-236.544v180.864l163.968 174.048v-180.864l-163.968-174.112zM676.512 91.616H91.424v585.632h585.088V91.616z m255.968 270.848h-163.936v37.6l0.224 0.224 163.744 173.824v-211.68z"
    ></path>
  </svg>
);

export default OutSetOutlined;
