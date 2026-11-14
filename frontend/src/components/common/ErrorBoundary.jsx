import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[FireWatch ErrorBoundary caught]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-bg-card border border-border-subtle rounded-card m-4 text-center shadow-card">
          <div className="w-12 h-12 rounded-panel bg-risk-veryHigh/10 border border-risk-veryHigh/20 text-risk-veryHigh flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-text-primary mb-2">Component Rendering Error</h3>
          <p className="text-xs text-text-secondary max-w-md mb-5 font-mono">
            {this.state.error?.message || 'An unexpected runtime error occurred.'}
          </p>
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={() => window.location.reload()}
          >
            Reload Interface
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
