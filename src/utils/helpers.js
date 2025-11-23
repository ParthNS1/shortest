import { SHORT_CODE_LENGTH, SHORT_CODE_CHARS } from '../config/constants';

/**
 * Generates a random short code for URL shortening
 * @param {number} [length=SHORT_CODE_LENGTH] - Length of the short code
 * @returns {string} Random short code
 */
export const generateShortCode = (length = SHORT_CODE_LENGTH) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += SHORT_CODE_CHARS.charAt(Math.floor(Math.random() * SHORT_CODE_CHARS.length));
    }
    return result;
};

/**
 * Validates if a URL is properly formatted
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Formats a timestamp to a readable date string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Formats a timestamp to a readable date and time string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
};

/**
 * Extracts device type from user agent string
 * @param {string} userAgent - Browser user agent string
 * @returns {string} Device type (Mobile, Tablet, Desktop)
 */
export const getDeviceType = (userAgent) => {
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
    return 'Desktop';
};

/**
 * Gets a simulated country from referrer (for demo purposes)
 * In production, this would use a GeoIP service
 * @param {string} referrer - Referrer URL
 * @returns {string} Country name
 */
export const getSimulatedCountry = (referrer) => {
    const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'India', 'Australia'];
    return countries[Math.floor(Math.random() * countries.length)];
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
