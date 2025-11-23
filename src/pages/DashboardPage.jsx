import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getUserLinks } from '../services/urlService';
import { getUserAnalytics } from '../services/analyticsService';
import LinkList from '../components/dashboard/LinkList';
import Card from '../components/common/Card';

/**
 * Dashboard Page
 * User dashboard showing all their short links
 */
const DashboardPage = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [links, setLinks] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            loadUserData();
        }
    }, [user]);

    const loadUserData = async () => {
        try {
            setLoading(true);
            const userLinks = await getUserLinks(user.uid);
            setLinks(userLinks);

            const stats = await getUserAnalytics(userLinks);
            setAnalytics(stats);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (linkId) => {
        // In a real app, you'd call a delete service here
        // For now, just remove from state
        setLinks(links.filter(link => link.id !== linkId));
    };

    if (authLoading || loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                    <p className="mt-4 text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage your short links and view analytics</p>
            </div>

            {/* Analytics Summary */}
            {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Links</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{analytics.totalLinks}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Clicks</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{analytics.totalClicks}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Most Clicked</h3>
                        <p className="mt-2 text-lg font-bold text-gray-900 truncate">
                            {analytics.mostClickedLink?.shortCode || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">{analytics.mostClickedLink?.totalClicks || 0} clicks</p>
                    </Card>
                </div>
            )}

            {/* Links List */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Links</h2>
                <LinkList links={links} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default DashboardPage;
