import React from 'react';
import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';
import { Button } from './Button';

export function LoadingSpinner({
  size = 'md',
  text = 'Loading intelligence telemetry...',
  className = '',
}) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-3 text-text-secondary ${className}`}>
      <div
        className={`${sizeMap[size]} border-border-subtle border-t-brand-orange rounded-full animate-spin`}
      />
      {text && <p className="text-xs font-mono tracking-wider text-text-muted">{text}</p>}
    </div>
  );
}

export const LoadingState = LoadingSpinner;

export function EmptyState({
  title = 'No records found',
  description = 'There are no active observations matching the specified criteria.',
  icon: Icon = Inbox,
  action = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-bg-card border border-border-subtle rounded-card my-4 shadow-subtle ${className}`}>
      <div className="w-10 h-10 rounded-panel bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-muted mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-xs text-text-secondary max-w-sm mb-4 leading-relaxed">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  title = 'Failed to load telemetry',
  message = 'An error occurred while connecting to the intelligence backend.',
  onRetry = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-bg-card border border-risk-veryHigh/20 rounded-card my-4 ${className}`}>
      <div className="w-10 h-10 rounded-panel bg-risk-veryHigh/10 border border-risk-veryHigh/20 flex items-center justify-center text-risk-veryHigh mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-xs text-text-secondary max-w-sm mb-4 font-mono leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={onRetry}>
          Retry Connection
        </Button>
      )}
    </div>
  );
}
