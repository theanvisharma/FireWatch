import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatCoords } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export function RecentPredictionsTable({ predictions = [] }) {
  const { setSelectedLocation, addToast } = useApp();
  const navigate = useNavigate();

  const handleInspect = (prediction) => {
    setSelectedLocation(prediction);
    addToast(`Selected ${prediction.name || prediction.location_name} for analysis`, 'info');
    navigate('/map');
  };

  return (
    <Card className="p-5">
      <CardHeader
        title="Recent Prediction Activity"
        subtitle="Automated 24–72h forward-looking wildfire ignition risk scores"
        action={
          <button
            type="button"
            onClick={() => navigate('/predictions')}
            className="text-xs text-brand-orange hover:underline flex items-center gap-1 font-semibold transition-colors"
          >
            <span>All Predictions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted uppercase tracking-wider text-[10px]">
              <th className="pb-2.5 font-semibold">Location / Sector</th>
              <th className="pb-2.5 font-semibold">Coordinates</th>
              <th className="pb-2.5 font-semibold">Key Environmental Factors</th>
              <th className="pb-2.5 font-semibold">Predicted Risk</th>
              <th className="pb-2.5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-text-secondary">
            {predictions.slice(0, 5).map((item) => {
              const name = item.name || item.location_name;
              const f = item.factors;
              return (
                <tr key={item.id || item.location_id} className="hover:bg-bg-elevated/50 transition-colors">
                  <td className="py-3">
                    <div className="font-semibold text-text-primary">{name}</div>
                    <div className="text-[10px] text-text-muted">{item.region || 'India Sector'}</div>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-text-muted">
                    {formatCoords(item.latitude, item.longitude)}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#DB873A]">{f.temperature}°C</span>
                      <span className="text-text-muted">/</span>
                      <span className="text-[#D5B34A]">{f.wind_speed}km/h</span>
                      <span className="text-text-muted">/</span>
                      <span className="text-[#43A879]">{f.soil_moisture}% moist</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <RiskBadge level={item.risk_level} score={item.risk_score} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleInspect(item)}
                      className="p-1.5 rounded-panel bg-bg-elevated hover:bg-border-subtle text-text-secondary hover:text-text-primary border border-border-subtle transition-colors"
                      title="Inspect on Risk Map"
                      aria-label="Inspect sector"
                    >
                      <Compass className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
