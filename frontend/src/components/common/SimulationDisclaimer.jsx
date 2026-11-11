import React from 'react';
import { Info, AlertTriangle } from 'lucide-react';

export function SimulationDisclaimer({ inline = false, className = '' }) {
  if (inline) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#202526] border border-[#2B3031] text-[11px] text-[#929A98] ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5B34A] animate-pulse" />
        <span className="font-semibold text-[#D5B34A]">SIMULATION / DEMO DATA</span>
        <span className="text-[#697270]">| Prototype Mode</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 px-3.5 py-2 rounded-panel bg-[#191D1E] border border-[#2B3031] text-xs text-[#929A98] ${className}`}
    >
      <div className="w-5 h-5 rounded flex items-center justify-center bg-[#D5B34A]/10 text-[#D5B34A] flex-shrink-0">
        <Info className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1">
        <span className="font-medium text-[#F2F2EF]">DEMO DATASET ACTIVE:</span> FireWatch AI
        is running in developer prototype simulation mode. Satellite telemetry, weather feeds, and
        ML risk scores are simulated for architectural integration testing.
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded bg-[#202526] border border-[#2B3031] text-[#697270] font-mono">
        v1.0-DEV
      </span>
    </div>
  );
}

