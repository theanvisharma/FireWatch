import React from 'react';

export function LoadingSpinner({ size = 'md', text = 'Loading intelligence telemetry...', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-3 text-[#929A98] ${className}`}>
      <div
        className={`${sizeMap[size]} border-[#2B3031] border-t-[#D97735] rounded-full animate-spin`}
      />
      {text && <p className="text-xs font-mono tracking-wider text-[#697270]">{text}</p>}
    </div>
  );
}

export function EmptyState({ title = 'No data available', description = 'There are no records matching the specified criteria.', icon: Icon, action = null }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#191D1E] border border-[#2B3031] rounded-panel my-4">
      {Icon && (
        <div className="w-10 h-10 rounded-full bg-[#202526] border border-[#2B3031] flex items-center justify-center text-[#697270] mb-3">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-[#F2F2EF] mb-1">{title}</h4>
      <p className="text-xs text-[#929A98] max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

