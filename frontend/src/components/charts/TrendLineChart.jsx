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

export function TrendLineChart({ data = [], height = 240 }) {
  const sampleData = data.length > 0 ? data : [
    { date: 'Nov 05', risk: 45, temp: 31, moisture: 30 },
    { date: 'Nov 06', risk: 52, temp: 33, moisture: 26 },
    { date: 'Nov 07', risk: 68, temp: 36, moisture: 20 },
    { date: 'Nov 08', risk: 74, temp: 38, moisture: 16 },
    { date: 'Nov 09', risk: 82, temp: 39, moisture: 13 },
    { date: 'Nov 10', risk: 89, temp: 41, moisture: 10 },
    { date: 'Nov 11', risk: 85, temp: 38, moisture: 14 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#191D1E] border border-[#2B3031] rounded-panel p-2.5 shadow-elevated text-xs font-mono">
          <div className="text-[#929A98] mb-1 font-semibold">{label}</div>
          {payload.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 py-0.5">
              <span className="capitalize text-[#929A98]">{item.name}:</span>
              <span className="font-bold text-[#F2F2EF]">
                {item.value}
                {item.name === 'temp' ? '°C' : item.name === 'risk' ? '%' : '%'}
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
              <stop offset="5%" stopColor="#D97735" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#D97735" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D95343" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#D95343" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#202526" />
          <XAxis dataKey="date" stroke="#697270" fontSize={11} tickLine={false} />
          <YAxis stroke="#697270" fontSize={11} tickLine={false} domain={[0, 100]} />
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

