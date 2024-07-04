import React from 'react'
import { Button, Result } from '@jd/jdesign-react'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="error"
      title={
        <>
          Something went wrong:
          <br />
          <Button
            size="small"
            style={{ marginLeft: 10 }}
            onClick={resetErrorBoundary}>
            刷新组件
          </Button>
        </>
      }
      subTitle={error.message}></Result>
  )
}

export default ErrorFallback
