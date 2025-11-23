import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortLink, incrementClickCount, recordClickEvent } from '../services/urlService';

/**
 * Redirect Handler Page
 * Handles short link redirects and analytics tracking
 */
const RedirectHandler = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleRedirect = async () => {
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

                // Record click event (fire and forget)
                recordClickEvent(code, referrer, userAgent).catch(err =>
                    console.error('Failed to record click:', err)
                );

                // Increment click count (fire and forget)
                incrementClickCount(link.id).catch(err =>
                    console.error('Failed to increment count:', err)
                );

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
