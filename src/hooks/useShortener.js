import { useState } from 'react';
import { createShortLink, checkShortCodeExists } from '../services/urlService';
import { isValidUrl } from '../utils/helpers';
import { CreationStatus } from '../types';

/**
 * Custom hook for URL shortening functionality
 * @param {string|null} userId - Current user ID
 * @returns {Object} Shortener state and functions
 */
export const useShortener = (userId = null) => {
    const [status, setStatus] = useState(CreationStatus.IDLE);
    const [error, setError] = useState(null);
    const [shortCode, setShortCode] = useState('');
    const [customCode, setCustomCode] = useState('');

    /**
     * Create a new short link
     * @param {string} url - URL to shorten
     * @returns {Promise<string|null>} Short code or null if failed
     */
    const createLink = async (url) => {
        // Reset state
        setError(null);
        setShortCode('');

        // Validate URL
        if (!url || !isValidUrl(url)) {
            setError('Please enter a valid URL');
            setStatus(CreationStatus.ERROR);
            return null;
        }

        try {
            // Check if custom code exists (if provided)
            if (customCode) {
                setStatus(CreationStatus.CHECKING);
                const exists = await checkShortCodeExists(customCode);
                if (exists) {
                    setError('Custom short code already exists');
                    setStatus(CreationStatus.ERROR);
                    return null;
                }
            }

            // Create the short link
            setStatus(CreationStatus.CREATING);
            const result = await createShortLink(url, userId, customCode || null);

            setShortCode(result.shortCode);
            setStatus(CreationStatus.SUCCESS);
            setCustomCode(''); // Reset custom code

            return result.shortCode;
        } catch (err) {
            console.error('Error creating short link:', err);
            setError(err.message || 'Failed to create short link');
            setStatus(CreationStatus.ERROR);
            return null;
        }
    };

    /**
     * Reset the shortener state
     */
    const reset = () => {
        setStatus(CreationStatus.IDLE);
        setError(null);
        setShortCode('');
        setCustomCode('');
    };

    return {
        status,
        error,
        shortCode,
        customCode,
        setCustomCode,
        createLink,
        reset
    };
};
