import React from 'react';
import { Button, Result } from 'antd';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="error"
      title={
        <>
          Something went wrong!
          <br />
          <Button
            size="small"
            style={{ marginLeft: 10 }}
            onClick={resetErrorBoundary}
          >
            Refresh
          </Button>
        </>
      }
      subTitle={error.message}
    ></Result>
  );
};

export default ErrorFallback;
