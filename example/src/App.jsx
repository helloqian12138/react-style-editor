import React, { PureComponent } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './ErrorFallback';
import StyleEditor from 'css-style-editor';
import './App.css';
import PropsForm from './form';

function App() {
  const [editorProps, setEditorProps] = React.useState({});
  return (
    <div className="app">
      <div className="left preview">
        <div className="container">
          <StyleEditor {...editorProps} />
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
