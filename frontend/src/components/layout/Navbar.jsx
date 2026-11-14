import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Flame,
  LayoutDashboard,
  MapPin,
  Sparkles,
  History,
  Bell,
  Info,
  Menu,
  X,
  User,
  Shield,
  ChevronDown,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { LocationSearch } from '../common/LocationSearch';

export function Navbar() {
  const { unreadCount, isMockMode, selectedLocation } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'Risk Map', icon: MapPin },
    { to: '/predictions', label: 'Predictions', icon: Sparkles },
    { to: '/historical', label: 'Historical Data', icon: History },
    { to: '/alerts', label: 'Alerts', icon: Bell, badge: unreadCount },
    { to: '/about', label: 'About', icon: Info },
  ];

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-secondary/95 border-b border-border-subtle backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="FireWatch AI Home"
          >
            <div className="w-8 h-8 rounded-panel bg-brand-orange/12 border border-brand-orange/30 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-200 shadow-subtle">
              <Flame className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-sm tracking-wide text-text-primary">
                  FIREWATCH
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-brand-orange/15 text-brand-orange border border-brand-orange/20">
                  AI
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-text-muted mt-0.5 font-medium">
                Wildfire Intelligence
              </span>
            </div>
          </NavLink>

          {/* Center/Left: Horizontal Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-panel text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-bg-elevated text-brand-orange font-semibold shadow-subtle border border-border-subtle'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-risk-veryHigh text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Quick Search + Theme Toggle + User Profile + Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          {/* Quick Location Search Input (Desktop) */}
          <div className="hidden xl:block w-64">
            <LocationSearch placeholder="Search location..." />
          </div>

          {/* Theme Toggle (Sun/Moon switch) */}
          <ThemeToggle />

          {/* User Profile / Avatar with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1.5 rounded-panel hover:bg-bg-elevated border border-transparent hover:border-border-subtle transition-all duration-150 focus:outline-none"
              aria-expanded={profileDropdownOpen}
              aria-label="User profile menu"
            >
              <div className="w-7 h-7 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange font-bold text-xs">
                HQ
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-text-primary leading-tight">
                  Forest Command
                </span>
                <span className="text-[10px] text-text-muted leading-tight">National Bureau</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted hidden sm:inline" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-card bg-bg-card border border-border-subtle shadow-elevated p-3 z-50 animate-fade-in text-xs">
                <div className="pb-3 border-b border-border-subtle mb-2">
                  <div className="font-semibold text-text-primary">Forest Fire Emergency HQ</div>
                  <div className="text-[11px] text-text-muted">officer@firewatch.gov.in</div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#43A879] font-medium font-mono">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>Surveillance Active (24/7)</span>
                  </div>
                </div>

                <div className="space-y-1 text-text-secondary">
                  <div className="flex items-center justify-between py-1 px-2 rounded-panel hover:bg-bg-elevated">
                    <span>Engine Mode:</span>
                    <span className="font-mono text-[10px] font-bold text-brand-orange">
                      {isMockMode ? 'SIMULATION' : 'LIVE REST API'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-panel hover:bg-bg-elevated">
                    <span>Selected Sector:</span>
                    <span className="font-mono text-[10px] text-text-primary truncate max-w-[110px]">
                      {selectedLocation?.name?.split(' ')[0] || 'Western Ghats'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-panel hover:bg-bg-elevated">
                    <span>Role Permissions:</span>
                    <span className="font-medium text-text-primary">Admin / Analyst</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px]">
                  <NavLink
                    to="/about"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="text-brand-orange hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>System Architecture</span>
                    <ExternalLink className="w-3 h-3" />
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-panel text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-border-subtle transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-bg-secondary px-4 py-3 space-y-2 animate-fade-in shadow-elevated">
          <div className="mb-3">
            <LocationSearch onSelect={() => setMobileMenuOpen(false)} />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2.5 rounded-panel text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-bg-elevated text-brand-orange font-semibold border border-border-subtle'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-risk-veryHigh text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
