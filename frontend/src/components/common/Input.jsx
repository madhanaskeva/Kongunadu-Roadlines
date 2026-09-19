import React from 'react';

export const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  helperText,
  icon: Icon,
  disabled = false,
  required = false,
  name,
  style = {},
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }}>
      {label && (
        <label
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--kr-red-600)' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            <Icon size={18} />
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            height: '42px',
            padding: Icon ? '0 12px 0 38px' : '0 12px',
            fontSize: '14px',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-heading)',
            backgroundColor: disabled ? 'var(--surface-muted)' : '#ffffff',
            border: `1px solid ${error ? 'var(--kr-red-600)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = 'var(--color-brand)';
            e.target.style.boxShadow = 'var(--focus-ring)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--kr-red-600)' : 'var(--border-strong)';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: 'var(--kr-red-600)', fontWeight: 600 }}>{error}</span>}
      {helperText && !error && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{helperText}</span>}
    </div>
  );
};

export default Input;

