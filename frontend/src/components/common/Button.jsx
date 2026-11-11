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
    'inline-flex items-center justify-center gap-2 rounded-panel font-medium text-xs tracking-wide transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[#D97735] hover:bg-[#B96932] text-[#F2F2EF] shadow-sm font-semibold active:scale-[0.99]',
    secondary:
      'bg-[#202526] hover:bg-[#2B3031] text-[#F2F2EF] border border-[#2B3031] hover:border-[#3D4446]',
    outline:
      'border border-[#2B3031] text-[#929A98] hover:text-[#F2F2EF] hover:border-[#3D4446] bg-transparent',
    ghost:
      'text-[#929A98] hover:text-[#F2F2EF] hover:bg-[#202526] bg-transparent',
    danger:
      'bg-[#D95343]/15 text-[#D95343] border border-[#D95343]/30 hover:bg-[#D95343]/25',
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-[11px]',
    md: 'px-3.5 py-2 text-xs',
    lg: 'px-4 py-2.5 text-sm',
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
        <Icon className="w-3.5 h-3.5" />
      ) : null}
      {children}
    </button>
  );
}

