import React from 'react';

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  loading = false,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-panel font-medium text-xs tracking-wide transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-brand-orange hover:bg-brand-hover text-white font-semibold shadow-subtle active:scale-[0.99]',
    secondary:
      'bg-bg-elevated hover:bg-border-subtle text-text-primary border border-border-subtle hover:border-border-hover',
    outline:
      'border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-hover bg-transparent',
    ghost:
      'text-text-secondary hover:text-text-primary hover:bg-bg-elevated bg-transparent',
    danger:
      'bg-[#D95343]/10 text-[#D95343] border border-[#D95343]/20 hover:bg-[#D95343]/20',
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-[11px]',
    md: 'px-3.5 py-2 text-xs',
    lg: 'px-4.5 py-2.5 text-sm',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
