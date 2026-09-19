import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  icon: Icon,
  className = '',
  style = {},
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-brand)',
          color: '#ffffff',
          border: '1px solid var(--color-brand)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-brand-tint)',
          color: 'var(--kr-green-900)',
          border: '1px solid var(--kr-green-100)',
        };
      case 'outline':
        return {
          backgroundColor: '#ffffff',
          color: 'var(--text-heading)',
          border: '1px solid var(--border-strong)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--kr-red-600)',
          color: '#ffffff',
          border: '1px solid var(--kr-red-600)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-heading)',
          border: '1px solid transparent',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { height: '32px', padding: '0 10px', fontSize: '13px' };
      case 'lg':
        return { height: '48px', padding: '0 24px', fontSize: '16px' };
      case 'md':
      default:
        return { height: '40px', padding: '0 16px', fontSize: '14px' };
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        borderRadius: 'var(--radius-md)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all var(--dur-fast)',
        textDecoration: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
    >
      {loading && (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'tmsSpin 0.8s linear infinite',
          }}
        />
      )}
      {!loading && Icon && <Icon size={size === 'sm' ? 14 : 18} />}
      {children}
    </button>
  );
};

export default Button;

