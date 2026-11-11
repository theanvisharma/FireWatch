import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { useNavigate } from 'react-router-dom';
import { MapPin, Maximize2 } from 'lucide-react';
import { RISK_COLORS } from '../../utils/constants';

export function MiniMapCard({ sectors = [] }) {
  const navigate = useNavigate();

  return (
    <Card className="p-5 flex flex-col justify-between overflow-hidden">
      <CardHeader
        title="Geographical Risk Map Preview"
        subtitle="Active surveillance grid coverage"
        action={
          <button
            onClick={() => navigate('/map')}
            className="p-1.5 rounded-lg bg-[#202526] hover:bg-[#2B3031] text-[#D97735] hover:text-[#E69A5C] border border-[#2B3031] transition-colors"
            title="Open Full Map"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        }
      />

      {/* Styled Mock GIS Canvas Preview */}
      <div
        onClick={() => navigate('/map')}
        className="relative h-44 rounded-panel bg-[#141718] border border-[#2B3031] overflow-hidden cursor-pointer group flex items-center justify-center"
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #929A98 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Simulated Sector Radar / Scatter Nodes */}
        <div className="absolute inset-0 p-4">
          {sectors.slice(0, 7).map((sector, idx) => {
            const topPos = 20 + ((idx * 27) % 60);
            const leftPos = 15 + ((idx * 31) % 70);
            const color = RISK_COLORS[sector.risk_level] || '#D97735';
            return (
              <div
                key={sector.id}
                className="absolute flex items-center gap-1.5 transition-transform group-hover:scale-105"
                style={{ top: `${topPos}%`, left: `${leftPos}%` }}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/40 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  <span className="w-1 h-1 rounded-full bg-white/80" />
                </span>
                <span className="text-[9px] font-mono text-[#929A98] bg-[#0D0F10]/80 px-1 py-0.5 rounded border border-[#2B3031]/50 whitespace-nowrap">
                  {sector.risk_score}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Hover pill */}
        <div className="relative z-10 px-3.5 py-1.5 rounded-panel bg-[#202526]/90 border border-[#2B3031] text-xs text-[#F2F2EF] font-medium flex items-center gap-2 group-hover:border-[#D97735] transition-colors shadow-elevated">
          <MapPin className="w-3.5 h-3.5 text-[#D97735]" />
          <span>Launch Interactive Geospatial Map</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#2B3031] flex items-center justify-between text-[11px] text-[#697270]">
        <span>Coverage: 8 Key Ecological Basins</span>
        <span className="font-mono text-[#F2F2EF]">MODIS / VIIRS Active</span>
      </div>
    </Card>
  );
}

