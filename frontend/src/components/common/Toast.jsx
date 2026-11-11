import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const icons = {
    success: <CheckCircle className="w-4 h-4 text-[#43A879]" />,
    error: <AlertCircle className="w-4 h-4 text-[#D95343]" />,
    warning: <AlertCircle className="w-4 h-4 text-[#D5B34A]" />,
    info: <Info className="w-4 h-4 text-[#D97735]" />,
  };

  return (
    <div className="pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-panel bg-[#191D1E] border border-[#2B3031] shadow-elevated text-xs text-[#F2F2EF] animate-fade-in">
      <div className="flex items-center gap-2.5">
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-[#697270] hover:text-[#F2F2EF] transition-colors p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

