import React from 'react';
import { Filter } from 'lucide-react';

export function AlertFilterBar({
  selectedSeverity,
  onSelectSeverity,
  showUnreadOnly,
  onToggleUnreadOnly,
  totalCount,
}) {
  const severities = ['All', 'Extreme', 'Very High', 'High', 'Moderate'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-card bg-bg-card border border-border-subtle text-xs shadow-card transition-colors">
      {/* Severity Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-text-muted text-[11px] font-semibold mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Severity:
        </span>
        {severities.map((sev) => {
          const isActive = selectedSeverity === sev;
          return (
            <button
              key={sev}
              type="button"
              onClick={() => onSelectSeverity(sev)}
              className={`px-3 py-1 rounded-panel text-[11px] font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-brand-orange text-white shadow-subtle'
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-border-subtle border border-border-subtle'
              }`}
            >
              {sev}
            </button>
          );
        })}
      </div>

      {/* Unread toggle & count */}
      <div className="flex items-center gap-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary font-medium">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => onToggleUnreadOnly(e.target.checked)}
            className="accent-brand-orange rounded cursor-pointer"
          />
          <span>Unread alerts only</span>
        </label>
        <span className="text-text-muted font-mono text-[11px]">
          Showing {totalCount} alerts
        </span>
      </div>
    </div>
  );
}
