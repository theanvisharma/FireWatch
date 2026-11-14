import React, { useState } from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { Clock, TrendingUp, AlertTriangle, CloudSun } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function OutlookCard({ selectedSector }) {
  const [activeHorizon, setActiveHorizon] = useState('48h');
  const baseRisk = selectedSector?.risk_score || 78;

  // 24h, 48h, 72h multi-horizon synthesized forecast
  const horizons = [
    {
      id: '24h',
      label: '24-Hour Horizon',
      time: '+24 Hours',
      riskScore: Math.min(Math.round(baseRisk * 0.92), 98),
      riskLevel: baseRisk * 0.92 >= 88 ? 'Extreme' : baseRisk * 0.92 >= 75 ? 'Very High' : baseRisk * 0.92 >= 55 ? 'High' : 'Moderate',
      temp: '36.5°C',
      wind: '22 km/h',
      rh: '28%',
      summary: 'Afternoon solar heating creates localized fuel dryness along ridgelines.',
    },
    {
      id: '48h',
      label: '48-Hour Horizon',
      time: '+48 Hours (Peak Vulnerability)',
      riskScore: Math.min(Math.round(baseRisk * 1.05), 98),
      riskLevel: baseRisk * 1.05 >= 88 ? 'Extreme' : baseRisk * 1.05 >= 75 ? 'Very High' : 'High',
      temp: '39.0°C',
      wind: '30 km/h',
      rh: '19%',
      summary: 'Critical wind gusts and moisture drop create apex ignition vulnerability window.',
    },
    {
      id: '72h',
      label: '72-Hour Horizon',
      time: '+72 Hours',
      riskScore: Math.max(Math.round(baseRisk * 0.82), 25),
      riskLevel: baseRisk * 0.82 >= 75 ? 'Very High' : baseRisk * 0.82 >= 55 ? 'High' : baseRisk * 0.82 >= 35 ? 'Moderate' : 'Low',
      temp: '33.2°C',
      wind: '16 km/h',
      rh: '44%',
      summary: 'Expected barometric shift with increased coastal humidity easing flammability.',
    },
  ];

  const current = horizons.find((h) => h.id === activeHorizon) || horizons[1];

  return (
    <Card className="p-5 flex flex-col justify-between">
      <CardHeader
        title="24–72 Hour Risk Outlook"
        subtitle={`Forecasted ignition trajectory for ${selectedSector?.name || 'Western Ghats'}`}
        action={
          <div className="flex items-center gap-1 bg-bg-elevated p-1 rounded-panel border border-border-subtle">
            {horizons.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveHorizon(h.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-panel transition-all duration-150 ${
                  activeHorizon === h.id
                    ? 'bg-bg-card text-brand-orange shadow-subtle border border-border-subtle'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {h.id.toUpperCase()}
              </button>
            ))}
          </div>
        }
      />

      <div className="space-y-4 my-auto">
        <div className="flex items-center justify-between p-3.5 rounded-card bg-bg-elevated border border-border-subtle">
          <div>
            <div className="text-[11px] font-mono text-text-muted mb-0.5">{current.time}</div>
            <div className="text-xl font-bold text-text-primary font-mono">
              {current.riskScore}% <span className="text-xs font-normal text-text-secondary">Ignition Probability</span>
            </div>
          </div>
          <RiskBadge level={current.riskLevel} score={current.riskScore} size="md" />
        </div>

        {/* Environmental Telemetry for this Horizon */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-panel bg-bg-card border border-border-subtle">
            <div className="text-[10px] uppercase font-semibold text-text-muted">Est. Temp</div>
            <div className="text-sm font-bold text-text-primary font-mono mt-0.5">{current.temp}</div>
          </div>
          <div className="p-2 rounded-panel bg-bg-card border border-border-subtle">
            <div className="text-[10px] uppercase font-semibold text-text-muted">Est. Wind</div>
            <div className="text-sm font-bold text-text-primary font-mono mt-0.5">{current.wind}</div>
          </div>
          <div className="p-2 rounded-panel bg-bg-card border border-border-subtle">
            <div className="text-[10px] uppercase font-semibold text-text-muted">Est. Humidity</div>
            <div className="text-sm font-bold text-text-primary font-mono mt-0.5">{current.rh}</div>
          </div>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed bg-bg-card p-3 rounded-panel border border-border-subtle">
          {current.summary}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Refreshed via ECMWF / GFS cycles
        </span>
        <span className="font-mono text-brand-orange font-medium">Model v1.0-xgb</span>
      </div>
    </Card>
  );
}

