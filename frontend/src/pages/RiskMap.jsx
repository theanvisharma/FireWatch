import React, { useState, useEffect } from 'react';
import { RiskMapContainer } from '../components/maps/RiskMapContainer';
import { LocationInfoDrawer } from '../components/maps/LocationInfoDrawer';
import { MapLegend } from '../components/maps/MapLegend';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { riskService } from '../services/riskService';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Search,
  Sliders,
  Sparkles,
  RefreshCw,
  Compass,
  Layers,
} from 'lucide-react';

export function RiskMap() {
  const { selectedLocation, setSelectedLocation, addToast } = useApp();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layers, setLayers] = useState({ polygons: true, markers: true });
  const [showSimModal, setShowSimModal] = useState(false);

  // Simulation Form State for On-Demand Prediction Testing
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
        name: `Custom Coordinate (${simForm.latitude}, ${simForm.longitude})`,
        region: 'User Simulation Sector',
        latitude: Number(simForm.latitude),
        longitude: Number(simForm.longitude),
        risk_score: res.data.risk_score,
        risk_level: res.data.risk_level,
        factors: res.data.factors,
        prediction_horizon: res.data.prediction_horizon,
        summary: `Custom parameter run: Ignition index computed at ${res.data.risk_score}%. Top factors: thermal stress and dry fuel deficit.`,
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
      addToast(`Prediction computed: ${res.data.risk_level} Risk (${res.data.risk_score}%)`, 'success');
    } catch (err) {
      addToast('Prediction request failed', 'error');
    } finally {
      setSimLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Rendering Leaflet geospatial risk layers..." />;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2B3031]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F2F2EF] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D97735]" />
            Interactive Wildfire Risk Map
          </h1>
          <p className="text-xs text-[#929A98]">
            Geospatial surface intelligence and ignition vulnerability contours. Click on any sector to inspect telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSimModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-panel text-xs font-semibold bg-[#D97735] hover:bg-[#B96932] text-[#F2F2EF] transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Prediction Model</span>
          </button>
        </div>
      </div>

      <SimulationDisclaimer />

      {/* Main Map Workspace with Sidebar Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map Canvas (3 Columns) */}
        <div className="lg:col-span-3 relative">
          <RiskMapContainer
            sectors={sectors}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#191D1E] border border-[#2B3031] rounded-card p-6 max-w-lg w-full shadow-elevated">
            <div className="flex items-start justify-between pb-3 border-b border-[#2B3031] mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#F2F2EF]">
                  On-Demand Wildfire Risk Simulator
                </h3>
                <p className="text-xs text-[#929A98]">
                  Test the standardized AI/ML inference schema with custom coordinates & weather factors.
                </p>
              </div>
              <button
                onClick={() => setShowSimModal(false)}
                className="text-[#697270] hover:text-[#F2F2EF] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRunSimulation} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#929A98] block mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.001"
                    value={simForm.latitude}
                    onChange={(e) => setSimForm({ ...simForm, latitude: parseFloat(e.target.value) })}
                    className="w-full bg-[#141718] border border-[#2B3031] rounded-panel p-2 text-[#F2F2EF] focus:border-[#D97735] focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#929A98] block mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.001"
                    value={simForm.longitude}
                    onChange={(e) => setSimForm({ ...simForm, longitude: parseFloat(e.target.value) })}
                    className="w-full bg-[#141718] border border-[#2B3031] rounded-panel p-2 text-[#F2F2EF] focus:border-[#D97735] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#929A98] block mb-1">Temperature (°C)</label>
                  <input
                    type="number"
                    value={simForm.temperature}
                    onChange={(e) => setSimForm({ ...simForm, temperature: parseFloat(e.target.value) })}
                    className="w-full bg-[#141718] border border-[#2B3031] rounded-panel p-2 text-[#F2F2EF] focus:border-[#D97735] focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#929A98] block mb-1">Wind Speed (km/h)</label>
                  <input
                    type="number"
                    value={simForm.wind_speed}
                    onChange={(e) => setSimForm({ ...simForm, wind_speed: parseFloat(e.target.value) })}
                    className="w-full bg-[#141718] border border-[#2B3031] rounded-panel p-2 text-[#F2F2EF] focus:border-[#D97735] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#929A98] block mb-1">Rainfall 72h (mm)</label>
                  <input
                    type="number"
                    value={simForm.rainfall}
                    onChange={(e) => setSimForm({ ...simForm, rainfall: parseFloat(e.target.value) })}
                    className="w-full bg-[#141718] border border-[#2B3031] rounded-panel p-2 text-[#F2F2EF] focus:border-[#D97735] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[#929A98] block mb-1">Soil Moisture (%)</label>
                  <input
                    type="number"
                    value={simForm.soil_moisture}
                    onChange={(e) => setSimForm({ ...simForm, soil_moisture: parseFloat(e.target.value) })}
                    className="w-full bg-[#141718] border border-[#2B3031] rounded-panel p-2 text-[#F2F2EF] focus:border-[#D97735] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#2B3031] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSimModal(false)}
                  className="px-3.5 py-2 rounded-panel bg-[#202526] hover:bg-[#2B3031] text-[#929A98] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={simLoading}
                  className="px-4 py-2 rounded-panel bg-[#D97735] hover:bg-[#B96932] text-[#F2F2EF] font-semibold transition-colors disabled:opacity-50"
                >
                  {simLoading ? 'Calculating...' : 'Run Prediction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

