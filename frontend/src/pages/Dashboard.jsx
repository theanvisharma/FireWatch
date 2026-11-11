import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { EnvironmentalSummaryCard } from '../components/dashboard/EnvironmentalSummaryCard';
import { RiskDistributionWidget } from '../components/dashboard/RiskDistributionWidget';
import { RecentPredictionsTable } from '../components/dashboard/RecentPredictionsTable';
import { ActiveAlertsList } from '../components/dashboard/ActiveAlertsList';
import { MiniMapCard } from '../components/dashboard/MiniMapCard';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { riskService } from '../services/riskService';
import { alertService } from '../services/alertService';
import { ShieldCheck, RefreshCw, Flame, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const { addToast } = useApp();

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [sumRes, alertRes, mapRes] = await Promise.all([
        riskService.getDashboardSummary(),
        alertService.getAlerts(),
        riskService.getRiskMap(),
      ]);
      setSummary(sumRes.data);
      setAlerts(alertRes.data);
      setSectors(mapRes.data.features || []);
    } catch (err) {
      console.error('Failed to load dashboard telemetry:', err);
      addToast('Failed to load live telemetry; loaded local cache', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Synthesizing multi-spectral risk models..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome & Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2B3031]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-[#F2F2EF]">
              FireWatch AI Surveillance
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202526] border border-[#2B3031] text-[#929A98]">
              CONTROL CENTRE
            </span>
          </div>
          <p className="text-xs text-[#929A98]">
            Proactive wildfire ignition risk forecasting powered by satellite remote sensing & machine learning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              loadDashboardData();
              addToast('Telemetry refreshed', 'success');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-panel text-xs font-medium bg-[#191D1E] hover:bg-[#202526] text-[#929A98] hover:text-[#F2F2EF] border border-[#2B3031] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* Prominent Demo Data Notice */}
      <SimulationDisclaimer />

      {/* Metrics Row: 4 Essential Cards */}
      <MetricsOverview summary={summary} />

      {/* Environmental Condition Summary */}
      {summary && (
        <EnvironmentalSummaryCard data={summary.environmental_summary} />
      )}

      {/* Two Column Grid: Risk Distribution + Mini Risk Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskDistributionWidget distribution={summary?.risk_distribution} />
        <MiniMapCard sectors={sectors} />
      </div>

      {/* Two Column Grid: Recent Predictions Table + Recent Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentPredictionsTable predictions={sectors} />
        </div>
        <div className="lg:col-span-1">
          <ActiveAlertsList alerts={alerts} />
        </div>
      </div>
    </div>
  );
}

