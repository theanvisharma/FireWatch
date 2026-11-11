import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  History,
  Bell,
  Info,
  Flame,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Sidebar({ collapsed = false, onCloseMobile = () => {} }) {
  const { unreadCount, isMockMode } = useApp();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'Interactive Risk Map', icon: MapPin },
    { to: '/historical', label: 'Historical Data', icon: History },
    { to: '/alerts', label: 'Alerts & Warnings', icon: Bell, badge: unreadCount },
    { to: '/about', label: 'About FireWatch AI', icon: Info },
  ];

  return (
    <aside className="w-64 bg-[#141718] border-r border-[#2B3031] flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center px-5 border-b border-[#2B3031]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D97735]/15 border border-[#D97735]/30 flex items-center justify-center text-[#D97735]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-wide text-[#F2F2EF]">FIREWATCH</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-[#D97735]/20 text-[#E69A5C]">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[#697270] tracking-wider uppercase">Forecasting Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-semibold tracking-wider uppercase text-[#697270]">
            Intelligence Views
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-panel text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#202526] text-[#F2F2EF] border-l-2 border-[#D97735] pl-2.5 font-semibold'
                      : 'text-[#929A98] hover:text-[#F2F2EF] hover:bg-[#191D1E]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D95343] text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer Box */}
      <div className="p-4 border-t border-[#2B3031] space-y-3">
        <div className="p-3 rounded-panel bg-[#191D1E] border border-[#2B3031]">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-[#929A98] flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#43A879] animate-pulse" />
              Engine Status
            </span>
            <span className="font-mono text-[10px] text-[#43A879] font-medium">ONLINE</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#697270]">
            <span>Mode:</span>
            <span className="font-mono text-[#D5B34A]">{isMockMode ? 'SIMULATION' : 'LIVE API'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] text-[#697270]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            v1.0.0 Architecture
          </span>
          <span className="font-mono">4 Modules</span>
        </div>
      </div>
    </aside>
  );
}

