import React from 'react';
import { getRiskStyles } from '../../utils/formatters';

export function RiskBadge({ level = 'Low', score = null, size = 'md', className = '' }) {
  const styles = getRiskStyles(level);

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5 font-medium',
    lg: 'text-sm px-3.5 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors ${sizeClasses[size]} ${className}`}
      style={{
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: styles.color }}
      />
      <span className="font-semibold">{level}</span>
      {score !== null && score !== undefined && (
        <span className="opacity-90 text-[10px] ml-0.5 font-mono">
          ({Number(score).toFixed(0)}%)
        </span>
      )}
    </span>
  );
}
