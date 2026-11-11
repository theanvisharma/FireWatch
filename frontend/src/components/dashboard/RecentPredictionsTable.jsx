import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatTimeAgo, formatCoords } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight, Compass } from 'lucide-react';

export function RecentPredictionsTable({ predictions = [] }) {
  const { setSelectedLocation, addToast } = useApp();
  const navigate = useNavigate();

  const handleInspect = (prediction) => {
    setSelectedLocation(prediction);
    addToast(`Selected ${prediction.name || prediction.location_name} for geospatial analysis`, 'info');
    navigate('/map');
  };

  return (
    <Card className="p-5">
      <CardHeader
        title="Recent Prediction Activity"
        subtitle="Automated 24-72h forward-looking wildfire ignition risk scores"
        action={
          <button
            onClick={() => navigate('/map')}
            className="text-xs text-[#D97735] hover:text-[#E69A5C] flex items-center gap-1 font-medium transition-colors"
          >
            <span>Full Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2B3031] text-[#697270] uppercase tracking-wider text-[10px]">
              <th className="pb-2.5 font-semibold">Location / Sector</th>
              <th className="pb-2.5 font-semibold">Coordinates</th>
              <th className="pb-2.5 font-semibold">Key Factors</th>
              <th className="pb-2.5 font-semibold">Predicted Risk</th>
              <th className="pb-2.5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2B3031]/50 text-[#929A98]">
            {predictions.slice(0, 4).map((item) => {
              const name = item.name || item.location_name;
              const f = item.factors;
              return (
                <tr key={item.id || item.location_id} className="hover:bg-[#202526]/50 transition-colors">
                  <td className="py-3">
                    <div className="font-semibold text-[#F2F2EF]">{name}</div>
                    <div className="text-[10px] text-[#697270]">{item.region || 'India Sector'}</div>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-[#697270]">
                    {formatCoords(item.latitude, item.longitude)}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#DB873A]">{f.temperature}°C</span>
                      <span className="text-[#697270]">/</span>
                      <span className="text-[#D5B34A]">{f.wind_speed}km/h</span>
                      <span className="text-[#697270]">/</span>
                      <span className="text-[#43A879]">{f.soil_moisture}% moist</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <RiskBadge level={item.risk_level} score={item.risk_score} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleInspect(item)}
                      className="p-1.5 rounded-lg bg-[#202526] hover:bg-[#2B3031] text-[#929A98] hover:text-[#F2F2EF] border border-[#2B3031] transition-colors"
                      title="Inspect on Risk Map"
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

