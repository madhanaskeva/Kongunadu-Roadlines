import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTMSAdmin } from '../../context/TMSAdminContext';
import { Menu } from 'lucide-react';

export const AdminHeader = ({ onOpenNav }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    devReqs,
    adminNotifOpen,
    setAdminNotifOpen,
    fmtPhone,
    fmtImei,
    setDrawer,
    setForm,
    setFormError,
    T,
  } = useTMSAdmin();

  const devPending = devReqs.filter(r => r.status === 'Pending');
  const devPendingCount = devPending.length;
  const devNotifSummary = devPendingCount ? `${devPendingCount} new` : 'Up to date';

  const getPageMeta = () => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) return { crumb: 'Operations', title: 'Operations dashboard' };
    if (path.includes('/admin/trips')) return { crumb: 'Operations', title: 'Trips' };
    if (path.includes('/admin/exceptions')) return { crumb: 'Operations', title: 'Exceptions & irregularities' };
    if (path.includes('/admin/fleet')) return { crumb: 'Operations', title: 'Fleet & GPS monitor' };
    if (path.includes('/admin/distance')) return { crumb: 'Operations', title: 'Distance variation' };
    if (path.includes('/admin/attendance')) return { crumb: 'Operations', title: 'Attendance' };
    if (path.includes('/admin/masters/branches')) return { crumb: 'Masters', title: 'Branch Master' };
    if (path.includes('/admin/masters/supervisors')) return { crumb: 'Masters', title: 'Supervisor Master' };
    if (path.includes('/admin/masters/vehicles')) return { crumb: 'Masters', title: 'Vehicle Master' };
    if (path.includes('/admin/masters/drivers')) return { crumb: 'Masters', title: 'Driver Master' };
    if (path.includes('/admin/masters/clients')) return { crumb: 'Masters', title: 'Client Master' };
    if (path.includes('/admin/masters/locations')) return { crumb: 'Masters', title: 'Loading Location Master' };
    if (path.includes('/admin/masters/routes')) return { crumb: 'Masters', title: 'Route Master' };
    if (path.includes('/admin/analytics')) return { crumb: 'Insight', title: 'Analytics' };
    if (path.includes('/admin/reports')) return { crumb: 'Insight', title: 'Reports & export' };
    if (path.includes('/admin/device-approvals')) return { crumb: 'System', title: 'Device approvals' };
    if (path.includes('/admin/users')) return { crumb: 'System', title: 'Users & roles' };
    if (path.includes('/admin/settings')) return { crumb: 'System', title: 'Settings' };
    return { crumb: 'Operations', title: 'Operations dashboard' };
  };

  const meta = getPageMeta();

  const composeNotice = () => {
    setAdminNotifOpen(false);
    setFormError('');
    setForm({ branch: 'B01', priority: 'Normal', title: '', body: '' });
    setDrawer({
      isForm: true,
      isNotice: true,
      kicker: 'Notify supervisors',
      title: 'Send notice',
      saveLabel: 'Send notice',
      required: ['branch', 'title', 'body'],
      fields: [
        ['branch', 'Send to', [{ value: 'all', label: 'All branches' }, ...(T().branches || []).filter(b => b.status === 'Active').map(b => ({ value: b.id, label: b.name + ' supervisors' }))]],
        ['priority', 'Priority', ['Normal', 'Urgent']],
        ['title', 'Subject', null, 'e.g. Photograph every diesel slip'],
        ['body', 'Message', 'textarea', 'What should supervisors know or do?']
      ]
    });
  };

  const openDeviceApprovals = () => {
    setAdminNotifOpen(false);
    navigate('/admin/device-approvals');
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 24px',
          height: '60px',
          background: '#fff',
          borderBottom: '1px solid var(--border-default)',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >


        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {meta.crumb}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '18px',
              letterSpacing: '-0.01em',
              color: 'var(--text-heading)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {meta.title}
          </h1>
        </div>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--kr-green-600)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--kr-green-600)',
            }}
          />
          Live
        </span>

        <button
          onClick={composeNotice}
          title="Send a notice to supervisors"
          style={{
            all: 'unset',
            cursor: 'pointer',
            flex: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '36px',
            padding: '0 12px',
            boxSizing: 'border-box',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-strong)',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text-heading)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
          <span>Send notice</span>
        </button>

        <div style={{ position: 'relative', flex: 'none' }}>
          <button
            onClick={() => setAdminNotifOpen(!adminNotifOpen)}
            aria-label="Notifications"
            aria-expanded={adminNotifOpen}
            style={{
              all: 'unset',
              cursor: 'pointer',
              position: 'relative',
              width: '40px',
              height: '40px',
              display: 'grid',
              placeItems: 'center',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-heading)',
              background: adminNotifOpen ? 'var(--surface-muted)' : 'transparent',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {devPendingCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  right: '2px',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 4px',
                  boxSizing: 'border-box',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '999px',
                  border: '2px solid #fff',
                  background: 'var(--kr-red-600)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '10px',
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {devPendingCount}
              </span>
            )}
          </button>

          {adminNotifOpen && (
            <div
              role="dialog"
              aria-label="Notifications"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '360px',
                maxWidth: 'calc(100vw - 32px)',
                background: '#fff',
                border: '1px solid var(--border-default)',
                borderTop: '4px solid var(--color-brand)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden',
                zIndex: 35,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border-default)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '17px',
                    color: 'var(--text-heading)',
                  }}
                >
                  Notifications
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {devNotifSummary}
                </span>
              </div>

              {devPending.map((n) => (
                <button
                  key={n.id}
                  onClick={openDeviceApprovals}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-default)',
                  }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: '10px',
                      height: '10px',
                      marginTop: '5px',
                      borderRadius: '50%',
                      background: 'var(--color-hazard)',
                    }}
                  />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)' }}>
                      New approval requested
                    </span>
                    <span style={{ display: 'block', marginTop: '2px', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-muted)' }}>
                      +91 {fmtPhone(n.phone)}
                      <br />
                      IMEI <span style={{ fontFamily: 'var(--font-mono)' }}>{fmtImei(n.imei)}</span>
                    </span>
                  </span>
                  <span style={{ flex: 'none', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {n.requestedAt}
                  </span>
                </button>
              ))}

              {devPending.length === 0 && (
                <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                  No new approval requests.
                </div>
              )}

              <button
                onClick={openDeviceApprovals}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  width: '100%',
                  display: 'block',
                  padding: '12px 16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-brand)',
                }}
              >
                View device approvals
              </button>
            </div>
          )}
        </div>
      </header>

      {adminNotifOpen && (
        <div
          onClick={() => setAdminNotifOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 25 }}
        />
      )}
    </>
  );
};

export default AdminHeader;
