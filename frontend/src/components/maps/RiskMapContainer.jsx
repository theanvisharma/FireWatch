import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Popup,
  useMap,
} from 'react-leaflet';
import { RISK_COLORS } from '../../utils/constants';
import { formatCoords } from '../../utils/formatters';
import { RiskBadge } from '../common/RiskBadge';
import { useApp } from '../../context/AppContext';

// Smooth map panning/zooming when selectedLocation changes
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.2,
      });
    }
  }, [center, zoom, map]);
  return null;
}

// Tile Layer component that switches dynamically when theme changes
function DynamicTileLayer() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <TileLayer
      key={theme} // Forces re-mount when theme flips
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url={tileUrl}
      maxZoom={19}
    />
  );
}

export function RiskMapContainer({
  sectors = [],
  selectedLocation,
  onSelectLocation = () => {},
  layers = { polygons: true, markers: true },
  height = '600px',
}) {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const defaultCenter = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : [18.7557, 73.4091];

  return (
    <div
      style={{ height, width: '100%' }}
      className="rounded-card overflow-hidden border border-border-subtle relative shadow-card"
    >
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapRecenter
          center={
            selectedLocation
              ? [selectedLocation.latitude, selectedLocation.longitude]
              : defaultCenter
          }
          zoom={selectedLocation ? 9 : 7}
        />

        {/* Dynamic Dark / Light Tiles */}
        <DynamicTileLayer />

        {/* Polygons */}
        {layers.polygons &&
          sectors.map((sector) => {
            if (!sector.polygon || !sector.polygon.length) return null;
            const color = RISK_COLORS[sector.risk_level] || '#D97735';
            const isSelected = selectedLocation?.id === sector.id;

            return (
              <Polygon
                key={`poly-${sector.id}`}
                positions={sector.polygon}
                pathOptions={{
                  color: isSelected ? (isDark ? '#F2F2EF' : '#202725') : color,
                  fillColor: color,
                  fillOpacity: isSelected ? 0.38 : 0.18,
                  weight: isSelected ? 2.5 : 1.2,
                  dashArray: isSelected ? '4, 4' : null,
                }}
                eventHandlers={{
                  click: () => onSelectLocation(sector),
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <div className="font-bold text-text-primary mb-1">{sector.name}</div>
                    <div className="text-[11px] text-text-muted mb-2 font-mono">
                      {formatCoords(sector.latitude, sector.longitude)}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-text-secondary text-[11px]">Predicted Risk:</span>
                      <RiskBadge level={sector.risk_level} score={sector.risk_score} size="sm" />
                    </div>
                  </div>
                </Popup>
              </Polygon>
            );
          })}

        {/* Markers */}
        {layers.markers &&
          sectors.map((sector) => {
            const color = RISK_COLORS[sector.risk_level] || '#D97735';
            const isSelected = selectedLocation?.id === sector.id;

            return (
              <CircleMarker
                key={`marker-${sector.id}`}
                center={[sector.latitude, sector.longitude]}
                radius={isSelected ? 10 : 7}
                pathOptions={{
                  color: isSelected ? (isDark ? '#F2F2EF' : '#202725') : color,
                  fillColor: color,
                  fillOpacity: 0.9,
                  weight: isSelected ? 3 : 1.5,
                }}
                eventHandlers={{
                  click: () => onSelectLocation(sector),
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <div className="font-bold text-text-primary mb-1">{sector.name}</div>
                    <div className="text-[11px] text-text-muted mb-2 font-mono">
                      {formatCoords(sector.latitude, sector.longitude)}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-text-secondary text-[11px]">Risk Level:</span>
                      <RiskBadge level={sector.risk_level} score={sector.risk_score} size="sm" />
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
      </MapContainer>
    </div>
  );
}
