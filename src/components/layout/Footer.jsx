/**
 * Footer Component
 * Site footer with links and copyright information
 */
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="font-bold text-lg text-gray-900">Shortest</span>
                        <p className="mt-2 text-sm text-gray-500">
                            Simplifying links for everyone. Instant analytics, clean URLs, and privacy first.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Features</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Integrations</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">API Docs</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-100 pt-8">
                    <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} Shortest, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
