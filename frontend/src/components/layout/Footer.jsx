import React from 'react';
import { Flame, GitBranch, Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#2B3031] bg-[#141718] px-6 py-4 text-xs text-[#697270] flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Flame className="w-3.5 h-3.5 text-[#D97735]" />
        <span className="font-medium text-[#929A98]">FireWatch AI</span>
        <span>— Geospatial Intelligence & Proactive Wildfire Risk Forecasting</span>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1.5 text-[#929A98]">
          <GitBranch className="w-3 h-3 text-[#D97735]" />
          Branch: develop
        </span>
        <span className="flex items-center gap-1.5 text-[#929A98]">
          <Layers className="w-3 h-3 text-[#43A879]" />
          4 Engineering Modules (Anvi, Vedant, Khushi, Piyusha)
        </span>
      </div>
    </footer>
  );
}

