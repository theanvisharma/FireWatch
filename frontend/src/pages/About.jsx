import React from 'react';
import { Card, CardHeader } from '../components/common/Card';
import { TEAM_MEMBERS } from '../utils/constants';
import { SimulationDisclaimer } from '../components/common/SimulationDisclaimer';
import {
  Flame,
  Shield,
  Layers,
  Satellite,
  Cpu,
  Database,
  CloudRain,
  Activity,
  ArrowRight,
  GitBranch,
} from 'lucide-react';

export function About() {
  const dataPillars = [
    {
      title: 'Satellite Remote Sensing',
      source: 'NASA MODIS & VIIRS',
      desc: 'Near real-time 375m and 1km thermal anomaly detection, fire radiative power (FRP), and active hotspot verification.',
      icon: Satellite,
      color: '#D97735',
    },
    {
      title: 'Atmospheric Meteorology',
      source: 'ERA5 & OpenWeather',
      desc: 'High-resolution surface temperature, vapor pressure deficit (VPD), relative humidity, sustained wind velocity, and precipitation.',
      icon: CloudRain,
      color: '#43A879',
    },
    {
      title: 'Vegetation Health & Fuel Moisture',
      source: 'Copernicus Sentinel-2',
      desc: 'Normalized Difference Vegetation Index (NDVI) and Normalized Difference Moisture Index (NDMI) measuring dry fuel accumulation.',
      icon: Layers,
      color: '#D5B34A',
    },
    {
      title: 'Soil Hydrology',
      source: 'NASA SMAP / ECMWF',
      desc: 'Top 5cm volumetric soil moisture content measuring drought stress and organic layer dehydration.',
      icon: Activity,
      color: '#B96932',
    },
    {
      title: 'Terrain Topography',
      source: 'SRTM 30m DEM',
      desc: 'Digital elevation, slope steepness angle, and aspect determining convective heat spread and wind funneling.',
      icon: Shield,
      color: '#DB873A',
    },
    {
      title: 'Historical Ignitions',
      source: 'Forest Survey / FSI',
      desc: 'Multi-year ground truth wildfire logs used to train, calibrate, and validate machine learning feature weights.',
      icon: Database,
      color: '#929A98',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-[#2B3031]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#D97735]/15 border border-[#D97735]/30 flex items-center justify-center text-[#D97735]">
            <Flame className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#F2F2EF]">
            About FireWatch AI
          </h1>
        </div>
        <p className="text-xs text-[#929A98] max-w-2xl leading-relaxed">
          Geospatial artificial intelligence shifting disaster management from reactive smoke detection to proactive, high-resolution wildfire ignition risk forecasting.
        </p>
      </div>

      <SimulationDisclaimer />

      {/* The Problem & Our Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-l-2 border-l-[#D95343]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D95343] uppercase tracking-wider mb-2">
            <span>The Ecological Problem</span>
          </div>
          <h3 className="text-base font-bold text-[#F2F2EF] mb-2">
            Reactive Firefighting is Inherently Too Late
          </h3>
          <p className="text-xs text-[#929A98] leading-relaxed mb-3">
            Traditional forest management relies heavily on watchtowers, citizen reports, and low-orbit satellite detections of already-burning blazes. By the time thermal plumes are visible, flames have frequently escaped initial attack containment, destroying vital biodiversity and releasing millions of tons of carbon.
          </p>
          <div className="p-3 rounded-panel bg-[#141718] border border-[#2B3031] text-xs font-mono text-[#D95343]">
            Key Flaw: Reacting after combustion leaves fire crews fighting uncontrollable infernos.
          </div>
        </Card>

        <Card className="p-6 border-l-2 border-l-[#43A879]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#43A879] uppercase tracking-wider mb-2">
            <span>The FireWatch Solution</span>
          </div>
          <h3 className="text-base font-bold text-[#F2F2EF] mb-2">
            Predicting Ignition Risk 24–72 Hours Ahead
          </h3>
          <p className="text-xs text-[#929A98] leading-relaxed mb-3">
            FireWatch AI models the environmental preconditions that enable ignition before sparks occur. By continuously fusing multi-spectral satellite imagery, weather indices, vegetative dryness, soil hydrology, and terrain physics, the platform calculates localized risk scores to deploy preventative countermeasures.
          </p>
          <div className="p-3 rounded-panel bg-[#141718] border border-[#2B3031] text-xs font-mono text-[#43A879]">
            Proactive Paradigm: Position bowsers, clear firebreaks, and patrol before fire starts.
          </div>
        </Card>
      </div>

      {/* 6 Multimodal Data Pillars */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#F2F2EF]">
            Multimodal Remote Sensing & Data Integration
          </h2>
          <p className="text-xs text-[#929A98]">
            FireWatch AI synthesizes six independent physical dimensions into a unified geospatial intelligence grid.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataPillars.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="p-4 hover:border-[#3D4446] transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[#929A98]">
                  <div
                    className="w-7 h-7 rounded-lg bg-[#202526] border border-[#2B3031] flex items-center justify-center"
                    style={{ color: p.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#F2F2EF]">{p.title}</h4>
                    <span className="text-[10px] text-[#697270] font-mono">{p.source}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#929A98] leading-relaxed mt-2">{p.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* AI/ML Modeling Approach */}
      <Card className="p-6">
        <CardHeader
          title="Machine Learning & Prediction Architecture"
          subtitle="How our ensemble models forecast ignition vulnerability"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#929A98]">
          <div className="p-4 rounded-panel bg-[#141718] border border-[#2B3031]">
            <div className="flex items-center gap-2 text-[#D97735] font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>1. Feature Engineering</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Computes derived physical indices including Vapor Pressure Deficit (VPD), Rothermel slope-wind interaction vectors, and NDVI fuel flammability multipliers.
            </p>
          </div>

          <div className="p-4 rounded-panel bg-[#141718] border border-[#2B3031]">
            <div className="flex items-center gap-2 text-[#43A879] font-semibold mb-2">
              <Activity className="w-4 h-4" />
              <span>2. XGBoost Ensemble</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Trained on multi-year NASA thermal anomalies and weather histories. Calibrated via Brier score to produce true probabilistic ignition risk percentages.
            </p>
          </div>

          <div className="p-4 rounded-panel bg-[#141718] border border-[#2B3031]">
            <div className="flex items-center gap-2 text-[#D5B34A] font-semibold mb-2">
              <Shield className="w-4 h-4" />
              <span>3. Explainability (SHAP)</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Deconstructs each localized risk score into contributing physical drivers (e.g., 42% thermal, 35% fuel drought, 23% wind velocity) for forest officers.
            </p>
          </div>
        </div>
      </Card>

      {/* 4-Developer Modular Architecture */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#F2F2EF]">
            Engineering Team Architecture & Module Ownership
          </h2>
          <p className="text-xs text-[#929A98]">
            Built with strict separation of concerns enabling four developers to innovate independently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} className="p-5 border-t-2" style={{ borderTopColor: member.color }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-bold text-[#F2F2EF]">{member.name}</h4>
                  <div className="text-xs font-medium text-[#929A98]">{member.role}</div>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#202526] border border-[#2B3031] text-[#697270]">
                  {member.module}
                </span>
              </div>
              <p className="text-xs text-[#929A98] leading-relaxed mt-2">{member.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

