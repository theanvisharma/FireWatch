import React from 'react';
import { RISK_COLORS } from '../../utils/constants';
import { Layers, Eye } from 'lucide-react';

export function MapLegend({
  layers = { polygons: true, markers: true, hotspots: true },
  onToggleLayer = () => {},
}) {
  const levels = [
    { label: 'Low (<35%)', color: RISK_COLORS.Low },
    { label: 'Moderate (35-54%)', color: RISK_COLORS.Moderate },
    { label: 'High (55-74%)', color: RISK_COLORS.High },
    { label: 'Very High (75-87%)', color: RISK_COLORS['Very High'] },
    { label: 'Extreme (>=88%)', color: RISK_COLORS.Extreme },
  ];

  return (
    <div className="bg-[#191D1E]/95 border border-[#2B3031] rounded-panel p-3.5 shadow-elevated text-xs backdrop-blur-md max-w-[220px]">
      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[#2B3031] text-[11px] font-semibold text-[#F2F2EF] uppercase tracking-wider">
        <Layers className="w-3.5 h-3.5 text-[#D97735]" />
        <span>Wildfire Severity Scale</span>
      </div>

      <div className="space-y-1.5 mb-3">
        {levels.map((lvl) => (
          <div key={lvl.label} className="flex items-center justify-between text-[11px] text-[#929A98]">
            <span className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/30"
                style={{ backgroundColor: lvl.color }}
              />
              <span>{lvl.label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#2B3031]">
        <div className="text-[10px] text-[#697270] uppercase font-semibold mb-1.5 tracking-wider">
          Active Map Layers
        </div>
        <div className="space-y-1 text-[11px]">
          <label className="flex items-center justify-between cursor-pointer text-[#929A98] hover:text-[#F2F2EF]">
            <span>Risk Zone Polygons</span>
            <input
              type="checkbox"
              checked={layers.polygons}
              onChange={() => onToggleLayer('polygons')}
              className="accent-[#D97735] rounded"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer text-[#929A98] hover:text-[#F2F2EF]">
            <span>Sector Markers</span>
            <input
              type="checkbox"
              checked={layers.markers}
              onChange={() => onToggleLayer('markers')}
              className="accent-[#D97735] rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

