import { useState, useEffect } from 'react';
import { getAnalytics } from '../services/analyticsService';

/**
 * Custom hook for fetching and managing analytics data
 * @param {string} shortCode - Short code to get analytics for
 * @returns {Object} Analytics state
 */
export const useAnalytics = (shortCode) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!shortCode) {
            setLoading(false);
            return;
        }

        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAnalytics(shortCode);
                setAnalytics(data);
            } catch (err) {
                console.error('Error fetching analytics:', err);
                setError(err.message || 'Failed to load analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [shortCode]);

    return {
        analytics,
        loading,
        error
    };
};
