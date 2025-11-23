import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortLink, incrementClickCount, recordClickEvent } from '../services/urlService';

/**
 * Redirect Handler Page
 * Handles short link redirects and analytics tracking
 */
const RedirectHandler = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    const processingRef = useRef(false);

    useEffect(() => {
        const handleRedirect = async () => {
            if (processingRef.current) return;
            processingRef.current = true;

            if (!code) {
                navigate('/');
                return;
            }

            try {
                // Get the short link data
                const link = await getShortLink(code);

                if (!link) {
                    // Link not found
                    navigate('/');
                    return;
                }

                // Record analytics
                const referrer = document.referrer || 'Direct';
                const userAgent = navigator.userAgent;

                // Record analytics and increment count
                // We await these to ensure they are recorded before the page unloads
                try {
                    await Promise.all([
                        recordClickEvent(code, referrer, userAgent),
                        incrementClickCount(link.id)
                    ]);
                } catch (err) {
                    console.error('Failed to record analytics:', err);
                    // Continue to redirect even if analytics fail
                }

                // Redirect to original URL
                window.location.href = link.originalUrl;
            } catch (error) {
                console.error('Error handling redirect:', error);
                navigate('/');
            }
        };

        handleRedirect();
    }, [code, navigate]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Redirecting...</h2>
                <p className="text-gray-500 mt-2">Please wait while we redirect you</p>
            </div>
        </div>
    );
};

export default RedirectHandler;
