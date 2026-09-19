import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../../components/common/Button';
import FormInput from '../../../components/forms/FormInput';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('admin@transport.example');
  const [password, setPassword] = useState('password');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }
    const res = await login({ email, password });
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setFormError(res.error || 'Incorrect email or password.');
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        minHeight: 'calc(100vh - 70px)',
      }}
    >
      {/* Brand Hero Column */}
      <div
        style={{
          backgroundColor: 'var(--color-brand)',
          color: '#ffffff',
          padding: '64px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="/assets/logo-inverse.png"
          alt="Kongunadu Road Lines"
          style={{ height: '44px', width: 'auto', alignSelf: 'flex-start' }}
        />
        <div style={{ marginTop: 'auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--kr-green-100)',
            }}
          >
            Admin Web Portal
          </div>
          <h1
            style={{
              margin: '12px 0 0',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '38px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Every vehicle movement, recorded.
          </h1>
          <p style={{ margin: '16px 0 0', fontSize: '16px', opacity: 0.9, maxWidth: '440px', lineHeight: 1.6 }}>
            700+ trucks, 300–400 trips a day, every one validated against fixed route, GPS and odometer distance.
          </p>
        </div>
      </div>

      {/* Login Form Column */}
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '28px',
                color: 'var(--text-heading)',
              }}
            >
              Sign in
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'var(--text-muted)' }}>
              Head Office administrators and owners. Supervisors use the mobile app.
            </p>
          </div>

          {(formError || error) && (
            <div
              style={{
                padding: '12px 14px',
                backgroundColor: 'var(--kr-red-50)',
                border: '1px solid var(--kr-red-100)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--kr-red-800)',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {formError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@transport.example"
              required
            />
            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              style={{ marginTop: '8px' }}
            >
              Sign in to Portal
            </Button>
          </form>

          <button
            type="button"
            onClick={() => alert('Password reset link sent to your registered Head Office administrator email.')}
            style={{
              all: 'unset',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-brand)',
              alignSelf: 'flex-start',
            }}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

