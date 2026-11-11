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

// Map controller helper to smoothly pan/zoom when location selection changes
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

export function RiskMapContainer({
  sectors = [],
  selectedLocation,
  onSelectLocation = () => {},
  layers = { polygons: true, markers: true },
  height = '620px',
}) {
  const defaultCenter = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : [18.7557, 73.4091];

  return (
    <div
      style={{ height, width: '100%' }}
      className="rounded-panel overflow-hidden border border-[#2B3031] relative"
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

        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

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
                  color: isSelected ? '#F2F2EF' : color,
                  fillColor: color,
                  fillOpacity: isSelected ? 0.35 : 0.18,
                  weight: isSelected ? 2.5 : 1.2,
                  dashArray: isSelected ? '4, 4' : null,
                }}
                eventHandlers={{
                  click: () => onSelectLocation(sector),
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <div className="font-bold text-[#F2F2EF] mb-1">{sector.name}</div>
                    <div className="text-[11px] text-[#929A98] mb-2 font-mono">
                      {formatCoords(sector.latitude, sector.longitude)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#697270]">Predicted Risk:</span>
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
                  color: isSelected ? '#F2F2EF' : color,
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
                    <div className="font-bold text-[#F2F2EF] mb-1">{sector.name}</div>
                    <div className="text-[11px] text-[#929A98] mb-2 font-mono">
                      {formatCoords(sector.latitude, sector.longitude)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#697270]">Risk Level:</span>
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

