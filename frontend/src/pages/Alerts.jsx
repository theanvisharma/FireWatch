import React, { useState, useEffect } from 'react';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertFilterBar } from '../components/alerts/AlertFilterBar';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner, EmptyState } from '../components/common/LoadingSpinner';
import { alertService } from '../services/alertService';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, RefreshCw, AlertCircle } from 'lucide-react';

export function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const { addToast, markAlertReadInContext } = useApp();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await alertService.getAlerts();
      setAlerts(res.data || []);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleMarkRead = async (alertId) => {
    try {
      await alertService.updateAlertStatus(alertId, { is_read: true });
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, is_read: true } : a))
      );
      markAlertReadInContext(alertId);
      addToast(`Alert ${alertId} marked as acknowledged`, 'success');
    } catch (err) {
      addToast('Failed to acknowledge alert', 'error');
    }
  };

  const handleMarkAllRead = async () => {
    const unreadAlerts = alerts.filter((a) => !a.is_read);
    for (const a of unreadAlerts) {
      await alertService.updateAlertStatus(a.id, { is_read: true });
      markAlertReadInContext(a.id);
    }
    setAlerts((prev) => prev.map((a) => ({ ...a, is_read: true })));
    addToast('All active alerts acknowledged', 'success');
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchesSeverity =
      selectedSeverity === 'All' || a.severity.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesUnread = !showUnreadOnly || !a.is_read;
    return matchesSeverity && matchesUnread;
  });

  if (loading) {
    return <LoadingSpinner text="Fetching active wildfire telemetry alerts..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2B3031]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F2F2EF] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#D97735]" />
            Early Warning Alerts & Directives
          </h1>
          <p className="text-xs text-[#929A98]">
            Proactive mitigation orders triggered when predicted ignition indices exceed critical thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-panel text-xs font-medium bg-[#191D1E] hover:bg-[#202526] text-[#F2F2EF] border border-[#2B3031] transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#43A879]" />
            <span>Acknowledge All</span>
          </button>
          <button
            onClick={fetchAlerts}
            className="p-2 rounded-panel bg-[#191D1E] hover:bg-[#202526] text-[#929A98] hover:text-[#F2F2EF] border border-[#2B3031] transition-colors"
            title="Refresh alerts"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <SimulationDisclaimer />

      {/* Filter and Count Bar */}
      <AlertFilterBar
        selectedSeverity={selectedSeverity}
        onSelectSeverity={setSelectedSeverity}
        showUnreadOnly={showUnreadOnly}
        onToggleUnreadOnly={setShowUnreadOnly}
        totalCount={filteredAlerts.length}
      />

      {/* Alerts Feed */}
      {filteredAlerts.length > 0 ? (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onMarkRead={handleMarkRead} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No alerts match current filter criteria"
          description="All monitored sectors are operating below the active alert threshold or matching criteria."
          icon={AlertCircle}
        />
      )}
    </div>
  );
}

