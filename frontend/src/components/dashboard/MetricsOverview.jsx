import React from 'react';
import { StatMetric } from '../common/StatMetric';
import { Shield, AlertTriangle, Flame, Activity } from 'lucide-react';
import { RISK_COLORS } from '../../utils/constants';

export function MetricsOverview({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatMetric
        label="Monitored Regions"
        value={summary.total_monitored_regions}
        unit="Sectors"
        icon={Shield}
        caption="Continuous multi-sensor surveillance"
      />
      <StatMetric
        label="High Risk Zones"
        value={summary.high_risk_locations}
        unit="Critical"
        icon={Flame}
        accentColor="#D95343"
        caption="Risk score >= 70% threshold"
      />
      <StatMetric
        label="Active Alerts"
        value={summary.active_alerts}
        unit="Warnings"
        icon={AlertTriangle}
        accentColor="#DB873A"
        caption="Immediate mitigation directives"
      />
      <StatMetric
        label="Avg Predicted Risk"
        value={`${summary.avg_wildfire_risk}%`}
        icon={Activity}
        accentColor="#D97735"
        caption="Aggregated cross-region vulnerability"
      />
    </div>
  );
}

