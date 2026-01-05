import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight, ShoppingBag, DollarSign, Users, Package, ChevronRight, Truck } from '../common/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const DashboardHome: React.FC = () => {
  const { orders, products, config } = useStore();
  const primaryColor = config.primaryColor;
  const currency = config.currency;

  const stats = [
    { title: "Total Revenue", value: `${currency}12,450`, change: "+15%", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { title: "Active Orders", value: orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length, change: "+2", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Customers", value: "1,203", change: "+18%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Low Stock", value: products.filter(p => p.stock < 10).length, change: "Alert", icon: Package, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  const chartData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Here's what's happening in your store today.</p>
        </div>
        <button 
            className="px-4 py-2 text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{ backgroundColor: primaryColor }}
        >
            <ArrowUpRight size={18} />
            <span>View Reports</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">
                        {stat.change} vs last week
                    </span>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon size={22} />
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Revenue</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChartWrapper data={chartData} color={primaryColor} />
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Truck size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                <p className="text-xs text-gray-500">{order.items.length} items • {currency}{order.total}</p>
                            </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                            {order.status}
                        </span>
                    </div>
                ))}
            </div>
            <button className="mt-4 text-sm font-medium flex items-center justify-center gap-1 hover:underline" style={{ color: primaryColor }}>
                View All Orders <ChevronRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

// Helper for chart to isolate Recharts logic
const AreaChartWrapper = ({ data, color }: { data: any[], color: string }) => (
    <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            itemStyle={{ color: color, fontWeight: 600 }}
        />
        <Line type="monotone" dataKey="sales" stroke={color} strokeWidth={3} dot={{ fill: color, strokeWidth: 2, r: 4, stroke: '#fff' }} activeDot={{ r: 6 }} />
    </LineChart>
);

export default DashboardHome;