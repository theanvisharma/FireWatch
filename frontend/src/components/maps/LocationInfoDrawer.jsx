import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatCoords, formatDateTime } from '../../utils/formatters';
import {
  X,
  Compass,
  Thermometer,
  Wind,
  Droplets,
  Mountain,
  Sprout,
  Activity,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

export function LocationInfoDrawer({ location, onClose }) {
  if (!location) {
    return (
      <Card className="p-5 text-center text-xs text-[#697270] flex flex-col items-center justify-center min-h-[300px]">
        <Compass className="w-8 h-8 mb-2 text-[#2B3031]" />
        <p className="font-medium text-[#929A98]">No Sector Selected</p>
        <p className="text-[11px] mt-1 max-w-[200px]">
          Click on any marker or polygon on the map to inspect localized wildfire risk and telemetry.
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
        <div className="flex items-start justify-between pb-3 border-b border-[#2B3031] mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#D97735] px-1.5 py-0.5 rounded bg-[#202526] border border-[#2B3031]">
                {location.id || location.location_id}
              </span>
              <RiskBadge level={location.risk_level} score={location.risk_score} size="sm" />
            </div>
            <h3 className="text-sm font-bold text-[#F2F2EF] mt-1.5 leading-snug">
              {location.name || location.location_name}
            </h3>
            <p className="text-[11px] text-[#929A98]">{location.region || 'India Sector'}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded text-[#697270] hover:text-[#F2F2EF] hover:bg-[#202526] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Coordinates Banner */}
        <div className="p-2.5 rounded-panel bg-[#202526] border border-[#2B3031] flex items-center justify-between font-mono text-[11px] text-[#929A98] mb-4">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#D97735]" />
            Coordinates:
          </span>
          <span className="text-[#F2F2EF] font-semibold">
            {formatCoords(location.latitude, location.longitude)}
          </span>
        </div>

        {/* Environmental Parameter Grid */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#697270] mb-2">
            Environmental Parameter Summary
          </div>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="p-2 rounded-panel bg-[#141718] border border-[#2B3031]/70 flex items-center gap-2"
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: m.color }} />
                  <div className="min-w-0">
                    <div className="text-[9px] text-[#697270] uppercase truncate">{m.label}</div>
                    <div className="text-xs font-mono font-bold text-[#F2F2EF]">{m.val}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scientific Rationale / Summary */}
        {location.summary && (
          <div className="p-3 rounded-panel bg-[#141718] border border-[#2B3031] text-xs text-[#929A98] mb-3 leading-relaxed">
            <div className="text-[10px] uppercase font-semibold text-[#697270] mb-1">
              Diagnostic Assessment
            </div>
            {location.summary}
          </div>
        )}
      </div>

      {/* Model Horizon & Meta */}
      <div className="pt-3 border-t border-[#2B3031] text-[10px] text-[#697270] space-y-1">
        <div className="flex items-center justify-between">
          <span>Prediction Horizon:</span>
          <span className="font-mono text-[#F2F2EF]">
            {location.prediction_horizon || '24-72 hours'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Model Architecture:</span>
          <span className="font-mono text-[#D97735]">
            {location.model_version || 'v1.0-xgb'}
          </span>
        </div>
      </div>
    </Card>
  );
}

