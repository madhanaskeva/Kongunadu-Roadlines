import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No items found',
  message = 'There is no data to show for this section yet.',
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--surface-muted)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--text-muted)',
          marginBottom: '16px',
        }}
      >
        <Icon size={28} />
      </div>
      <h4
        style={{
          margin: '0 0 6px',
          fontSize: '17px',
          fontWeight: 800,
          color: 'var(--text-heading)',
        }}
      >
        {title}
      </h4>
      <p
        style={{
          margin: '0 0 20px',
          fontSize: '14px',
          color: 'var(--text-muted)',
          maxWidth: '380px',
        }}
      >
        {message}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

