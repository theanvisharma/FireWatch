import React from 'react';
import { StatCard } from '../common/StatMetric';
import { Shield, AlertTriangle, Flame, Sparkles } from 'lucide-react';

export function MetricsOverview({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
      <StatCard
        label="Total Monitored Regions"
        value={summary.total_monitored_regions}
        unit="Basins"
        icon={Shield}
        caption="Continuous multi-sensor satellite coverage"
        trend="+2 newly mapped"
        trendPositive={true}
      />
      <StatCard
        label="High-Risk Regions"
        value={summary.high_risk_locations}
        unit="Critical"
        icon={Flame}
        accentColor="#D95343"
        caption="Risk index >= 70% threshold"
        trend="Elevated thermal stress"
        trendPositive={false}
      />
      <StatCard
        label="Active Fire Alerts"
        value={summary.active_alerts}
        unit="Directives"
        icon={AlertTriangle}
        accentColor="#DB873A"
        caption="Actionable early warning orders"
        trend="1 extreme severity"
        trendPositive={false}
      />
      <StatCard
        label="Predictions Generated"
        value="142"
        unit="Runs / 24h"
        icon={Sparkles}
        accentColor="#D97735"
        caption="XGBoost & Random Forest multi-horizon"
        trend="99.4% uptime"
        trendPositive={true}
      />
    </div>
  );
}
