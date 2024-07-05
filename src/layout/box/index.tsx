import React from 'react';
import { ReactStyleEditorProps } from '../../typing';
import { Input } from 'antd';

const BoxStylesEditor = (props: ReactStyleEditorProps) => {
  const [marginTop, setMarginTop] = React.useState(0);
  return (
    <div style={{ padding: '2px' }}>
      <div className="rse-margin-top">
        <Input
          className="transparent-input"
          size={props.size}
          value={String(marginTop)}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMarginTop(Number.isNaN(value) ? 0 : value);
          }}
        />
      </div>
    </div>
  );
};

export default BoxStylesEditor;
