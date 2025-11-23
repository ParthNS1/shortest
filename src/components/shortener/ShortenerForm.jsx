import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShortener } from '../../hooks/useShortener';
import { useAuth } from '../../hooks/useAuth';
import { CreationStatus } from '../../types';
import { BASE_URL, SHORT_URL_PREFIX } from '../../config/constants';
import { copyToClipboard } from '../../utils/helpers';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

/**
 * Shortener Form Component
 * Main form for creating short URLs
 */
const ShortenerForm = () => {
    const [longUrl, setLongUrl] = useState('');
    const { user } = useAuth();
    const { status, error, shortCode, customCode, setCustomCode, createLink, reset } = useShortener(user?.uid);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!longUrl) return;

        await createLink(longUrl);
    };

    const handleCopy = async (text) => {
        const success = await copyToClipboard(text);
        if (success) {
            alert('Copied to clipboard!');
        }
    };

    const handleReset = () => {
        setLongUrl('');
        reset();
    };

    // Success view
    if (status === CreationStatus.SUCCESS && shortCode) {
        const shortUrl = `${BASE_URL}${SHORT_URL_PREFIX}${shortCode}`;
        const analyticsUrl = `${BASE_URL}/stats/${shortCode}`;

        return (
            <div className="animate-fade-in-up">
                <Card className="p-6 md:p-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-800">Link Ready! 🚀</h3>
                            <p className="text-gray-500 break-all">{longUrl}</p>
                        </div>

                        <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-brand-800 uppercase tracking-wider">Short Link</label>
                                <div className="flex gap-2 mt-1">
                                    <input
                                        readOnly
                                        value={shortUrl}
                                        className="flex-1 bg-white border border-brand-200 text-gray-900 text-lg p-2 rounded-md focus:outline-none"
                                    />
                                    <Button variant="primary" onClick={() => handleCopy(shortUrl)}>Copy</Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Analytics</label>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Live</span>
                            </div>
                            <div className="flex gap-2 mt-1 items-center">
                                <input
                                    readOnly
                                    value={analyticsUrl}
                                    className="flex-1 bg-white border border-gray-200 text-gray-500 text-sm p-2 rounded-md focus:outline-none"
                                />
                                <Link to={`/stats/${shortCode}`}>
                                    <Button variant="secondary" className="text-sm py-2">View</Button>
                                </Link>
                            </div>
                            {!user && (
                                <p className="text-xs text-gray-400">
                                    Save this link to track performance. Create an account for permanent analytics.
                                </p>
                            )}
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button variant="outline" onClick={handleReset}>Shorten Another</Button>
                            {user ? (
                                <Link to="/dashboard">
                                    <Button variant="ghost" className="text-brand-600">Go to Dashboard</Button>
                                </Link>
                            ) : (
                                <Link to="/signup">
                                    <Button variant="ghost" className="text-brand-600">Create Free Account</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // Form view
    return (
        <Card className="p-1 md:p-2 shadow-xl shadow-brand-100/50 border-none">
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                    <Input
                        placeholder="Paste a long URL (e.g., https://super-long-website.com/article/123)"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                        className="text-lg py-4"
                        icon={
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        }
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="flex items-center">
                                <span className="bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-lg px-3 py-3 text-sm font-mono">
                                    shortest.com/
                                </span>
                                <input
                                    placeholder="custom-alias (optional)"
                                    className="rounded-none rounded-r-lg border border-gray-300 block flex-1 min-w-0 sm:text-sm p-3 focus:ring-brand-500 focus:border-brand-500"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full md:w-auto min-w-[140px]"
                            isLoading={status === CreationStatus.CREATING || status === CreationStatus.CHECKING}
                        >
                            Shorten URL
                        </Button>
                    </div>
                </div>
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm text-center border border-red-100">
                        <strong>Error: </strong> {error}
                    </div>
                )}
            </form>
        </Card>
    );
};

export default ShortenerForm;
