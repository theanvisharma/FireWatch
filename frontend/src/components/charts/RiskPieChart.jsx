import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RISK_COLORS } from '../../utils/constants';
import { useApp } from '../../context/AppContext';

export function RiskPieChart({ data = [], height = 200 }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  if (!data || data.length === 0) {
    return <div className="text-xs text-text-muted text-center py-8">No distribution telemetry</div>;
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.count,
    percentage: item.percentage,
    color: item.color || RISK_COLORS[item.category] || '#D97735',
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-bg-card border border-border-subtle rounded-card p-2.5 shadow-elevated text-xs font-sans">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="font-semibold text-text-primary">{d.name} Risk</span>
          </div>
          <div className="text-text-secondary text-[11px]">
            {d.value} sectors ({d.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={52}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={isDark ? '#141718' : '#FFFFFF'}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Clean Minimal Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-text-secondary">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}:</span>
            <span className="font-semibold text-text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
