import React from 'react';
import { useTMSAdmin } from '../../../context/TMSAdminContext';
import TripDetail from './TripDetail';

export const TripList = () => {
  const {
    T,
    tf,
    setTf,
    selectedTrip,
    setSelectedTrip,
    navTo,
    deleted,
    showToast,
  } = useTMSAdmin();

  const tms = T();
  const trips = (tms.trips || []).filter(t => !deleted.includes(t.id)).map(t => {
    const v = tms.V[t.vehicle], d = tms.D[t.driver], c = tms.C[t.client], b = tms.B[t.branch], s = tms.S[t.supervisor];
    const long = t.status === 'Enroute' && t.hoursOpen > 24;
    const gpsBad = (t.flags || []).some(f => /GPS/.test(f));
    const badge = t.status === 'Closed' ? ((t.flags || []).length ? 'Closed · flagged' : 'Closed') : long ? 'Long open' : gpsBad ? 'GPS issue' : t.stage || 'Enroute';
    const badgeColors = {
      'Enroute': ['var(--st-enroute-bg)', 'var(--st-enroute-fg)'],
      'Closed': ['var(--st-closed-bg)', 'var(--st-closed-fg)'],
      'Closed · flagged': ['var(--st-flagged-bg)', 'var(--st-flagged-fg)'],
      'Long open': ['var(--st-long-bg)', 'var(--st-long-fg)'],
      'GPS issue': ['var(--st-gps-bg)', 'var(--st-gps-fg)'],
      'Loading': ['var(--st-loading-bg)', 'var(--st-loading-fg)'],
      'Unloading': ['var(--st-unloading-bg)', 'var(--st-unloading-fg)'],
      'Delayed': ['var(--st-delayed-bg)', 'var(--st-delayed-fg)'],
    };
    const [badgeBg, badgeFg] = badgeColors[badge] || ['var(--kr-grey-100)', 'var(--kr-grey-700)'];
    const flags = t.flags || [];
    return {
      ...t,
      vehicleNumber: v ? v.number : '—',
      driverName: d ? d.name : '—',
      clientName: c ? c.name : '—',
      branchName: b ? b.name : '—',
      supervisorName: s ? s.name : '—',
      badge,
      badgeBg,
      badgeFg,
      typeLabel: t.type + (t.reason ? ' · ' + t.reason : ''),
      flagText: flags.join(', ') || '—',
      flagColor: flags.length ? '#7A4300' : 'var(--text-muted)',
      hasFlags: flags.length > 0,
    };
  });

  const q = (tf.q || '').toLowerCase();
  const tripMatch = (t, ignoreStatus) =>
    (!tf.branch || t.branch === tf.branch) &&
    (ignoreStatus || !tf.status || t.status === tf.status) &&
    (!tf.type || t.type === tf.type) &&
    (!tf.flag || (tf.flag === 'flagged' ? t.hasFlags : !t.hasFlags)) &&
    (!q || [t.number, t.vehicleNumber, t.driverName, t.clientName, t.unloading].join(' ').toLowerCase().includes(q));

  const tripRows = trips.filter(t => tripMatch(t, false));
  const statusPool = trips.filter(t => tripMatch(t, true));

  const branchOptions = (tms.branches || []).map(b => ({ value: b.id, label: b.name }));
  const statusOptions = [{ value: 'Enroute', label: 'Enroute' }, { value: 'Closed', label: 'Closed' }];
  const typeOptions = [{ value: 'Business', label: 'Business' }, { value: 'Non-Business', label: 'Non-Business' }];
  const flagOptions = [{ value: 'flagged', label: 'Flagged only' }, { value: 'clean', label: 'No flags' }];

  const tripCols = ['Trip number', 'Branch', 'Vehicle', 'Driver', 'Client · unloading', 'Type', 'Opened', 'Status', 'Flags'];
  const tripEnrouteCount = tripRows.filter(t => t.status === 'Enroute').length;

  const clearTf = () => setTf({ branch: '', status: '', type: '', flag: '', q: '' });

  const exportTrips = () => {
    showToast('success', 'Export started', `${tripRows.length} trips · Excel will download shortly.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Filters Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          background: '#fff',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
        }}
      >
        <div style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Branch</label>
          <select
            value={tf.branch || ''}
            onChange={(e) => setTf({ ...tf, branch: e.target.value })}
            style={{ height: '40px', padding: '0 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '14px' }}
          >
            <option value="">All branches</option>
            {branchOptions.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>

        <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</label>
          <select
            value={tf.status || ''}
            onChange={(e) => setTf({ ...tf, status: e.target.value })}
            style={{ height: '40px', padding: '0 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '14px' }}
          >
            <option value="">All statuses</option>
            {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Type</label>
          <select
            value={tf.type || ''}
            onChange={(e) => setTf({ ...tf, type: e.target.value })}
            style={{ height: '40px', padding: '0 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '14px' }}
          >
            <option value="">All types</option>
            {typeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Flags</label>
          <select
            value={tf.flag || ''}
            onChange={(e) => setTf({ ...tf, flag: e.target.value })}
            style={{ height: '40px', padding: '0 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '14px' }}
          >
            <option value="">Any</option>
            {flagOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Search</label>
          <input
            type="text"
            placeholder="Trip no., vehicle, driver"
            value={tf.q || ''}
            onChange={(e) => setTf({ ...tf, q: e.target.value })}
            style={{ height: '40px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '14px' }}
          />
        </div>

        <button
          type="button"
          onClick={clearTf}
          style={{ all: 'unset', cursor: 'pointer', height: '40px', padding: '0 16px', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)' }}
        >
          Clear
        </button>
      </div>

      {/* Table Container */}
      <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 18px', borderBottom: '1px solid var(--border-default)', gap: '12px', flexWrap: 'wrap' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: '', label: 'All', count: statusPool.length },
              { id: 'Enroute', label: 'Enroute', count: statusPool.filter(t => t.status === 'Enroute').length },
              { id: 'Closed', label: 'Closed', count: statusPool.filter(t => t.status === 'Closed').length },
            ].map(tab => {
              const on = (tf.status || '') === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTf({ ...tf, status: tab.id })}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderBottom: `3px solid ${on ? 'var(--color-brand)' : 'transparent'}`,
                    color: on ? 'var(--color-brand)' : 'var(--text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {tab.label}
                  <span style={{ fontSize: '12px', opacity: 0.8 }}>({tab.count})</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 0', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-heading)' }}>{tripRows.length}</strong> trips · {tripEnrouteCount} enroute
            </span>
            <button
              onClick={exportTrips}
              style={{
                all: 'unset',
                cursor: 'pointer',
                height: '32px',
                padding: '0 12px',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: 'var(--color-brand)',
                border: '1px solid var(--color-brand)',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '960px' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: 'var(--surface-muted)' }}>
                {tripCols.map((c, i) => (
                  <th key={i} style={{ padding: '10px 14px', fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tripRows.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => {
                    setSelectedTrip(t.id);
                    navTo('trip', { selectedTrip: t.id });
                  }}
                  style={{ cursor: 'pointer', borderTop: '1px solid var(--border-default)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-muted)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
                    {t.number}
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{t.branchName}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: 'var(--text-heading)', fontWeight: 600 }}>{t.vehicleNumber}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{t.driverName}</td>
                  <td style={{ padding: '12px 14px', maxWidth: '260px' }}>
                    <span style={{ display: 'block', color: 'var(--text-heading)' }}>{t.clientName}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.unloading}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{t.typeLabel}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{t.opened}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        background: t.badgeBg,
                        color: t.badgeFg,
                      }}
                    >
                      {t.badge}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: t.flagColor, whiteSpace: 'nowrap' }}>
                    {t.flagText}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tripRows.length === 0 && (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--text-heading)' }}>
              No trips match these filters
            </div>
            <p style={{ margin: '6px 0 16px', color: 'var(--text-muted)', fontSize: '14px' }}>
              Every recorded movement is kept. Try widening the branch, status or type filter.
            </p>
            <button
              onClick={clearTf}
              style={{ all: 'unset', cursor: 'pointer', padding: '0 18px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--color-brand-tint)', color: 'var(--color-brand)', fontWeight: 700, fontSize: '14px' }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border-default)', fontSize: '13px', color: 'var(--text-muted)' }}>
          <span>Showing {tripRows.length} of {tripRows.length}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button disabled style={{ all: 'unset', opacity: 0.5, padding: '0 8px', height: '28px' }}>Previous</button>
            <button disabled style={{ all: 'unset', opacity: 0.5, padding: '0 8px', height: '28px' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripList;
