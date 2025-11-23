import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../config/constants';
import { getDeviceType, formatDate } from '../utils/helpers';

/**
 * Analytics Service
 * Handles analytics data retrieval and processing
 */

/**
 * Get analytics data for a specific short code
 * 
 * This function queries Firestore for click events. It requires a composite index
 * on (shortCode, timestamp). If the index doesn't exist, it automatically falls back
 * to a simpler query and sorts the results in memory.
 * 
 * To create the index, run: firebase deploy --only firestore:indexes
 * Or click the link in the Firebase Console error message.
 * 
 * @param {string} shortCode - Short code to get analytics for
 * @returns {Promise<Object>} Analytics data with totalClicks, clicksOverTime, referrers, and devices
 */
export const getAnalytics = async (shortCode) => {
    try {
        // Try to query with ordering (requires composite index)
        const q = query(
            collection(db, COLLECTIONS.CLICKS),
            where('shortCode', '==', shortCode),
            orderBy('timestamp', 'desc')
        );

        const snapshot = await getDocs(q);
        const clicks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return processAnalyticsData(clicks);
    } catch (error) {
        // If index is missing, fall back to query without ordering
        if (error.code === 'failed-precondition' || error.message?.includes('index')) {
            console.warn('Firestore index not found, using fallback query');

            try {
                // Fallback query without ordering
                const fallbackQuery = query(
                    collection(db, COLLECTIONS.CLICKS),
                    where('shortCode', '==', shortCode)
                );

                const snapshot = await getDocs(fallbackQuery);
                const clicks = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort in memory instead
                clicks.sort((a, b) => {
                    // Handle both Firestore Timestamp objects and numeric timestamps
                    const timeA = typeof a.timestamp === 'number'
                        ? a.timestamp
                        : (a.timestamp?.toMillis?.() || 0);
                    const timeB = typeof b.timestamp === 'number'
                        ? b.timestamp
                        : (b.timestamp?.toMillis?.() || 0);
                    return timeB - timeA;
                });

                return processAnalyticsData(clicks);
            } catch (fallbackError) {
                console.error('Error in fallback query:', fallbackError);
                // Return empty analytics data instead of throwing
                return {
                    totalClicks: 0,
                    clicksOverTime: [],
                    referrers: [],
                    devices: []
                };
            }
        }

        console.error('Error getting analytics:', error);
        // Return empty analytics data instead of throwing
        return {
            totalClicks: 0,
            clicksOverTime: [],
            referrers: [],
            devices: []
        };
    }
};

/**
 * Process raw click data into analytics format
 * @param {Array} clicks - Array of click events
 * @returns {Object} Processed analytics data
 */
const processAnalyticsData = (clicks) => {
    const totalClicks = clicks.length;

    // Process clicks over time (group by date)
    const clicksByDate = {};
    clicks.forEach(click => {
        const date = formatDate(click.timestamp);
        clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });

    const clicksOverTime = Object.entries(clicksByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Process referrers
    const referrerCounts = {};
    clicks.forEach(click => {
        const referrer = click.referrer || 'Direct';
        referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    const referrers = Object.entries(referrerCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Top 5 referrers

    // Process devices
    const deviceCounts = {};
    clicks.forEach(click => {
        const device = getDeviceType(click.userAgent);
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    const devices = Object.entries(deviceCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    return {
        totalClicks,
        clicksOverTime,
        referrers,
        devices
    };
};

/**
 * Get total analytics for a user (all their links)
 * @param {Array} userLinks - Array of user's links
 * @returns {Promise<Object>} Aggregated analytics
 */
export const getUserAnalytics = async (userLinks) => {
    try {
        const totalLinks = userLinks.length;
        const totalClicks = userLinks.reduce((sum, link) => sum + (link.totalClicks || 0), 0);

        // Get most clicked link
        const mostClickedLink = userLinks.reduce((max, link) =>
            (link.totalClicks || 0) > (max.totalClicks || 0) ? link : max
            , userLinks[0] || {});

        return {
            totalLinks,
            totalClicks,
            mostClickedLink
        };
    } catch (error) {
        console.error('Error getting user analytics:', error);
        throw error;
    }
};
