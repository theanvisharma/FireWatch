import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-[#202526] border border-[#2B3031] flex items-center justify-center text-[#D97735] mb-4">
        <Flame className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-[#F2F2EF] font-mono mb-2">404</h1>
      <h2 className="text-base font-semibold text-[#F2F2EF] mb-2">Coordinate Sector Not Found</h2>
      <p className="text-xs text-[#929A98] max-w-sm mb-6 leading-relaxed">
        The requested surveillance telemetry coordinate or view does not exist in the active FireWatch index.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-panel text-xs font-medium bg-[#191D1E] hover:bg-[#202526] text-[#F2F2EF] border border-[#2B3031] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Go Back</span>
        </button>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-panel text-xs font-semibold bg-[#D97735] hover:bg-[#B96932] text-[#F2F2EF] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
}

