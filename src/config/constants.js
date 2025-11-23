/**
 * Application Constants
 * Central location for all app-wide constants
 */

// URL Configuration
export const BASE_URL = window.location.origin;
export const SHORT_URL_PREFIX = '/r/';

// Firestore Collections
export const COLLECTIONS = {
    LINKS: 'links',
    CLICKS: 'clicks',
    USERS: 'users'
};

// Short Code Configuration
export const SHORT_CODE_LENGTH = 6;
export const SHORT_CODE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Analytics Configuration
export const ANALYTICS_CHART_COLORS = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
};

// UI Configuration
export const TOAST_DURATION = 3000;
export const DEBOUNCE_DELAY = 300;
