import React, { useState } from 'react';
import { Search, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_SECTORS } from '../../services/mockData';

export function LocationSearch({ onSelect, className = '', placeholder = 'Search monitored region or coordinates...' }) {
  const { setSelectedLocation, addToast } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = MOCK_SECTORS.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.region.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (sector) => {
    setSelectedLocation(sector);
    if (onSelect) onSelect(sector);
    setQuery('');
    setIsOpen(false);
    addToast(`Selected: ${sector.name}`, 'info');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-3.5 h-3.5 absolute left-3 text-text-muted pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-bg-input border border-border-subtle focus:border-border-focus focus:outline-none rounded-panel pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted transition-colors shadow-subtle"
        />
      </div>

      {isOpen && query && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-bg-card border border-border-subtle rounded-card shadow-elevated z-50 max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((sector) => (
              <button
                key={sector.id}
                type="button"
                onClick={() => handleSelect(sector)}
                className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-bg-elevated flex items-center justify-between border-b border-border-subtle/40 last:border-b-0 transition-colors"
              >
                <div>
                  <div className="font-semibold text-text-primary">{sector.name}</div>
                  <div className="text-[10px] text-text-secondary">{sector.region}</div>
                </div>
                <span className="text-[10px] font-mono font-medium text-brand-orange">
                  {sector.risk_score}% Risk
                </span>
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-xs text-text-muted">No matching sectors found</div>
          )}
        </div>
      )}
    </div>
  );
}

