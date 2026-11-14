import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';

export function TrendLineChart({ data = [], height = 240 }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const sampleData = data.length > 0 ? data : [
    { date: 'Nov 08', risk: 52, temp: 33, moisture: 26 },
    { date: 'Nov 09', risk: 68, temp: 36, moisture: 20 },
    { date: 'Nov 10', risk: 74, temp: 38, moisture: 16 },
    { date: 'Nov 11', risk: 82, temp: 39, moisture: 13 },
    { date: 'Nov 12', risk: 89, temp: 41, moisture: 10 },
    { date: 'Nov 13', risk: 85, temp: 38, moisture: 14 },
    { date: 'Nov 14', risk: 78, temp: 37, moisture: 15 },
  ];

  const gridColor = isDark ? '#202526' : '#E5E9E7';
  const axisColor = isDark ? '#697270' : '#8E9995';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-card border border-border-subtle rounded-card p-3 shadow-elevated text-xs font-mono">
          <div className="text-text-primary font-semibold mb-1.5">{label}</div>
          {payload.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 py-0.5">
              <span className="capitalize text-text-secondary">{item.name}:</span>
              <span className="font-bold text-text-primary">
                {item.value}
                {item.name === 'temp' ? '°C' : '%'}
              </span>
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
        <AreaChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D97735" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#D97735" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D95343" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#D95343" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} />
          <YAxis stroke={axisColor} fontSize={11} tickLine={false} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="risk"
            name="Risk Score"
            stroke="#D97735"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#riskGradient)"
          />
          <Area
            type="monotone"
            dataKey="temp"
            name="Temperature"
            stroke="#D95343"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
