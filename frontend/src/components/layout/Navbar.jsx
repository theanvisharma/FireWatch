import React, { useState, useEffect } from 'react';
import { Menu, Search, Clock, Satellite, Globe, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SimulationDisclaimer } from '../common/SimulationDisclaimer';
import { MOCK_SECTORS } from '../../services/mockData';

export function Navbar({ onOpenMobile = () => {} }) {
  const { selectedLocation, setSelectedLocation, isMockMode, addToast } = useApp();
  const [time, setTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredSectors = MOCK_SECTORS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 bg-[#141718] border-b border-[#2B3031] px-5 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Menu Button + Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 text-[#929A98] hover:text-[#F2F2EF] hover:bg-[#202526] rounded-panel"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Location Quick Selector / Search */}
        <div className="relative w-full">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-[#697270] pointer-events-none" />
            <input
              type="text"
              placeholder="Search monitored region or coordinates..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full bg-[#191D1E] border border-[#2B3031] focus:border-[#D97735] focus:outline-none rounded-panel pl-8 pr-3 py-1.5 text-xs text-[#F2F2EF] placeholder-[#697270] transition-colors"
            />
          </div>

          {/* Search Dropdown */}
          {isDropdownOpen && searchQuery && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#191D1E] border border-[#2B3031] rounded-panel shadow-elevated z-50 max-h-60 overflow-y-auto">
              {filteredSectors.length > 0 ? (
                filteredSectors.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => {
                      setSelectedLocation(sector);
                      setSearchQuery('');
                      setIsDropdownOpen(false);
                      addToast(`Selected: ${sector.name}`, 'info');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#202526] flex items-center justify-between border-b border-[#2B3031]/50 last:border-b-0"
                  >
                    <div>
                      <div className="font-medium text-[#F2F2EF]">{sector.name}</div>
                      <div className="text-[10px] text-[#929A98]">{sector.region}</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#D97735]">{sector.risk_score}% Risk</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-[#697270]">No matching sectors found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Telemetry Clock + Simulation Pill + Telemetry Sync */}
      <div className="flex items-center gap-3">
        {/* Simulation pill */}
        <SimulationDisclaimer inline={true} />

        {/* Clock */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-panel bg-[#191D1E] border border-[#2B3031] text-xs font-mono text-[#929A98]">
          <Clock className="w-3.5 h-3.5 text-[#697270]" />
          <span>{time}</span>
        </div>

        {/* Active Location Indicator */}
        {selectedLocation && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-panel bg-[#202526] border border-[#2B3031] text-xs">
            <Globe className="w-3.5 h-3.5 text-[#D97735]" />
            <span className="text-[#F2F2EF] font-medium max-w-[130px] truncate">{selectedLocation.name}</span>
          </div>
        )}
      </div>
    </header>
  );
}

