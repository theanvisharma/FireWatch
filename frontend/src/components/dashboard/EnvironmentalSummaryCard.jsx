import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { Thermometer, Wind, Droplets, Mountain, Gauge } from 'lucide-react';

export function EnvironmentalSummaryCard({ data }) {
  if (!data) return null;

  const items = [
    {
      label: 'Avg Surface Temp',
      value: `${data.avg_temperature}°C`,
      desc: 'Critical ignition threshold is >35°C',
      icon: Thermometer,
      color: '#DB873A',
    },
    {
      label: 'Avg Relative Humidity',
      value: `${data.avg_humidity}%`,
      desc: 'Ambient moisture below 30% dries fine fuels',
      icon: Droplets,
      color: '#43A879',
    },
    {
      label: 'Avg Wind Velocity',
      value: `${data.avg_wind_speed} km/h`,
      desc: 'High winds accelerate preheating & oxygenation',
      icon: Wind,
      color: '#D5B34A',
    },
    {
      label: 'Avg Soil Moisture',
      value: `${data.avg_soil_moisture}%`,
      desc: 'Severe moisture deficit below 15%',
      icon: Mountain,
      color: '#B96932',
    },
  ];

  return (
    <Card className="p-5">
      <CardHeader
        title="Environmental Condition Summary"
        subtitle="Regional physical parameters synthesized across Earth observation layers"
        action={
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#202526] border border-[#2B3031] text-[11px] font-mono text-[#D5B34A]">
            <Gauge className="w-3 h-3" />
            <span>KBDI: {data.drought_index_val}</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.label}
              className="p-3 rounded-panel bg-[#202526] border border-[#2B3031]/80 hover:border-[#3D4446] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#929A98] mb-1.5">
                <Icon className="w-3.5 h-3.5" style={{ color: it.color }} />
                <span className="text-[11px] uppercase tracking-wider">{it.label}</span>
              </div>
              <div className="text-xl font-bold text-[#F2F2EF] font-mono">{it.value}</div>
              <p className="text-[10px] text-[#697270] mt-1 leading-tight">{it.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#2B3031] flex items-center justify-between text-xs text-[#929A98]">
        <span>Regional Drought Stress:</span>
        <span className="font-semibold text-[#D5B34A]">{data.drought_stress_status}</span>
      </div>
    </Card>
  );
}

