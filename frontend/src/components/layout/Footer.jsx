import React from 'react';
import { Flame, GitBranch, Layers, ShieldCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary px-6 py-5 text-xs text-text-muted mt-auto transition-colors duration-200">
      <div className="max-w-[1480px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-brand-orange/15 text-brand-orange">
            <Flame className="w-3 h-3" />
          </div>
          <span className="font-semibold text-text-primary">FireWatch AI</span>
          <span>— National Wildfire Ignition Forecasting Platform</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-[11px]">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <ShieldCheck className="w-3 h-3 text-[#43A879]" />
            v1.0.0 Monorepo
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <Layers className="w-3 h-3 text-brand-orange" />
            4 Decoupled Modules (Anvi, Vedant, Khushi, Piyusha)
          </span>
          <NavLink
            to="/about"
            className="hover:text-text-primary transition-colors hover:underline"
          >
            Documentation & System Architecture
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
