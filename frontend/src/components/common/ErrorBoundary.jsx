import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

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
        <div className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-[#191D1E] border border-[#2B3031] rounded-panel m-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#D95343]/15 text-[#D95343] flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#F2F2EF] mb-2">Component Rendering Error</h3>
          <p className="text-xs text-[#929A98] max-w-md mb-4 font-mono">
            {this.state.error?.message || 'An unexpected runtime error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-panel bg-[#202526] hover:bg-[#2B3031] text-[#F2F2EF] border border-[#2B3031]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Interface
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

