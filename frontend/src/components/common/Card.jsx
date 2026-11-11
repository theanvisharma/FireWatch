import React from 'react';

export function Card({ children, className = '', elevated = false, ...props }) {
  const bgClass = elevated ? 'bg-[#202526]' : 'bg-[#191D1E]';
  return (
    <div
      className={`${bgClass} border border-[#2B3031] rounded-panel shadow-subtle ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between pb-4 border-b border-[#2B3031] mb-4 ${className}`}>
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-[#F2F2EF] uppercase">{title}</h3>
        {subtitle && <p className="text-xs text-[#929A98] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

