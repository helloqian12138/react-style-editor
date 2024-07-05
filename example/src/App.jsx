import React, { PureComponent } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './ErrorFallback';
import MyComponent from 'react-css-style-editor';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyComponent />
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
