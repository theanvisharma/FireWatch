import React from 'react';
import { Card } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatTimeAgo, formatCoords } from '../../utils/formatters';
import {
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function AlertCard({ alert, onMarkRead }) {
  const navigate = useNavigate();
  const { setSelectedLocation, addToast } = useApp();

  const handleInspectMap = () => {
    setSelectedLocation({
      id: alert.location_id,
      name: alert.location_name,
      latitude: alert.latitude,
      longitude: alert.longitude,
      risk_score: alert.risk_score,
      risk_level: alert.severity,
      factors: {
        temperature: 38,
        wind_speed: 25,
        rainfall: 0,
        soil_moisture: 14,
        relative_humidity: 25,
        ndvi: 0.25,
        slope: 18,
      },
      summary: alert.message,
    });
    addToast(`Focusing map on ${alert.location_name}`, 'info');
    navigate('/map');
  };

  return (
    <Card
      className={`p-5 transition-all duration-150 ${
        alert.is_read
          ? 'opacity-70 bg-bg-card'
          : 'bg-bg-card border-l-4 border-l-brand-orange shadow-card'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-bg-elevated border border-border-subtle">
              {alert.id}
            </span>
            <RiskBadge level={alert.severity} score={alert.risk_score} size="sm" />
            <span className="text-[10px] text-text-muted flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(alert.timestamp)}
            </span>
          </div>
          <h4 className="text-sm font-bold text-text-primary">{alert.location_name}</h4>
          <div className="flex items-center gap-2 text-[11px] text-text-secondary font-mono mt-0.5">
            <Compass className="w-3 h-3 text-text-muted" />
            <span>{formatCoords(alert.latitude, alert.longitude)}</span>
            <span className="text-text-muted">| Radius: {alert.affected_radius_km} km</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={handleInspectMap}
            className="p-1.5 rounded-panel bg-bg-elevated hover:bg-border-subtle text-text-secondary hover:text-text-primary border border-border-subtle transition-colors"
            title="Locate on Risk Map"
            aria-label="Locate on map"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          {!alert.is_read ? (
            <button
              type="button"
              onClick={() => onMarkRead(alert.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-panel text-xs font-semibold bg-bg-elevated hover:bg-border-subtle text-text-primary border border-border-subtle transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879]" />
              <span>Acknowledge</span>
            </button>
          ) : (
            <span className="text-[11px] text-text-muted flex items-center gap-1 font-mono px-2 py-1 rounded bg-bg-elevated border border-border-subtle">
              <CheckCircle2 className="w-3 h-3 text-[#43A879]" />
              Acknowledged
            </span>
          )}
        </div>
      </div>

      {/* Alert Description Message */}
      <p className="text-xs text-text-secondary leading-relaxed mb-4 bg-bg-elevated p-3 rounded-panel border border-border-subtle">
        {alert.message}
      </p>

      {/* Action Directive */}
      <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-start sm:items-center gap-2 text-brand-orange">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-brand-orange mt-0.5 sm:mt-0" />
          <span className="font-semibold text-text-primary text-[11px]">
            <span className="text-text-muted font-normal">Action Directive:</span> {alert.preventive_action}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase text-text-muted font-medium tracking-wider">
          Status: {alert.status}
        </span>
      </div>
    </Card>
  );
}
