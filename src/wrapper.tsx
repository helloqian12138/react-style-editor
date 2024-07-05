import ConfigProvider from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { ReactStyleEditorHandler, ReactStyleEditorProps } from './typing';
import {
  EditorContext,
  ReactStyleEditorContext,
  ReactStyleEditorStates,
} from './hook';
import EditorLayout from './layout';

const ReactStyleEditor = React.forwardRef(
  (
    props: ReactStyleEditorProps,
    ref: React.ForwardedRef<ReactStyleEditorHandler>,
  ) => {
    const [editorStates, setEditorStates] = React.useState(
      {} as ReactStyleEditorStates,
    );
    const editorContext: ReactStyleEditorContext = {
      ...editorStates,
      setState: (states, callback) => {
        if (typeof states === 'function') {
          const newStates = states(editorStates);
          setEditorStates(newStates);
          callback?.(newStates);
        } else {
          const newStates = {
            ...editorStates,
            ...states,
          };
          setEditorStates(newStates);
          callback?.(newStates);
        }
      },
    };

    React.useImperativeHandle(ref, () => ({
      getStyle: () => '',
      getCSSProperties: () => cloneDeep(editorStates.styles),
    }));

    return (
      <ConfigProvider locale={zhCN}>
        <EditorContext.Provider value={editorContext}>
          <EditorLayout {...props} />
        </EditorContext.Provider>
      </ConfigProvider>
    );
  },
);
ReactStyleEditor.displayName = 'ReactStyleEditor';
export default ReactStyleEditor;
