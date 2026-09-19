import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTMSAdmin, TMSAdminProvider } from '../../context/TMSAdminContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDrawer from './AdminDrawer';
import { AdminConfirmDialog, AdminToast } from './AdminConfirmDialog';
import './adminLayout.css';

const AdminLayoutContent = () => {
  const {
    navOpen,
    setNavOpen,
    globalQ,
    setGlobalQ,
    T,
    navTo,
    width,
  } = useTMSAdmin();

  const narrow = width < 900;
  const tms = T();
  const gq = globalQ.trim().toLowerCase();
  const searching = gq.length > 1;

  const trips = tms.trips || [];
  const vehicles = tms.vehicles || [];
  const drivers = tms.drivers || [];
  const clients = tms.clients || [];

  const searchResults = searching
    ? [
        ...trips
          .filter(t => [t.number, (tms.V[t.vehicle] || {}).number, (tms.D[t.driver] || {}).name].join(' ').toLowerCase().includes(gq))
          .map(t => ({
            kind: 'Trip',
            title: t.number,
            sub: `${(tms.V[t.vehicle] || {}).number || ''} · ${(tms.D[t.driver] || {}).name || ''} · ${t.status}`,
            route: 'trip',
            id: t.id,
          })),
        ...vehicles
          .filter(v => v.number.toLowerCase().includes(gq))
          .map(v => ({
            kind: 'Vehicle',
            title: v.number,
            sub: `${v.type} · ${(tms.B[v.branch] || {}).name || ''}`,
            route: 'vehicles',
            id: v.id,
          })),
        ...drivers
          .filter(d => d.name.toLowerCase().includes(gq))
          .map(d => ({
            kind: 'Driver',
            title: d.name,
            sub: `${(tms.B[d.branch] || {}).name || ''} · ${d.type}`,
            route: 'drivers',
            id: d.id,
          })),
        ...clients
          .filter(c => c.name.toLowerCase().includes(gq))
          .map(c => ({
            kind: 'Client',
            title: c.name,
            sub: `${c.customers} customers`,
            route: 'clients',
            id: c.id,
          })),
      ]
    : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'stretch' }}>
      {/* Mobile Scrim / Desktop Sidebar */}
      {(narrow ? navOpen : true) && (
        <div
          onClick={() => setNavOpen(false)}
          style={{
            position: narrow ? 'fixed' : 'relative',
            inset: 0,
            zIndex: 40,
            background: narrow ? 'rgba(20,32,43,.45)' : 'transparent',
            display: 'flex',
            flex: 'none',
            width: narrow ? 'auto' : '264px',
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AdminSidebar onClose={() => setNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Column */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader onOpenNav={() => setNavOpen(true)} />

        {/* Global Search Overlay */}
        {searching ? (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {searchResults.length} results for &ldquo;{globalQ}&rdquo;
              </div>
              <button
                onClick={() => setGlobalQ('')}
                style={{ all: 'unset', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: 'var(--text-brand)' }}
              >
                Close search
              </button>
            </div>
            {searchResults.map((r, i) => (
              <button
                key={i}
                onClick={() => navTo(r.route, { selectedTrip: r.id })}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  padding: '14px 16px',
                  background: '#fff',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    width: '80px',
                  }}
                >
                  {r.kind}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{r.title}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{r.sub}</span>
              </button>
            ))}
            {searchResults.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', background: '#fff', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--text-heading)' }}>
                  Nothing matches
                </div>
                <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '14px' }}>
                  Search by trip number, vehicle registration, driver or client name.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, boxSizing: 'border-box' }}>
            <Outlet />
          </div>
        )}
      </main>

      {/* Global Slide-In Drawer */}
      <AdminDrawer />

      {/* Global Confirmation Dialog */}
      <AdminConfirmDialog />

      {/* Global Toast Alert */}
      <AdminToast />
    </div>
  );
};

export const AdminLayout = () => {
  return (
    <TMSAdminProvider>
      <AdminLayoutContent />
    </TMSAdminProvider>
  );
};

export default AdminLayout;
