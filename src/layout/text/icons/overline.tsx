import React from 'react';

export interface OverlineProps {
  width?: number;
  height?: number;
}

const Overline = (props: OverlineProps) => (
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
      d="M650.496 768H373.504l-68.266667 170.666667H213.333333l256-640h85.333334l256 640h-91.904l-68.266667-170.666667z m-34.133333-85.333333L512 421.76 407.637333 682.666667h208.725334zM170.666667 128h682.666666v85.333333H170.666667V128z"
    ></path>
  </svg>
);

export default Overline;
