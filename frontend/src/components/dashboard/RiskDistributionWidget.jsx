import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskPieChart } from '../charts/RiskPieChart';

export function RiskDistributionWidget({ distribution = [] }) {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <CardHeader
        title="Risk Distribution"
        subtitle="Zonal wildfire severity categorisation"
      />
      <div className="my-auto">
        <RiskPieChart data={distribution} height={190} />
      </div>
      <div className="mt-4 pt-3 border-t border-[#2B3031] text-[11px] text-[#697270] text-center">
        Thresholds calibrated according to NWCG Canadian & Indian forest indices.
      </div>
    </Card>
  );
}

