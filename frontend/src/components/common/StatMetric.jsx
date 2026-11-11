import React from 'react';

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
      className={`bg-[#191D1E] border border-[#2B3031] rounded-panel p-4 flex flex-col justify-between hover:border-[#3D4446] transition-colors ${className}`}
    >
      <div className="flex items-center justify-between text-[#929A98] mb-2">
        <span className="text-xs uppercase font-medium tracking-wider">{label}</span>
        {Icon && (
          <div
            className="w-7 h-7 rounded-lg bg-[#202526] border border-[#2B3031] flex items-center justify-center text-[#929A98]"
            style={accentColor ? { color: accentColor } : {}}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span
          className="text-2xl font-bold tracking-tight text-[#F2F2EF]"
          style={accentColor ? { color: accentColor } : {}}
        >
          {value}
        </span>
        {unit && <span className="text-xs text-[#929A98] font-normal">{unit}</span>}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#697270] mt-1 pt-2 border-t border-[#2B3031]/50">
        {caption && <span>{caption}</span>}
        {trend && (
          <span
            className={`font-medium ml-auto ${
              trendPositive ? 'text-[#43A879]' : 'text-[#D95343]'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

