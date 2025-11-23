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
 * @param {string} shortCode - Short code to get analytics for
 * @returns {Promise<Object>} Analytics data
 */
export const getAnalytics = async (shortCode) => {
    try {
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
        console.error('Error getting analytics:', error);
        throw error;
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
