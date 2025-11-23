import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShortLink } from '../services/urlService';
import { useAnalytics } from '../hooks/useAnalytics';
import { BASE_URL, SHORT_URL_PREFIX } from '../config/constants';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * Stats Page
 * Displays analytics for a specific short link
 */
const StatsPage = () => {
    const { code } = useParams();
    const [link, setLink] = useState(null);
    const [linkLoading, setLinkLoading] = useState(true);
    const { analytics, loading: analyticsLoading, error } = useAnalytics(code);

    useEffect(() => {
        const loadLink = async () => {
            try {
                setLinkLoading(true);
                const linkData = await getShortLink(code);
                setLink(linkData);
            } catch (err) {
                console.error('Error loading link:', err);
            } finally {
                setLinkLoading(false);
            }
        };

        if (code) {
            loadLink();
        }
    }, [code]);

    if (linkLoading || analyticsLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                    <p className="mt-4 text-gray-500">Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (!link) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className="p-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h2>
                    <p className="text-gray-500 mb-6">The short link you're looking for doesn't exist.</p>
                    <Link to="/">
                        <Button variant="primary">Create a Short Link</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className="p-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Analytics</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <Link to="/">
                        <Button variant="primary">Go Home</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const shortUrl = `${BASE_URL}${SHORT_URL_PREFIX}${code}`;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <Link to="/" className="text-brand-600 hover:text-brand-700 text-sm font-medium mb-4 inline-block">
                    ← Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Analytics</h1>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                        <p className="text-sm text-gray-500">Short URL</p>
                        <p className="text-lg font-semibold text-brand-600">{shortUrl}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-500">Original URL</p>
                        <p className="text-sm text-gray-900 truncate">{link.originalUrl}</p>
                    </div>
                </div>
            </div>

            {/* Analytics Dashboard */}
            {analytics && (
                <AnalyticsDashboard
                    data={analytics}
                    originalUrl={link.originalUrl}
                    shortCode={code}
                />
            )}
        </div>
    );
};

export default StatsPage;
