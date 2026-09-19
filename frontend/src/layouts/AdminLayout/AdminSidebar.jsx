import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTMSAdmin } from '../../context/TMSAdminContext';
import { useAuth } from '../../hooks/useAuth';
import './adminLayout.css';

export const AdminSidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { T, devReqs, drvReqs, approvals, excOverrides, distReview, deleted } = useTMSAdmin();
  const tms = T();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const trips = (tms.trips || []).filter(t => !deleted.includes(t.id));
  const enrouteCount = trips.filter(t => t.status === 'Enroute').length;

  const exceptions = (tms.exceptions || []).map(x => ({ ...x, ...(excOverrides[x.id] || {}) }));
  const openExcCount = exceptions.filter(x => x.status !== 'Resolved').length;

  const distThr = 5;
  const distAll = (tms.distanceChecks || []).map(d => {
    const delta = km => km == null ? null : Math.round((km - d.fixedKm) / d.fixedKm * 1000) / 10;
    const g = delta(d.gpsKm), o = delta(d.odoKm);
    const pct = Math.max(Math.abs(g || 0), Math.abs(o || 0));
    const flagged = pct > distThr;
    const review = flagged ? (distReview[d.id] || d.review || 'Open') : 'Within 5%';
    return { ...d, review };
  });
  const distOpenCount = distAll.filter(d => d.review === 'Open').length;

  const pendingDrivers = [...drvReqs.filter(r => r.status === 'Pending'), ...(tms.drivers || []).filter(d => (approvals[d.id] || d.approval) === 'Pending approval')].length;
  const devPending = devReqs.filter(r => r.status === 'Pending').length;

  const navGroups = [
    {
      group: 'Operations',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Trips', path: '/admin/trips', count: enrouteCount, countBg: 'var(--color-brand)' },
        { label: 'Exceptions', path: '/admin/exceptions', count: openExcCount, countBg: 'var(--kr-red-600)' },
        { label: 'Fleet & GPS', path: '/admin/fleet' },
        { label: 'Distance variation', path: '/admin/distance', count: distOpenCount || null, countBg: 'var(--kr-red-600)' },
        { label: 'Attendance', path: '/admin/attendance' },
      ],
    },
    {
      group: 'Masters',
      items: [
        { label: 'Branches', path: '/admin/masters/branches' },
        { label: 'Supervisors', path: '/admin/masters/supervisors' },
        { label: 'Vehicles', path: '/admin/masters/vehicles' },
        { label: 'Drivers', path: '/admin/masters/drivers', count: pendingDrivers || null, countBg: 'var(--kr-saffron-600)' },
        { label: 'Clients', path: '/admin/masters/clients' },
        { label: 'Loading locations', path: '/admin/masters/locations' },
        { label: 'Routes', path: '/admin/masters/routes' },
      ],
    },
    {
      group: 'Insight',
      items: [
        { label: 'Analytics', path: '/admin/analytics' },
        { label: 'Reports', path: '/admin/reports' },
      ],
    },
    {
      group: 'System',
      items: [
        { label: 'Device approvals', path: '/admin/device-approvals', count: devPending || null, countBg: 'var(--kr-saffron-600)' },
        { label: 'Users & roles', path: '/admin/users' },
        { label: 'Settings', path: '/admin/settings' },
      ],
    },
  ];

  return (
    <nav aria-label="Main" className="tms-sidebar">
      <Link to="/" className="tms-sidebar-brand" onClick={onClose}>
        <img src="/assets/logo-1600.png" alt="Kongunadu Road Lines" />
      </Link>
      <div className="tms-sidebar-kicker">Transport Management</div>

      {navGroups.map((g, gIdx) => (
        <section key={gIdx} className="tms-sidebar-group">
          <div className="tms-sidebar-group-label">{g.group}</div>
          {g.items.map((n, nIdx) => (
            <NavLink
              key={nIdx}
              to={n.path}
              end={n.path === '/admin/dashboard'}
              className={({ isActive }) => `tms-sidebar-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span>{n.label}</span>
              {n.count && (
                <span className="tms-sidebar-badge" style={{ backgroundColor: n.countBg }}>
                  {n.count}
                </span>
              )}
            </NavLink>
          ))}
        </section>
      ))}

      <div className="tms-sidebar-account">
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)' }}>
          {user?.name || 'Head Office Admin'}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          {user?.role || 'Administrator'} · {user?.branch || 'All branches'}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Supervisor App is designed as a standalone mobile application for branch supervisors.');
            }}
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            Supervisor app
          </a>
          <button
            onClick={handleLogout}
            style={{
              all: 'unset',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;
