import React from 'react';

const ErrorLabel = ({ error, styles }: { error: string; styles?: string }) => {
  return <span className={`text-sm text-red-600 ${styles}`}>{error}</span>;
};

export default ErrorLabel;
