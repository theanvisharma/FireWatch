import React from 'react';
import { Info } from 'lucide-react';

export function SimulationDisclaimer({ inline = false, className = '' }) {
  if (inline) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-panel bg-bg-elevated border border-border-subtle text-[11px] text-text-secondary ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5B34A] animate-pulse" />
        <span className="font-semibold text-text-primary">SIMULATION MODE</span>
        <span className="text-text-muted hidden sm:inline">| Prototype Data</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-card bg-bg-card border border-border-subtle text-xs text-text-secondary shadow-subtle ${className}`}
    >
      <div className="w-5 h-5 rounded-panel flex items-center justify-center bg-[#D5B34A]/10 text-[#D5B34A] flex-shrink-0">
        <Info className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 text-[11px] sm:text-xs leading-relaxed">
        <span className="font-semibold text-text-primary">SIMULATED SATELLITE TELEMETRY:</span> FireWatch AI
        is running in developer prototype simulation mode. Satellite telemetry, weather feeds, and
        ML risk scores are synthesized for architectural testing.
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded-panel bg-bg-elevated border border-border-subtle text-text-muted font-mono font-medium hidden md:inline">
        v1.0-DEV
      </span>
    </div>
  );
}
