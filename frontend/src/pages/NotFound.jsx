import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <div className="w-16 h-16 rounded-card bg-bg-elevated border border-border-subtle flex items-center justify-center text-brand-orange mb-4 shadow-card">
        <Flame className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-text-primary font-mono mb-2">404</h1>
      <h2 className="text-base font-bold text-text-primary mb-2">Sector Not Found</h2>
      <p className="text-xs text-text-secondary max-w-sm mb-6 leading-relaxed">
        The requested wildfire surveillance telemetry view or route does not exist in the active index.
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={Home}
          onClick={() => navigate('/')}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
