import ShortenerForm from '../components/shortener/ShortenerForm';

/**
 * Home Page
 * Landing page with URL shortener form
 */
const HomePage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4">
                    Shorten your links. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
                        Expand your reach.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                    The privacy-friendly URL shortener with instant guest analytics.
                    No credit card, no signup, no nonsense.
                </p>
            </div>

            <div className="relative z-10">
                <ShortenerForm />
            </div>

            {/* Social Proof / Features Grid */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-xl bg-white border border-gray-50 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        ⚡
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Instant Shortening</h3>
                    <p className="text-sm text-gray-500">Create short links in milliseconds. Simple and fast.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-gray-50 shadow-sm">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        📊
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Real-time Analytics</h3>
                    <p className="text-sm text-gray-500">Track clicks, referrers, and device types instantly.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-gray-50 shadow-sm">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        🔒
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Privacy First</h3>
                    <p className="text-sm text-gray-500">Your data is secure and never shared with third parties.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
