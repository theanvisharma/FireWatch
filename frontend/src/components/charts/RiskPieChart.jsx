import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RISK_COLORS } from '../../utils/constants';

export function RiskPieChart({ data = [], height = 200 }) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-[#697270] text-center py-8">No distribution telemetry</div>;
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
        <div className="bg-[#191D1E] border border-[#2B3031] rounded-panel p-2 shadow-elevated text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="font-semibold text-[#F2F2EF]">{d.name} Risk</span>
          </div>
          <div className="text-[#929A98]">
            {d.value} locations ({d.percentage}%)
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
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#141718" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Minimal Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2 text-[11px] text-[#929A98]">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}:</span>
            <span className="font-medium text-[#F2F2EF]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

