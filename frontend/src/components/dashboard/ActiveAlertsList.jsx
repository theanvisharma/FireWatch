import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskBadge } from '../common/RiskBadge';
import { formatTimeAgo } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export function ActiveAlertsList({ alerts = [] }) {
  const navigate = useNavigate();

  return (
    <Card className="p-5 flex flex-col justify-between">
      <CardHeader
        title="Recent Alerts & Warnings"
        subtitle="Critical ignition conditions flagged by early-warning heuristics"
        action={
          <button
            type="button"
            onClick={() => navigate('/alerts')}
            className="text-xs text-brand-orange hover:underline flex items-center gap-1 font-semibold transition-colors"
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
            className="p-3.5 rounded-card bg-bg-elevated border border-border-subtle hover:border-border-hover transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div>
                <div className="text-xs font-bold text-text-primary">
                  {alert.location_name}
                </div>
                <div className="text-[10px] text-text-muted mt-0.5 font-mono">
                  Triggered {formatTimeAgo(alert.timestamp)}
                </div>
              </div>
              <RiskBadge level={alert.severity} score={alert.risk_score} size="sm" />
            </div>

            <p className="text-xs text-text-secondary line-clamp-2 my-2 leading-relaxed">
              {alert.message}
            </p>

            <div className="pt-2 border-t border-border-subtle/60 flex items-center justify-between text-[11px]">
              <span className="text-brand-orange font-medium flex items-center gap-1 text-[10px]">
                <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                Directive: {alert.preventive_action.split('.')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
        <span>Active unacknowledged warnings:</span>
        <span className="font-mono text-[#D95343] font-bold">{alerts.length}</span>
      </div>
    </Card>
  );
}
