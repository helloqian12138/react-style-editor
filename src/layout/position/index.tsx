import React from 'react';

export interface EditorHandler {
  clearState: () => void;
}

const Editor = React.forwardRef((props, ref: React.ForwardedRef<EditorHandler>) => {
  React.useImperativeHandle(ref, () => ({
    clearState: () => {},
  }));
  return <div></div>;
});

Editor.displayName = 'Editor';
export default Editor;
