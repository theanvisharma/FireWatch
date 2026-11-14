import React from 'react';

export function Card({ children, className = '', elevated = false, ...props }) {
  const bgClass = elevated ? 'bg-bg-elevated' : 'bg-bg-card';
  return (
    <div
      className={`${bgClass} border border-border-subtle rounded-card shadow-card transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between pb-4 border-b border-border-subtle mb-4 ${className}`}>
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-text-primary uppercase">{title}</h3>
        {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
