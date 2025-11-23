import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    doc,
    query,
    where,
    updateDoc,
    increment,
    orderBy,
    limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../config/constants';
import { generateShortCode } from '../utils/helpers';

/**
 * URL Service
 * Handles all URL shortening and retrieval operations
 */

/**
 * Check if a short code already exists
 * @param {string} shortCode - Short code to check
 * @returns {Promise<boolean>} True if exists
 */
export const checkShortCodeExists = async (shortCode) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.LINKS),
            where('shortCode', '==', shortCode),
            limit(1)
        );
        const snapshot = await getDocs(q);
        return !snapshot.empty;
    } catch (error) {
        console.error('Error checking short code:', error);
        throw error;
    }
};

/**
 * Create a new short link
 * @param {string} originalUrl - Original URL to shorten
 * @param {string|null} userId - User ID if authenticated
 * @param {string} [customCode] - Optional custom short code
 * @returns {Promise<{id: string, shortCode: string}>} Created link info
 */
export const createShortLink = async (originalUrl, userId = null, customCode = null) => {
    try {
        let shortCode = customCode;

        // Generate unique short code if custom code not provided
        if (!shortCode) {
            do {
                shortCode = generateShortCode();
            } while (await checkShortCodeExists(shortCode));
        } else {
            // Check if custom code already exists
            const exists = await checkShortCodeExists(shortCode);
            if (exists) {
                throw new Error('Custom short code already exists');
            }
        }

        const linkData = {
            originalUrl,
            shortCode,
            createdAt: Date.now(),
            totalClicks: 0,
            userId,
            lastClickedAt: null
        };

        const docRef = await addDoc(collection(db, COLLECTIONS.LINKS), linkData);

        return {
            id: docRef.id,
            shortCode
        };
    } catch (error) {
        console.error('Error creating short link:', error);
        throw error;
    }
};

/**
 * Get a short link by its code
 * @param {string} shortCode - Short code to look up
 * @returns {Promise<Object|null>} Link data or null if not found
 */
export const getShortLink = async (shortCode) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.LINKS),
            where('shortCode', '==', shortCode),
            limit(1)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        console.error('Error getting short link:', error);
        throw error;
    }
};

/**
 * Get all links created by a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of user's links
 */
export const getUserLinks = async (userId) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.LINKS),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting user links:', error);
        throw error;
    }
};

/**
 * Increment click count for a short link
 * @param {string} linkId - Link document ID
 * @returns {Promise<void>}
 */
export const incrementClickCount = async (linkId) => {
    try {
        const linkRef = doc(db, COLLECTIONS.LINKS, linkId);
        await updateDoc(linkRef, {
            totalClicks: increment(1),
            lastClickedAt: Date.now()
        });
    } catch (error) {
        console.error('Error incrementing click count:', error);
        throw error;
    }
};

/**
 * Record a click event for analytics
 * @param {string} shortCode - Short code that was clicked
 * @param {string} referrer - Referrer URL
 * @param {string} userAgent - Browser user agent
 * @returns {Promise<void>}
 */
export const recordClickEvent = async (shortCode, referrer, userAgent) => {
    try {
        const clickData = {
            shortCode,
            timestamp: Date.now(),
            referrer: referrer || 'Direct',
            userAgent
        };

        await addDoc(collection(db, COLLECTIONS.CLICKS), clickData);
    } catch (error) {
        console.error('Error recording click event:', error);
        throw error;
    }
};
