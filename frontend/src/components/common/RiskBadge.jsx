import React from 'react';
import { getRiskStyles } from '../../utils/formatters';

export function RiskBadge({ level = 'Low', score = null, size = 'md', className = '' }) {
  const styles = getRiskStyles(level);

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide transition-colors ${sizeClasses[size]} ${className}`}
      style={{
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: styles.color }}
      />
      <span>{level}</span>
      {score !== null && score !== undefined && (
        <span className="opacity-80 text-[10px] ml-0.5">({Number(score).toFixed(0)}%)</span>
      )}
    </span>
  );
}

