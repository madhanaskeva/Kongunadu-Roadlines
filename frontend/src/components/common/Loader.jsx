import React from 'react';

export const Loader = ({ message = 'Loading records…', size = 'md' }) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'sm':
        return 20;
      case 'lg':
        return 40;
      case 'md':
      default:
        return 28;
    }
  };

  const spinnerSize = getSpinnerSize();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        gap: '16px',
        color: 'var(--text-muted)',
      }}
    >
      <div
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          border: '3px solid var(--kr-green-100)',
          borderTopColor: 'var(--color-brand)',
          borderRadius: '50%',
          animation: 'tmsSpin 0.8s linear infinite',
        }}
      />
      {message && (
        <span
          style={{
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default Loader;

