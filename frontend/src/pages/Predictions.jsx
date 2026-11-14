import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '../components/common/Card';
import { RiskBadge } from '../components/common/RiskBadge';
import { Button } from '../components/common/Button';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { riskService } from '../services/riskService';
import { useApp } from '../context/AppContext';
import { formatCoords, formatDateTime } from '../utils/formatters';
import {
  Sparkles,
  Compass,
  Clock,
  Thermometer,
  Wind,
  Droplets,
  Mountain,
  Sprout,
  Activity,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export function Predictions() {
  const { selectedLocation, setSelectedLocation, addToast } = useApp();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState(null);

  useEffect(() => {
    async function fetchPredictions() {
      setLoading(true);
      try {
        const res = await riskService.getPredictions();
        const list = res.data || [];
        setSectors(list);
        if (selectedLocation) {
          const match = list.find((s) => s.id === selectedLocation.id);
          setActiveSector(match || list[0]);
        } else if (list.length > 0) {
          setActiveSector(list[0]);
          setSelectedLocation(list[0]);
        }
      } catch (err) {
        console.error('Failed to load predictions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  const handleSelectSector = (sec) => {
    setActiveSector(sec);
    setSelectedLocation(sec);
    addToast(`Selected prediction profile: ${sec.name}`, 'info');
  };

  if (loading && !activeSector) {
    return <LoadingSpinner text="Generating multi-spectral ignition probability models..." />;
  }

  const current = activeSector || sectors[0];
  const f = current?.factors || {};

  // 24h, 48h, 72h trajectory breakdown
  const outlookItems = [
    {
      horizon: '24 Hours',
      prob: Math.min(Math.round(current.risk_score * 0.94), 98),
      temp: `${f.temperature - 1.2}°C`,
      wind: `${f.wind_speed - 3} km/h`,
      rh: `${f.relative_humidity + 4}%`,
      status: 'Elevated daytime thermal drying',
    },
    {
      horizon: '48 Hours',
      prob: Math.min(Math.round(current.risk_score * 1.04), 98),
      temp: `${f.temperature + 1.5}°C`,
      wind: `${f.wind_speed + 4} km/h`,
      rh: `${Math.max(f.relative_humidity - 6, 12)}%`,
      status: 'Apex flammability window with high wind',
    },
    {
      horizon: '72 Hours',
      prob: Math.max(Math.round(current.risk_score * 0.84), 20),
      temp: `${f.temperature - 3.0}°C`,
      wind: `${f.wind_speed - 7} km/h`,
      rh: `${f.relative_humidity + 12}%`,
      status: 'Anticipated moisture recovery',
    },
  ];

  // Feature influence attribution (SHAP style breakdown)
  const factorsInfluence = [
    { name: 'Surface Temperature & Thermal Stress', pct: 36, val: `${f.temperature}°C`, color: '#DB873A' },
    { name: 'Volumetric Soil Moisture Deficit', pct: 28, val: `${f.soil_moisture}%`, color: '#D95343' },
    { name: 'Sustained Wind Velocity & Direction', pct: 20, val: `${f.wind_speed} km/h`, color: '#D5B34A' },
    { name: 'Vegetation Health Index (NDVI)', pct: 16, val: f.ndvi ?? '0.32', color: '#43A879' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-orange" />
            Wildfire Ignition Risk Predictions
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed">
            Physics-constrained machine learning forecasts predicting ignition probability before sparks occur.
          </p>
        </div>

        {/* Sector Quick Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted hidden md:inline">Target Sector:</span>
          <select
            value={current.id}
            onChange={(e) => {
              const found = sectors.find((s) => s.id === e.target.value);
              if (found) handleSelectSector(found);
            }}
            className="bg-bg-card border border-border-subtle rounded-panel px-3 py-1.5 text-xs text-text-primary focus:border-border-focus focus:outline-none cursor-pointer shadow-subtle"
          >
            {sectors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.risk_score}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      <SimulationDisclaimer />

      {/* Main Prediction Overview Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Selected Sector Ignition Probability */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-border-subtle mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-brand-orange px-2 py-0.5 rounded-panel bg-bg-elevated border border-border-subtle">
                    {current.id}
                  </span>
                  <RiskBadge level={current.risk_level} score={current.risk_score} size="md" />
                </div>
                <h2 className="text-lg font-bold text-text-primary mt-1.5">{current.name}</h2>
                <div className="flex items-center gap-2 text-xs text-text-secondary font-mono mt-0.5">
                  <Compass className="w-3.5 h-3.5 text-text-muted" />
                  <span>{formatCoords(current.latitude, current.longitude)}</span>
                  <span className="text-text-muted">| {current.region}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                  Model Horizon
                </div>
                <div className="text-sm font-bold text-text-primary font-mono mt-0.5">
                  {current.prediction_horizon || '24–72 Hours'}
                </div>
              </div>
            </div>

            {/* Probability Gauge / Numerical Presentation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="p-4 rounded-card bg-bg-elevated border border-border-subtle">
                <div className="text-[11px] font-semibold text-text-muted uppercase">
                  Ignition Probability
                </div>
                <div className="text-3xl font-extrabold text-text-primary font-mono mt-1">
                  {current.risk_score}%
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  Calibrated via Brier score & loss
                </p>
              </div>

              <div className="p-4 rounded-card bg-bg-elevated border border-border-subtle">
                <div className="text-[11px] font-semibold text-text-muted uppercase">
                  Confidence Score
                </div>
                <div className="text-3xl font-extrabold text-brand-orange font-mono mt-1">
                  92%
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  XGBoost cross-validated threshold
                </p>
              </div>

              <div className="p-4 rounded-card bg-bg-elevated border border-border-subtle">
                <div className="text-[11px] font-semibold text-text-muted uppercase">
                  Prediction Window
                </div>
                <div className="text-3xl font-extrabold text-text-primary font-mono mt-1">
                  72h
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  Forward rolling trajectory
                </p>
              </div>
            </div>

            {/* Diagnostic Assessment summary */}
            <div className="p-3.5 rounded-panel bg-bg-elevated border border-border-subtle text-xs text-text-secondary leading-relaxed">
              <span className="font-semibold text-text-primary block mb-0.5">
                AI Diagnostic Assessment:
              </span>
              {current.summary ||
                'High surface thermal gradients combined with severe sub-surface moisture deficit produce critical fuel dehydration conditions across this forest quadrant.'}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between text-[11px] text-text-muted gap-2">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              Generated: {formatDateTime(current.updated_at || new Date().toISOString())}
            </span>
            <span className="font-mono text-brand-orange font-medium">Model: v1.0-xgb-production</span>
          </div>
        </Card>

        {/* Right Col: Environmental Factor Attribution (SHAP style) */}
        <Card className="lg:col-span-1 p-6 flex flex-col justify-between">
          <CardHeader
            title="Factor Weight Attribution"
            subtitle="SHAP decomposition of input drivers"
          />

          <div className="space-y-3.5 my-auto">
            {factorsInfluence.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-text-primary text-[11px] truncate max-w-[190px]">
                    {item.name}
                  </span>
                  <span className="font-mono text-text-secondary text-[11px]">{item.val}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden border border-border-subtle">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.pct * 2}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="text-[10px] text-text-muted text-right font-mono">
                  Contribution weight: +{item.pct}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] text-text-muted text-center">
            Derived from Rothermel & multi-spectral physics variables.
          </div>
        </Card>
      </div>

      {/* 24-Hour, 48-Hour, and 72-Hour Outlook Cards */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Multi-Horizon Risk Progression (24h — 48h — 72h)
          </h2>
          <p className="text-xs text-text-secondary">
            Expected ignition vulnerability trajectory based on incoming synoptic weather and fuel moisture cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {outlookItems.map((item, idx) => (
            <Card key={item.horizon} className="p-5 border-t-4" style={{ borderTopColor: item.prob >= 75 ? '#D95343' : item.prob >= 55 ? '#DB873A' : '#D5B34A' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-brand-orange uppercase">
                  {item.horizon}
                </span>
                <span className="font-mono text-xs font-bold text-text-primary">
                  {item.prob}% Probability
                </span>
              </div>

              <div className="my-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-panel bg-bg-elevated">
                  <span className="text-text-muted">Est. Temperature:</span>
                  <span className="font-mono font-bold text-text-primary">{item.temp}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-panel bg-bg-elevated">
                  <span className="text-text-muted">Est. Wind Speed:</span>
                  <span className="font-mono font-bold text-text-primary">{item.wind}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-panel bg-bg-elevated">
                  <span className="text-text-muted">Est. Rel. Humidity:</span>
                  <span className="font-mono font-bold text-text-primary">{item.rh}</span>
                </div>
              </div>

              <p className="text-[11px] text-text-secondary mt-2 leading-relaxed">
                {item.status}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Multi-Sector Prediction Catalog Table */}
      <Card className="p-5">
        <CardHeader
          title="Monitored Sector Prediction Comparison"
          subtitle="Comparative view of forward-looking predictions across all surveillance sectors"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Sector ID & Name</th>
                <th className="pb-3 font-semibold">Coordinates</th>
                <th className="pb-3 font-semibold">Ignition Risk</th>
                <th className="pb-3 font-semibold">Thermal / Wind</th>
                <th className="pb-3 font-semibold">Soil Moisture</th>
                <th className="pb-3 font-semibold">Horizon</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-secondary">
              {sectors.map((sec) => {
                const isSelected = sec.id === current.id;
                return (
                  <tr
                    key={sec.id}
                    onClick={() => handleSelectSector(sec)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-bg-elevated text-text-primary font-semibold'
                        : 'hover:bg-bg-elevated/50'
                    }`}
                  >
                    <td className="py-3 font-mono">
                      <div className="font-bold text-text-primary">{sec.name}</div>
                      <div className="text-[10px] text-text-muted">{sec.id} | {sec.region}</div>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-text-muted">
                      {formatCoords(sec.latitude, sec.longitude)}
                    </td>
                    <td className="py-3">
                      <RiskBadge level={sec.risk_level} score={sec.risk_score} size="sm" />
                    </td>
                    <td className="py-3 font-mono text-[11px]">
                      <span className="text-[#DB873A]">{sec.factors.temperature}°C</span>
                      <span className="text-text-muted"> / </span>
                      <span className="text-[#D5B34A]">{sec.factors.wind_speed}km/h</span>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-[#43A879]">
                      {sec.factors.soil_moisture}%
                    </td>
                    <td className="py-3 text-text-muted font-mono text-[11px]">
                      {sec.prediction_horizon || '24-72h'}
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm">
                        Select
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

