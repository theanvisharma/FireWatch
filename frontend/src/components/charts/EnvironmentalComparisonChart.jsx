import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';

export function EnvironmentalComparisonChart({ sectors = [], height = 240 }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const chartData = sectors.slice(0, 6).map((s) => ({
    name: s.name.split(' ')[0],
    fullName: s.name,
    temperature: s.factors.temperature,
    wind_speed: s.factors.wind_speed,
    soil_moisture: s.factors.soil_moisture,
    risk_score: s.risk_score,
  }));

  const gridColor = isDark ? '#202526' : '#E5E9E7';
  const axisColor = isDark ? '#697270' : '#8E9995';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const full = payload[0]?.payload?.fullName || label;
      return (
        <div className="bg-bg-card border border-border-subtle rounded-card p-3 shadow-elevated text-xs font-mono">
          <div className="text-text-primary font-bold mb-1.5">{full}</div>
          {payload.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 py-0.5">
              <span className="text-text-secondary">{item.name}:</span>
              <span className="font-bold text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={axisColor} fontSize={11} tickLine={false} />
          <YAxis stroke={axisColor} fontSize={11} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="temperature" name="Temp (°C)" fill="#DB873A" radius={[3, 3, 0, 0]} />
          <Bar dataKey="wind_speed" name="Wind (km/h)" fill="#D5B34A" radius={[3, 3, 0, 0]} />
          <Bar dataKey="soil_moisture" name="Soil Moisture (%)" fill="#43A879" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Re-export as ChartCard alias
export const ChartCard = EnvironmentalComparisonChart;
