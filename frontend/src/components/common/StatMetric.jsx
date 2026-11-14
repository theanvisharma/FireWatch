import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function StatMetric({
  label,
  value,
  unit = '',
  trend = null,
  trendPositive = true,
  icon: Icon,
  accentColor = null,
  caption = null,
  className = '',
}) {
  return (
    <div
      className={`bg-bg-card border border-border-subtle rounded-card p-4.5 flex flex-col justify-between hover:border-border-hover transition-all duration-150 shadow-card ${className}`}
    >
      <div className="flex items-center justify-between text-text-secondary mb-2">
        <span className="text-[11px] uppercase font-semibold tracking-wider">{label}</span>
        {Icon && (
          <div
            className="w-8 h-8 rounded-panel bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary"
            style={accentColor ? { color: accentColor } : {}}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span
          className="text-2xl font-bold tracking-tight text-text-primary"
          style={accentColor ? { color: accentColor } : {}}
        >
          {value}
        </span>
        {unit && <span className="text-xs text-text-secondary font-medium">{unit}</span>}
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-muted mt-2 pt-2 border-t border-border-subtle/60">
        {caption && <span className="truncate">{caption}</span>}
        {trend && (
          <span
            className={`font-semibold flex items-center gap-0.5 ml-auto text-[11px] ${
              trendPositive ? 'text-[#43A879]' : 'text-[#D95343]'
            }`}
          >
            {trendPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

// Re-export as StatCard as requested in Section 12
export const StatCard = StatMetric;
