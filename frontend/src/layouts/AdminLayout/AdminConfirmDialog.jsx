import React from 'react';
import { useTMSAdmin } from '../../context/TMSAdminContext';

export const AdminConfirmDialog = () => {
  const { confirm, setConfirm } = useTMSAdmin();
  if (!confirm) return null;

  return (
    <div
      onClick={() => setConfirm(null)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(20,32,43,.5)',
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-heading)' }}>
          {confirm.title}
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5 }}>
          {confirm.body}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => setConfirm(null)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              height: '36px',
              padding: '0 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-heading)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (confirm.onOk) confirm.onOk();
              setConfirm(null);
            }}
            style={{
              all: 'unset',
              cursor: 'pointer',
              height: '36px',
              padding: '0 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 700,
              background: confirm.danger ? 'var(--kr-red-600)' : 'var(--color-brand)',
              color: '#fff',
            }}
          >
            {confirm.okLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminToast = () => {
  const { toast } = useTMSAdmin();
  if (!toast) return null;

  const bg = toast.tone === 'success' ? 'var(--color-brand)' : toast.tone === 'warning' ? '#7A4300' : toast.tone === 'danger' ? 'var(--kr-red-600)' : 'var(--kr-steel-900)';

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 100,
        backgroundColor: bg,
        color: '#ffffff',
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        animation: 'tmsSlideIn 0.25s ease-out',
      }}
    >
      <div style={{ fontWeight: 800, fontSize: '14px' }}>{toast.title}</div>
      {toast.message && <div style={{ fontSize: '13px', opacity: 0.9 }}>{toast.message}</div>}
    </div>
  );
};

