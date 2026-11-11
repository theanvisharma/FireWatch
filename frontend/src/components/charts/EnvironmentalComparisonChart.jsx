import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function EnvironmentalComparisonChart({ sectors = [], height = 240 }) {
  const chartData = sectors.slice(0, 6).map((s) => ({
    name: s.name.split(' ')[0], // short name
    fullName: s.name,
    temperature: s.factors.temperature,
    wind_speed: s.factors.wind_speed,
    soil_moisture: s.factors.soil_moisture,
    risk_score: s.risk_score,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const full = payload[0]?.payload?.fullName || label;
      return (
        <div className="bg-[#191D1E] border border-[#2B3031] rounded-panel p-2.5 shadow-elevated text-xs font-mono">
          <div className="text-[#F2F2EF] font-semibold mb-1">{full}</div>
          {payload.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 py-0.5">
              <span className="text-[#929A98]">{item.name}:</span>
              <span className="font-bold text-[#F2F2EF]">{item.value}</span>
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
          <CartesianGrid strokeDasharray="3 3" stroke="#202526" />
          <XAxis dataKey="name" stroke="#697270" fontSize={11} tickLine={false} />
          <YAxis stroke="#697270" fontSize={11} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="temperature" name="Temp (°C)" fill="#DB873A" radius={[3, 3, 0, 0]} />
          <Bar dataKey="wind_speed" name="Wind (km/h)" fill="#D5B34A" radius={[3, 3, 0, 0]} />
          <Bar dataKey="soil_moisture" name="Soil Moisture (%)" fill="#43A879" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

