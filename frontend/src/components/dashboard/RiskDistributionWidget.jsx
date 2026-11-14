import React from 'react';
import { Card, CardHeader } from '../common/Card';
import { RiskPieChart } from '../charts/RiskPieChart';

export function RiskDistributionWidget({ distribution = [] }) {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <CardHeader
        title="Risk Distribution"
        subtitle="Zonal wildfire severity categorization across monitored sectors"
      />
      <div className="my-auto py-2">
        <RiskPieChart data={distribution} height={190} />
      </div>
      <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] text-text-muted text-center">
        Calibrated according to Indian Forest Survey & Canadian FWI indices.
      </div>
    </Card>
  );
}
