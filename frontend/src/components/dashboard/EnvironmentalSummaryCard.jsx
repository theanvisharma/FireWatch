import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { Thermometer, Wind, Droplets, Mountain, Gauge } from 'lucide-react';

export function EnvironmentalSummaryCard({ data }) {
  if (!data) return null;

  const items = [
    {
      label: 'Avg Surface Temp',
      value: `${data.avg_temperature}°C`,
      desc: 'Critical flammability threshold >35°C',
      icon: Thermometer,
      color: '#DB873A',
    },
    {
      label: 'Avg Relative Humidity',
      value: `${data.avg_humidity}%`,
      desc: 'Ambient moisture <30% accelerates drying',
      icon: Droplets,
      color: '#43A879',
    },
    {
      label: 'Avg Wind Velocity',
      value: `${data.avg_wind_speed} km/h`,
      desc: 'High velocity funnels chimney air currents',
      icon: Wind,
      color: '#D5B34A',
    },
    {
      label: 'Avg Soil Moisture',
      value: `${data.avg_soil_moisture}%`,
      desc: 'Critical deficit threshold <15%',
      icon: Mountain,
      color: '#B96932',
    },
  ];

  return (
    <Card className="p-5">
      <CardHeader
        title="Environmental Conditions Summary"
        subtitle="Regional physical parameters synthesized across Earth observation layers"
        action={
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-panel bg-bg-elevated border border-border-subtle text-[11px] font-mono text-[#D5B34A]">
            <Gauge className="w-3.5 h-3.5" />
            <span className="font-semibold">KBDI Drought: {data.drought_index_val}</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.label}
              className="p-3.5 rounded-panel bg-bg-elevated border border-border-subtle hover:border-border-hover transition-colors"
            >
              <div className="flex items-center gap-2 text-text-secondary mb-1.5">
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: it.color }} />
                <span className="text-[11px] uppercase font-semibold tracking-wider truncate">{it.label}</span>
              </div>
              <div className="text-xl font-bold text-text-primary font-mono">{it.value}</div>
              <p className="text-[10px] text-text-muted mt-1 leading-tight">{it.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between text-xs text-text-secondary gap-2">
        <span>Regional Drought Stress Classification:</span>
        <span className="font-semibold text-[#D5B34A] px-2 py-0.5 rounded-panel bg-bg-elevated border border-border-subtle font-mono text-[11px]">
          {data.drought_stress_status}
        </span>
      </div>
    </Card>
  );
}
