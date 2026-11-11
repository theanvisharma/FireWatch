import { RISK_LEVELS, RISK_COLORS, RISK_BG_COLORS, RISK_BORDER_COLORS } from './constants';

export function formatRiskScore(score) {
  if (score === null || score === undefined) return '--';
  return `${Number(score).toFixed(1)}%`;
}

export function formatCoords(lat, lon) {
  if (lat === undefined || lon === undefined) return '--';
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`;
}

export function formatDateTime(isoString) {
  if (!isoString) return '--';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatTimeAgo(isoString) {
  if (!isoString) return '--';
  const past = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function getRiskStyles(level) {
  const lvl = level || RISK_LEVELS.LOW;
  return {
    color: RISK_COLORS[lvl] || RISK_COLORS.Low,
    backgroundColor: RISK_BG_COLORS[lvl] || RISK_BG_COLORS.Low,
    borderColor: RISK_BORDER_COLORS[lvl] || RISK_BORDER_COLORS.Low,
  };
}

