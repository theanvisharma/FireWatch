import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatTimeAgo } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ActiveAlertsList({ alerts = [] }) {
  const navigate = useNavigate();
  const { addToast } = useApp();

  return (
    <Card className="p-5 flex flex-col justify-between">
      <CardHeader
        title="Recent Alerts & Warnings"
        subtitle="Critical ignition conditions flagged by early-warning heuristics"
        action={
          <button
            onClick={() => navigate('/alerts')}
            className="text-xs text-[#D97735] hover:text-[#E69A5C] flex items-center gap-1 font-medium transition-colors"
          >
            <span>All Alerts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      />

      <div className="space-y-3">
        {alerts.slice(0, 3).map((alert) => (
          <div
            key={alert.id}
            className="p-3.5 rounded-panel bg-[#202526] border border-[#2B3031] hover:border-[#3D4446] transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div>
                <div className="text-xs font-semibold text-[#F2F2EF]">
                  {alert.location_name}
                </div>
                <div className="text-[10px] text-[#697270] mt-0.5">
                  Triggered {formatTimeAgo(alert.timestamp)}
                </div>
              </div>
              <RiskBadge level={alert.severity} score={alert.risk_score} size="sm" />
            </div>

            <p className="text-xs text-[#929A98] line-clamp-2 my-2 leading-relaxed">
              {alert.message}
            </p>

            <div className="pt-2 border-t border-[#2B3031]/60 flex items-center justify-between text-[11px]">
              <span className="text-[#D97735] font-medium flex items-center gap-1 text-[10px]">
                <ShieldAlert className="w-3 h-3" />
                Directive: {alert.preventive_action.split('.')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[#2B3031] flex items-center justify-between text-xs text-[#697270]">
        <span>Total unacknowledged warnings:</span>
        <span className="font-mono text-[#D95343] font-semibold">{alerts.length}</span>
      </div>
    </Card>
  );
}

