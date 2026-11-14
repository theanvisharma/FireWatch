import React, { useState, useEffect } from 'react';
import { RiskMapContainer } from '../components/maps/RiskMapContainer';
import { LocationInfoDrawer } from '../components/maps/LocationInfoDrawer';
import { MapLegend } from '../components/maps/MapLegend';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { riskService } from '../services/riskService';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Sparkles,
  Filter,
  Search,
  RotateCcw,
} from 'lucide-react';

export function RiskMap() {
  const { selectedLocation, setSelectedLocation, addToast } = useApp();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layers, setLayers] = useState({ polygons: true, markers: true });
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSimModal, setShowSimModal] = useState(false);

  // Simulation Form State
  const [simForm, setSimForm] = useState({
    latitude: 18.52,
    longitude: 73.85,
    temperature: 38,
    wind_speed: 25,
    rainfall: 0,
    soil_moisture: 14,
    relative_humidity: 24,
    slope: 18,
  });
  const [simLoading, setSimLoading] = useState(false);

  useEffect(() => {
    async function fetchMapFeatures() {
      setLoading(true);
      try {
        const res = await riskService.getRiskMap();
        setSectors(res.data.features || []);
        if (!selectedLocation && res.data.features?.length > 0) {
          setSelectedLocation(res.data.features[0]);
        }
      } catch (err) {
        console.error('Error loading risk map:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMapFeatures();
  }, []);

  const handleToggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRunSimulation = async (e) => {
    e.preventDefault();
    setSimLoading(true);
    try {
      const res = await riskService.requestPrediction(simForm);
      const newCustomSector = {
        id: res.data.location_id,
        name: `Custom Location (${simForm.latitude}, ${simForm.longitude})`,
        region: 'User Simulation Sector',
        latitude: Number(simForm.latitude),
        longitude: Number(simForm.longitude),
        risk_score: res.data.risk_score,
        risk_level: res.data.risk_level,
        factors: res.data.factors,
        prediction_horizon: res.data.prediction_horizon,
        summary: `Custom run: Ignition probability calculated at ${res.data.risk_score}%. Key contributors: thermal stress and dry fuel deficit.`,
        polygon: [
          [simForm.latitude - 0.04, simForm.longitude - 0.04],
          [simForm.latitude + 0.04, simForm.longitude - 0.04],
          [simForm.latitude + 0.04, simForm.longitude + 0.04],
          [simForm.latitude - 0.04, simForm.longitude + 0.04],
          [simForm.latitude - 0.04, simForm.longitude - 0.04],
        ],
      };

      setSectors((prev) => [newCustomSector, ...prev]);
      setSelectedLocation(newCustomSector);
      setShowSimModal(false);
      addToast(`Prediction calculated: ${res.data.risk_level} Risk (${res.data.risk_score}%)`, 'success');
    } catch (err) {
      addToast('Prediction request failed', 'error');
    } finally {
      setSimLoading(false);
    }
  };

  // Filter sectors by search and risk level
  const filteredSectors = sectors.filter((s) => {
    const matchesRisk =
      selectedRiskFilter === 'All' ||
      s.risk_level.toLowerCase() === selectedRiskFilter.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const riskFilters = ['All', 'Extreme', 'Very High', 'High', 'Moderate', 'Low'];

  if (loading) {
    return <LoadingSpinner text="Rendering geospatial risk layers..." />;
  }

  return (
    <div className="space-y-4 animate-fade-in pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-orange" />
            Interactive Wildfire Risk Map
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed">
            Geospatial surface intelligence and ignition vulnerability contours. Select any basin or marker to inspect environmental telemetry.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Sparkles}
          onClick={() => setShowSimModal(true)}
        >
          Test Prediction Model
        </Button>
      </div>

      <SimulationDisclaimer />

      {/* Map Control Bar: Search & Severity Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 rounded-card bg-bg-card border border-border-subtle shadow-card text-xs">
        {/* Search by location */}
        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search sectors on map..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-input border border-border-subtle focus:border-border-focus focus:outline-none rounded-panel pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted shadow-subtle"
          />
        </div>

        {/* Severity Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-text-muted text-[11px] font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter Severity:
          </span>
          {riskFilters.map((lvl) => {
            const isActive = selectedRiskFilter === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedRiskFilter(lvl)}
                className={`px-2.5 py-1 rounded-panel text-[11px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-subtle'
                    : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-border-subtle border border-border-subtle'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-text-muted font-mono self-end lg:self-center">
          Showing {filteredSectors.length} of {sectors.length} sectors
        </div>
      </div>

      {/* Main Map Workspace with Sidebar Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Map Canvas (3 Columns) */}
        <div className="lg:col-span-3 relative">
          <RiskMapContainer
            sectors={filteredSectors}
            selectedLocation={selectedLocation}
            onSelectLocation={(sec) => {
              setSelectedLocation(sec);
              addToast(`Inspecting: ${sec.name}`, 'info');
            }}
            layers={layers}
            height="620px"
          />

          {/* Floating Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-[400] pointer-events-auto">
            <MapLegend layers={layers} onToggleLayer={handleToggleLayer} />
          </div>
        </div>

        {/* Selected Location Inspector Drawer (1 Column) */}
        <div className="lg:col-span-1">
          <LocationInfoDrawer
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        </div>
      </div>

      {/* On-Demand Prediction Simulator Modal */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg-card border border-border-subtle rounded-card p-6 max-w-lg w-full shadow-elevated">
            <div className="flex items-start justify-between pb-3.5 border-b border-border-subtle mb-4">
              <div>
                <h3 className="text-sm font-bold text-text-primary">
                  On-Demand Wildfire Risk Simulator
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Test the standardized AI/ML inference schema with custom coordinates & weather factors.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSimModal(false)}
                className="text-text-muted hover:text-text-primary text-sm p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRunSimulation} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-text-secondary block mb-1 font-medium">Latitude</label>
                  <input
                    type="number"
                    step="0.001"
                    value={simForm.latitude}
                    onChange={(e) => setSimForm({ ...simForm, latitude: parseFloat(e.target.value) })}
                    className="w-full bg-bg-input border border-border-subtle rounded-panel p-2 text-text-primary focus:border-border-focus focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary block mb-1 font-medium">Longitude</label>
                  <input
                    type="number"
                    step="0.001"
                    value={simForm.longitude}
                    onChange={(e) => setSimForm({ ...simForm, longitude: parseFloat(e.target.value) })}
                    className="w-full bg-bg-input border border-border-subtle rounded-panel p-2 text-text-primary focus:border-border-focus focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-text-secondary block mb-1 font-medium">Temperature (°C)</label>
                  <input
                    type="number"
                    value={simForm.temperature}
                    onChange={(e) => setSimForm({ ...simForm, temperature: parseFloat(e.target.value) })}
                    className="w-full bg-bg-input border border-border-subtle rounded-panel p-2 text-text-primary focus:border-border-focus focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary block mb-1 font-medium">Wind Speed (km/h)</label>
                  <input
                    type="number"
                    value={simForm.wind_speed}
                    onChange={(e) => setSimForm({ ...simForm, wind_speed: parseFloat(e.target.value) })}
                    className="w-full bg-bg-input border border-border-subtle rounded-panel p-2 text-text-primary focus:border-border-focus focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-text-secondary block mb-1 font-medium">Rainfall 72h (mm)</label>
                  <input
                    type="number"
                    value={simForm.rainfall}
                    onChange={(e) => setSimForm({ ...simForm, rainfall: parseFloat(e.target.value) })}
                    className="w-full bg-bg-input border border-border-subtle rounded-panel p-2 text-text-primary focus:border-border-focus focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-text-secondary block mb-1 font-medium">Soil Moisture (%)</label>
                  <input
                    type="number"
                    value={simForm.soil_moisture}
                    onChange={(e) => setSimForm({ ...simForm, soil_moisture: parseFloat(e.target.value) })}
                    className="w-full bg-bg-input border border-border-subtle rounded-panel p-2 text-text-primary focus:border-border-focus focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-end gap-2.5">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setShowSimModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  loading={simLoading}
                >
                  Run Prediction
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
