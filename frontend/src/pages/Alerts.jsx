import React, { useState, useEffect } from 'react';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertFilterBar } from '../components/alerts/AlertFilterBar';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner, EmptyState } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
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
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-orange" />
            Early Warning Alerts & Mitigation Orders
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed">
            Automated operational directives triggered when predicted flammability metrics exceed critical hazard thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={handleMarkAllRead}
          >
            Acknowledge All
          </Button>
          <button
            type="button"
            onClick={fetchAlerts}
            className="p-2 rounded-panel bg-bg-card hover:bg-bg-elevated text-text-secondary hover:text-text-primary border border-border-subtle transition-colors shadow-subtle"
            title="Refresh alerts"
            aria-label="Refresh alerts"
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
