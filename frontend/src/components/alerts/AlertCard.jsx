import React from 'react';
import { Card } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatTimeAgo, formatCoords } from '../../utils/formatters';
import {
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2,
  Radio,
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
      className={`p-5 transition-all ${
        alert.is_read ? 'opacity-70 bg-[#141718]' : 'bg-[#191D1E] border-l-4 border-l-[#D97735]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] text-[#697270]">{alert.id}</span>
            <RiskBadge level={alert.severity} score={alert.risk_score} size="sm" />
            <span className="text-[10px] text-[#697270] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(alert.timestamp)}
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#F2F2EF]">{alert.location_name}</h4>
          <div className="flex items-center gap-2 text-[11px] text-[#929A98] font-mono mt-0.5">
            <Compass className="w-3 h-3 text-[#697270]" />
            <span>{formatCoords(alert.latitude, alert.longitude)}</span>
            <span className="text-[#697270]">| Radius: {alert.affected_radius_km} km</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleInspectMap}
            className="p-1.5 rounded-lg bg-[#202526] hover:bg-[#2B3031] text-[#929A98] hover:text-[#F2F2EF] border border-[#2B3031] transition-colors"
            title="Locate on Risk Map"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          {!alert.is_read ? (
            <button
              onClick={() => onMarkRead(alert.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-panel text-xs font-medium bg-[#202526] hover:bg-[#2B3031] text-[#F2F2EF] border border-[#2B3031] transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879]" />
              <span>Acknowledge</span>
            </button>
          ) : (
            <span className="text-[11px] text-[#697270] flex items-center gap-1 font-mono px-2 py-1 rounded bg-[#202526]/50">
              <CheckCircle2 className="w-3 h-3 text-[#43A879]" />
              Acknowledged
            </span>
          )}
        </div>
      </div>

      {/* Alert Message */}
      <p className="text-xs text-[#929A98] leading-relaxed mb-4 bg-[#141718] p-3 rounded-panel border border-[#2B3031]/60">
        {alert.message}
      </p>

      {/* Suggested Preventive Action Directives */}
      <div className="pt-3 border-t border-[#2B3031] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-start sm:items-center gap-2 text-[#E69A5C]">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-[#D97735] mt-0.5 sm:mt-0" />
          <span className="font-medium">
            <span className="text-[#929A98]">Action Directive:</span> {alert.preventive_action}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase text-[#697270] tracking-wider">
          Status: {alert.status}
        </span>
      </div>
    </Card>
  );
}

