import * as React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError() as any;
  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error?.message}</pre>
    </div>
  );
};

export default ErrorBoundary;
