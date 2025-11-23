import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import Card from '../common/Card';

/**
 * Analytics Dashboard Component
 * Displays analytics data with charts
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Analytics data
 * @param {string} props.originalUrl - Original URL
 * @param {string} props.shortCode - Short code
 */

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AnalyticsDashboard = ({ data, originalUrl, shortCode }) => {

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 text-center border-l-4 border-l-brand-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Clicks</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{data.totalClicks}</p>
                </Card>
                <Card className="p-6 text-center border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Top Referrer</h3>
                    <p className="text-xl font-bold text-gray-900 mt-2 truncate">
                        {data.referrers.length > 0 ? data.referrers.sort((a, b) => b.value - a.value)[0].name : 'None'}
                    </p>
                </Card>
                <Card className="p-6 text-center border-l-4 border-l-purple-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Status</h3>
                    <p className="text-xl font-bold text-green-600 mt-2">Active</p>
                </Card>
            </div>

            {/* Main Chart */}
            <Card className="p-6 h-80">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Clicks Over Time</h3>
                {data.clicksOverTime.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.clicksOverTime}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        No clicks recorded yet.
                    </div>
                )}
            </Card>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 h-72">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Referrers</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.referrers} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-6 h-72">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Devices</h3>
                    <div className="flex items-center justify-center h-full pb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.devices}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.devices.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
