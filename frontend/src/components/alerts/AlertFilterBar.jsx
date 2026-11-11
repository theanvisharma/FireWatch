import React from 'react';
import { RISK_LEVELS } from '../../utils/constants';
import { Filter, Check } from 'lucide-react';

export function AlertFilterBar({
  selectedSeverity,
  onSelectSeverity,
  showUnreadOnly,
  onToggleUnreadOnly,
  totalCount,
}) {
  const severities = ['All', 'Extreme', 'Very High', 'High', 'Moderate'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-panel bg-[#191D1E] border border-[#2B3031] text-xs">
      {/* Severity Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[#697270] text-[11px] font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Severity:
        </span>
        {severities.map((sev) => {
          const isActive = selectedSeverity === sev;
          return (
            <button
              key={sev}
              onClick={() => onSelectSeverity(sev)}
              className={`px-2.5 py-1 rounded-panel text-[11px] font-medium transition-colors ${
                isActive
                  ? 'bg-[#D97735] text-[#F2F2EF] font-semibold'
                  : 'bg-[#202526] text-[#929A98] hover:text-[#F2F2EF] hover:bg-[#2B3031]'
              }`}
            >
              {sev}
            </button>
          );
        })}
      </div>

      {/* Unread toggle & count */}
      <div className="flex items-center gap-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-[#929A98] hover:text-[#F2F2EF]">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => onToggleUnreadOnly(e.target.checked)}
            className="accent-[#D97735] rounded"
          />
          <span>Unread alerts only</span>
        </label>
        <span className="text-[#697270] font-mono text-[11px]">
          Showing {totalCount} alerts
        </span>
      </div>
    </div>
  );
}

