import React, { useState } from 'react';
import { Card, CardHeader } from '../components/common/Card';
import { RiskBadge } from '../components/common/RiskBadge';
import { TrendLineChart } from '../components/charts/TrendLineChart';
import { EnvironmentalComparisonChart } from '../components/charts/EnvironmentalComparisonChart';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { Button } from '../components/common/Button';
import { MOCK_HISTORICAL_EVENTS, MOCK_SECTORS } from '../services/mockData';
import { formatCoords } from '../utils/formatters';
import {
  History,
  Search,
  Download,
  Calendar,
  Filter,
} from 'lucide-react';

export function HistoricalData() {
  const [events, setEvents] = useState(MOCK_HISTORICAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.location_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      selectedSeverity === 'All' || ev.severity.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesRegion =
      selectedRegion === 'All' || ev.region.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesSeverity && matchesRegion;
  });

  const regions = ['All', 'Western Ghats', 'Central Highlands', 'Nilgiri', 'Rajasthan', 'Odisha'];
  const severities = ['All', 'Extreme', 'Very High', 'High', 'Moderate'];

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <History className="w-5 h-5 text-brand-orange" />
            Historical Wildfire Intelligence Archive
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed">
            Archived wildfire ignition events, environmental forensics, and burn area analytics across historical fire seasons.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Download}
          onClick={() => alert('Exporting historical wildfire records (CSV)...')}
        >
          Export Dataset (CSV)
        </Button>
      </div>

      <SimulationDisclaimer />

      {/* Two Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <CardHeader
            title="Multi-Day Risk Index vs Ambient Temperature"
            subtitle="Correlating heatwave duration with ignition vulnerability spikes"
          />
          <TrendLineChart height={220} />
        </Card>

        <Card className="p-5">
          <CardHeader
            title="Environmental Parameter Benchmarks"
            subtitle="Cross-sector comparison of temperature, wind velocity, and soil moisture"
          />
          <EnvironmentalComparisonChart sectors={MOCK_SECTORS} height={220} />
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-card bg-bg-card border border-border-subtle shadow-card space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search historical records, causes, or IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-input border border-border-subtle focus:border-border-focus focus:outline-none rounded-panel pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted shadow-subtle"
            />
          </div>

          {/* Region and Severity Selectors */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 bg-bg-elevated border border-border-subtle rounded-panel px-3 py-1.5 shadow-subtle">
              <span className="text-text-muted text-[10px] uppercase font-semibold">Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-text-primary focus:outline-none text-xs cursor-pointer font-medium"
              >
                {regions.map((r) => (
                  <option key={r} value={r} className="bg-bg-card text-text-primary">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-bg-elevated border border-border-subtle rounded-panel px-3 py-1.5 shadow-subtle">
              <span className="text-text-muted text-[10px] uppercase font-semibold">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-transparent text-text-primary focus:outline-none text-xs cursor-pointer font-medium"
              >
                {severities.map((s) => (
                  <option key={s} value={s} className="bg-bg-card text-text-primary">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Records Table */}
      <Card className="p-5">
        <CardHeader
          title="Historical Incident Archive"
          subtitle={`Showing ${filteredEvents.length} validated ground-truth events with satellite confirmation`}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Event ID & Date</th>
                <th className="pb-3 font-semibold">Location & Region</th>
                <th className="pb-3 font-semibold">Severity</th>
                <th className="pb-3 font-semibold">Burn Area</th>
                <th className="pb-3 font-semibold">Ignition Cause</th>
                <th className="pb-3 font-semibold">Conditions at Ignition</th>
                <th className="pb-3 font-semibold text-right">Sensor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-secondary">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-bg-elevated/50 transition-colors">
                  <td className="py-3 font-mono">
                    <div className="font-bold text-text-primary">{ev.id}</div>
                    <div className="text-[10px] text-text-muted">{ev.incident_date}</div>
                  </td>
                  <td className="py-3">
                    <div className="font-semibold text-text-primary">{ev.location_name}</div>
                    <div className="text-[10px] text-text-muted">{ev.region}</div>
                  </td>
                  <td className="py-3">
                    <RiskBadge level={ev.severity} score={ev.max_risk_score} size="sm" />
                  </td>
                  <td className="py-3 font-mono text-text-primary">
                    <span className="font-bold">{ev.area_burned_hectares}</span> ha
                    <span className="block text-[10px] text-text-muted">
                      Contained in {ev.containment_days}d
                    </span>
                  </td>
                  <td className="py-3 text-text-primary font-medium">{ev.cause}</td>
                  <td className="py-3 font-mono text-[11px]">
                    <div className="text-[#DB873A] font-medium">{ev.temperature_at_ignition}°C Temp</div>
                    <div className="text-text-muted">
                      {ev.wind_speed_at_ignition}km/h | {ev.soil_moisture_at_ignition}% moist
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-panel font-mono text-[10px] bg-bg-elevated border border-border-subtle text-text-secondary font-medium">
                      {ev.satellite_detection_sensor}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
