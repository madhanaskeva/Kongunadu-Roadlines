import React from 'react';
import EmptyState from './EmptyState';
import Loader from './Loader';

export const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = 'No records found',
  emptyMessage = 'There are no items matching your criteria.',
  onRowClick,
}) => {
  if (loading) {
    return <Loader message="Fetching table records…" />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: 'var(--surface-muted)',
              borderBottom: '1px solid var(--border-default)',
            }}
          >
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  padding: '12px 16px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  ...col.headerStyle,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={row.id || rowIdx}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                borderBottom: rowIdx === data.length - 1 ? 'none' : '1px solid var(--border-default)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background-color var(--dur-fast)',
              }}
              onMouseEnter={(e) => {
                if (onRowClick) e.currentTarget.style.backgroundColor = 'var(--surface-muted)';
              }}
              onMouseLeave={(e) => {
                if (onRowClick) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={col.key || colIdx}
                  style={{
                    padding: '14px 16px',
                    color: 'var(--text-body)',
                    verticalAlign: 'middle',
                    ...col.cellStyle,
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

