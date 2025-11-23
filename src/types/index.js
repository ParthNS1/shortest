/**
 * Type Definitions for URL Shortener
 * These are JSDoc type definitions for better IDE support
 */

/**
 * @typedef {Object} ShortLink
 * @property {string} id - Firestore document ID
 * @property {string} originalUrl - The original long URL
 * @property {string} shortCode - The generated short code
 * @property {number} createdAt - Timestamp when link was created
 * @property {number} totalClicks - Total number of clicks
 * @property {string|null} [userId] - User ID if authenticated, null for guest
 * @property {number} [lastClickedAt] - Timestamp of last click
 */

/**
 * @typedef {Object} ClickEvent
 * @property {string} [id] - Firestore document ID
 * @property {string} shortCode - The short code that was clicked
 * @property {number} timestamp - When the click occurred
 * @property {string} referrer - Where the user came from
 * @property {string} userAgent - Browser user agent string
 * @property {string} [country] - Country of the user (simulated)
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {number} totalClicks - Total number of clicks
 * @property {Array<{date: string, count: number}>} clicksOverTime - Clicks grouped by date
 * @property {Array<{name: string, value: number}>} referrers - Top referrers
 * @property {Array<{name: string, value: number}>} devices - Device breakdown
 */

/**
 * @typedef {Object} User
 * @property {string} uid - Firebase user ID
 * @property {string} email - User email
 * @property {string} [displayName] - User display name
 */

/**
 * Creation Status Enum
 * @readonly
 * @enum {string}
 */
export const CreationStatus = {
    IDLE: 'IDLE',
    CHECKING: 'CHECKING',
    CREATING: 'CREATING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};
