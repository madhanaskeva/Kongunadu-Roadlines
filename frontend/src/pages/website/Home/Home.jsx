import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin, Truck, CheckCircle, BarChart3, AlertTriangle } from 'lucide-react';
import Button from '../../../components/common/Button';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section matching prototype / screenshot */}
      <section
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '48px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Brand Logo & Tagline */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '32px',
          }}
        >
          <img
            src="/assets/logo-1600.png"
            alt="Kongunadu Road Lines"
            style={{ width: 'min(540px, 84vw)', height: 'auto' }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(12px, 1.3vw, 15px)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--kr-grey-700)',
            }}
          >
            <span style={{ width: '40px', height: '3px', backgroundColor: 'var(--kr-red-600)' }} />
            Fueling a better tomorrow
            <span style={{ width: '40px', height: '3px', backgroundColor: 'var(--kr-red-600)' }} />
          </div>
        </div>

        {/* Scene with Hero Tanker Image & Swoosh Curves */}
        <div style={{ position: 'relative', width: '100%', marginTop: '20px' }}>
          <img
            src="/assets/hero-scene.jpg"
            alt="Kongunadu Road Lines Tanker Truck"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: '460px',
              objectFit: 'cover',
              objectPosition: '50% 60%',
            }}
          />
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              left: 0,
              bottom: '-1px',
              width: '100%',
              height: '8vw',
              pointerEvents: 'none',
            }}
          >
            <path d="M0 64 C 360 150, 1080 196, 1440 96 L1440 200 L0 200 Z" fill="#ffffff" />
            <path
              d="M0 50 C 360 138, 1080 184, 1440 82"
              fill="none"
              stroke="var(--kr-red-600)"
              strokeWidth="5"
            />
            <path
              d="M0 64 C 360 150, 1080 196, 1440 96"
              fill="none"
              stroke="#9FCFC0"
              strokeWidth="8"
            />
          </svg>
        </div>

        {/* Welcome Back Action Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: 'calc(100% - 32px)',
            maxWidth: '560px',
            marginTop: '-4.5vw',
            padding: '36px 40px 40px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '32px',
              color: 'var(--kr-green-900)',
              letterSpacing: '-0.01em',
            }}
          >
            Welcome Back
          </h1>
          <p style={{ margin: '-6px 0 10px', fontSize: '16px', color: 'var(--text-muted)' }}>
            Choose where you want to sign in
          </p>

          {/* Open Supervisor App Button */}
          <button
            onClick={() => alert('The Supervisor App is designed as a standalone mobile application for branch supervisors.')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 22px',
              backgroundColor: 'var(--color-brand)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background var(--dur-fast), transform var(--dur-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand-strong)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>
                Open Supervisor App
              </div>
              <small style={{ fontSize: '13px', opacity: 0.85 }}>Mobile app · branch supervisors</small>
            </div>
            <ArrowRight size={22} />
          </button>

          {/* Open Admin Portal Button */}
          <Link
            to="/admin/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 22px',
              backgroundColor: '#ffffff',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              textAlign: 'left',
              transition: 'background var(--dur-fast), transform var(--dur-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand-tint)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>
                Open Admin Portal
              </div>
              <small style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Web portal · Head Office</small>
            </div>
            <ArrowRight size={22} />
          </Link>
        </div>

        {/* Motto Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--kr-grey-700)',
          }}
        >
          <span style={{ width: '48px', height: '1px', backgroundColor: 'var(--border-strong)' }} />
          Safe • Reliable • On time
          <span style={{ width: '48px', height: '1px', backgroundColor: 'var(--border-strong)' }} />
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-brand)',
              marginBottom: '8px',
            }}
          >
            Transport Management System · Phase 1
          </div>
          <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: 'var(--text-heading)' }}>
            Digitizing 700+ Fleet Operations
          </h2>
          <p style={{ margin: '12px auto 0', maxWidth: '640px', fontSize: '16px', color: 'var(--text-muted)' }}>
            Real-time triple distance validation (Fixed route vs GPS vs Odometer) to prevent revenue leakage and automate trip tracking.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
            <ShieldCheck size={32} color="var(--color-brand)" style={{ marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 800 }}>Triple Distance Verification</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Automatic variance detection comparing Google Maps fixed corridor, live GPS pings, and supervisor odometer readings.
            </p>
          </div>

          <div style={{ padding: '24px', backgroundColor: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
            <AlertTriangle size={32} color="var(--kr-saffron-500)" style={{ marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 800 }}>Exception Resolution Controller</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Identify hidden kilometres between consecutive trips, route diversions, radius breaches, and long-open trips.
            </p>
          </div>

          <div style={{ padding: '24px', backgroundColor: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
            <BarChart3 size={32} color="var(--kr-green-600)" style={{ marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 800 }}>Executive Analytics & Reports</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Replace error-prone Excel spreadsheets with automated daily billing logs, driver rosters, and branch scorecards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

