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
        title="Wildfire Risk Overview Map"
        subtitle="Active surveillance grid coverage and hot spot radar"
        action={
          <button
            type="button"
            onClick={() => navigate('/map')}
            className="p-1.5 rounded-panel bg-bg-elevated hover:bg-border-subtle text-brand-orange hover:text-brand-hover border border-border-subtle transition-colors"
            title="Open Interactive Risk Map"
            aria-label="Expand map"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        }
      />

      {/* Styled GIS Canvas Preview */}
      <div
        onClick={() => navigate('/map')}
        className="relative h-44 rounded-card bg-bg-elevated border border-border-subtle overflow-hidden cursor-pointer group flex items-center justify-center transition-all"
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
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
                  className="w-3 h-3 rounded-full border border-black/30 flex items-center justify-center shadow-subtle"
                  style={{ backgroundColor: color }}
                >
                  <span className="w-1 h-1 rounded-full bg-white/90" />
                </span>
                <span className="text-[9px] font-mono font-medium text-text-secondary bg-bg-card/90 px-1 py-0.5 rounded border border-border-subtle whitespace-nowrap shadow-subtle">
                  {sector.risk_score}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Hover Launch Action Button */}
        <div className="relative z-10 px-4 py-2 rounded-panel bg-bg-card/95 border border-border-subtle text-xs text-text-primary font-semibold flex items-center gap-2 group-hover:border-brand-orange transition-all shadow-elevated">
          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
          <span>Launch Full Interactive Map</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
        <span>Coverage: 8 Key Ecological Basins</span>
        <span className="font-mono text-text-primary font-medium">MODIS / VIIRS Live</span>
      </div>
    </Card>
  );
}
