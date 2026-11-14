import React, { useState, useEffect } from 'react';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { EnvironmentalSummaryCard } from '../components/dashboard/EnvironmentalSummaryCard';
import { RiskDistributionWidget } from '../components/dashboard/RiskDistributionWidget';
import { RecentPredictionsTable } from '../components/dashboard/RecentPredictionsTable';
import { ActiveAlertsList } from '../components/dashboard/ActiveAlertsList';
import { MiniMapCard } from '../components/dashboard/MiniMapCard';
import { OutlookCard } from '../components/dashboard/OutlookCard';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { riskService } from '../services/riskService';
import { alertService } from '../services/alertService';
import { RefreshCw, Clock, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const { addToast, selectedLocation } = useApp();

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
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
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

  if (loading && !summary) {
    return <LoadingSpinner text="Synthesizing multi-spectral risk models..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              Wildfire Intelligence Dashboard
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-panel bg-bg-elevated border border-border-subtle text-text-muted font-semibold">
              NATIONAL SURVEILLANCE
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Continuous 24/7 environmental telemetry analysis and proactive ignition forecasting across high-risk forest zones.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-panel bg-bg-elevated border border-border-subtle text-xs font-mono text-text-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated: {lastUpdated || 'Live'}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={() => {
              loadDashboardData();
              addToast('Telemetry refreshed', 'success');
            }}
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Simulation Disclaimer Banner */}
      <SimulationDisclaimer />

      {/* Overview Statistics (4 Compact Cards) */}
      <MetricsOverview summary={summary} />

      {/* Main Grid: 24-72h Risk Outlook + Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OutlookCard selectedSector={selectedLocation} />
        </div>
        <div className="lg:col-span-1">
          <RiskDistributionWidget distribution={summary?.risk_distribution} />
        </div>
      </div>

      {/* Environmental Conditions Summary */}
      {summary && (
        <EnvironmentalSummaryCard data={summary.environmental_summary} />
      )}

      {/* 2-Column Content: Wildfire Overview Map Preview + Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MiniMapCard sectors={sectors} />
        <ActiveAlertsList alerts={alerts} />
      </div>

      {/* Recent Predictions Table */}
      <RecentPredictionsTable predictions={sectors} />
    </div>
  );
}
