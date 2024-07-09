import { Button } from 'antd';
import React, { PureComponent } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './ErrorFallback';
import StyleEditor from 'css-style-editor';
import PropsForm from './form';

import './App.css';
import 'css-style-editor/dist/umd/index.css';

function App() {
  const editor = React.useRef(null);
  const [editorProps, setEditorProps] = React.useState({});
  return (
    <div className="app">
      <div className="left preview">
        <div className="container">
          <StyleEditor ref={editor} {...editorProps} />
        </div>
      </div>
      <div className="right">
        <div className="form-header">编辑属性</div>
        <PropsForm
          value={editorProps}
          onChange={(newProps) =>
            setEditorProps({ ...editorProps, ...newProps })
          }
        />
        <Button
          onClick={() => {
            console.log(editor.current?.getCSSProperties());
          }}
        >
          CSS 样式
        </Button>
      </div>
    </div>
  );
}

class Main extends PureComponent {
  render() {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    );
  }
}

export default Main;
