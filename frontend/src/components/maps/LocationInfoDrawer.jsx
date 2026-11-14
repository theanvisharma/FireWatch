import React from 'react';
import { Card } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatCoords } from '../../utils/formatters';
import {
  X,
  Compass,
  Thermometer,
  Wind,
  Droplets,
  Mountain,
  Sprout,
  Activity,
} from 'lucide-react';

export function LocationInfoDrawer({ location, onClose }) {
  if (!location) {
    return (
      <Card className="p-6 text-center text-xs text-text-muted flex flex-col items-center justify-center min-h-[340px]">
        <Compass className="w-8 h-8 mb-2.5 text-text-muted/40 animate-pulse" />
        <p className="font-semibold text-text-primary text-sm">No Sector Selected</p>
        <p className="text-xs text-text-secondary mt-1.5 max-w-[210px] leading-relaxed">
          Select any marker or polygon on the map to inspect localized wildfire risk, meteorology, and fuel metrics.
        </p>
      </Card>
    );
  }

  const f = location.factors || {};

  const metrics = [
    { label: 'Surface Temp', val: `${f.temperature}°C`, icon: Thermometer, color: '#DB873A' },
    { label: 'Wind Velocity', val: `${f.wind_speed} km/h`, icon: Wind, color: '#D5B34A' },
    { label: 'Soil Moisture', val: `${f.soil_moisture}%`, icon: Mountain, color: '#43A879' },
    { label: 'Rel. Humidity', val: `${f.relative_humidity}%`, icon: Droplets, color: '#43A879' },
    { label: 'Vegetation (NDVI)', val: f.ndvi ?? '0.35', icon: Sprout, color: '#D97735' },
    { label: 'Terrain Slope', val: `${f.slope}°`, icon: Mountain, color: '#929A98' },
  ];

  return (
    <Card className="p-5 shadow-elevated flex flex-col justify-between max-w-sm w-full animate-fade-in">
      <div>
        {/* Drawer Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-border-subtle mb-3.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold text-brand-orange px-1.5 py-0.5 rounded-panel bg-bg-elevated border border-border-subtle">
                {location.id || location.location_id}
              </span>
              <RiskBadge level={location.risk_level} score={location.risk_score} size="sm" />
            </div>
            <h3 className="text-sm font-bold text-text-primary mt-1 leading-snug">
              {location.name || location.location_name}
            </h3>
            <p className="text-[11px] text-text-secondary mt-0.5">{location.region || 'India Sector'}</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-panel text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
              aria-label="Close sector info"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Coordinates Banner */}
        <div className="p-2.5 rounded-panel bg-bg-elevated border border-border-subtle flex items-center justify-between font-mono text-[11px] text-text-secondary mb-4 shadow-subtle">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-orange" />
            Coordinates:
          </span>
          <span className="text-text-primary font-bold">
            {formatCoords(location.latitude, location.longitude)}
          </span>
        </div>

        {/* Environmental Parameter Grid */}
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
            Environmental Parameter Summary
          </div>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="p-2.5 rounded-panel bg-bg-elevated border border-border-subtle flex items-center gap-2.5"
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: m.color }} />
                  <div className="min-w-0">
                    <div className="text-[9px] text-text-muted uppercase font-semibold truncate">{m.label}</div>
                    <div className="text-xs font-mono font-bold text-text-primary">{m.val}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scientific Rationale / Summary */}
        {location.summary && (
          <div className="p-3 rounded-panel bg-bg-elevated border border-border-subtle text-xs text-text-secondary mb-3 leading-relaxed">
            <div className="text-[10px] uppercase font-bold text-text-muted mb-1">
              Diagnostic Assessment
            </div>
            {location.summary}
          </div>
        )}
      </div>

      {/* Model Horizon & Meta */}
      <div className="pt-3 border-t border-border-subtle text-[10px] text-text-muted space-y-1">
        <div className="flex items-center justify-between">
          <span>Prediction Horizon:</span>
          <span className="font-mono text-text-primary font-semibold">
            {location.prediction_horizon || '24-72 hours'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Model Architecture:</span>
          <span className="font-mono text-brand-orange font-semibold">
            {location.model_version || 'v1.0-xgb'}
          </span>
        </div>
      </div>
    </Card>
  );
}
