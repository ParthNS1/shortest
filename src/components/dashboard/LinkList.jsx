import { Link } from 'react-router-dom';
import { BASE_URL, SHORT_URL_PREFIX } from '../../config/constants';
import { formatDate, formatDateTime, copyToClipboard } from '../../utils/helpers';
import Button from '../common/Button';
import Card from '../common/Card';

/**
 * Link List Component
 * Displays a list of user's short links
 * 
 * @param {Object} props - Component props
 * @param {Array} props.links - Array of link objects
 * @param {Function} props.onDelete - Delete handler function
 */
const LinkList = ({ links, onDelete }) => {
    if (links.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500 mb-4">You haven't created any links yet.</p>
                <Link to="/">
                    <Button variant="primary">Create your first link</Button>
                </Link>
            </div>
        );
    }

    const handleCopy = async (text) => {
        const success = await copyToClipboard(text);
        if (success) {
            alert('Copied!');
        }
    };

    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return 'Never';
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return formatDate(timestamp);
    };

    return (
        <div className="space-y-4">
            {links.map((link) => {
                const shortUrl = `${BASE_URL}${SHORT_URL_PREFIX}${link.shortCode}`;

                return (
                    <Card key={link.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold text-brand-600 truncate">{shortUrl}</h3>
                                    <button
                                        onClick={() => handleCopy(shortUrl)}
                                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <p className="text-gray-500 text-sm truncate max-w-md mb-2">{link.originalUrl}</p>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Created: {formatDate(link.createdAt)}
                                    </span>
                                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {link.totalClicks} clicks
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Last click: {formatTimeAgo(link.lastClickedAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
                                <Link to={`/stats/${link.shortCode}`} className="flex-1 md:flex-none">
                                    <Button variant="secondary" className="text-sm w-full md:w-auto h-9 py-0">Stats</Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="text-sm text-red-600 border-red-200 hover:bg-red-50 w-full md:w-auto flex-1 md:flex-none h-9 py-0"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this link?')) {
                                            onDelete(link.id);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default LinkList;
