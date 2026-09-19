import React from 'react';

export const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  error,
  required = false,
  disabled = false,
  style = {},
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
      <select
        name={name}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: '100%',
          height: '42px',
          padding: '0 12px',
          fontSize: '14px',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-heading)',
          backgroundColor: disabled ? 'var(--surface-muted)' : '#ffffff',
          border: `1px solid ${error ? 'var(--kr-red-600)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <span style={{ fontSize: '12px', color: 'var(--kr-red-600)', fontWeight: 600 }}>{error}</span>}
    </div>
  );
};

export default FormSelect;

