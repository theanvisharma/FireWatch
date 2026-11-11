import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_SECTORS, MOCK_ALERTS } from '../services/mockData';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(MOCK_SECTORS[0]);
  const [toasts, setToasts] = useState([]);
  const [isMockMode, setIsMockMode] = useState(api.isMockMode());
  const [unreadCount, setUnreadCount] = useState(
    MOCK_ALERTS.filter((a) => !a.is_read).length
  );

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
  };

  const markAlertReadInContext = (alertId) => {
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <AppContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation: selectLocation,
        toasts,
        addToast,
        removeToast,
        isMockMode,
        setIsMockMode,
        unreadCount,
        markAlertReadInContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

