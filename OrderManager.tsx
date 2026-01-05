import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import { Search, Filter, Eye, Clock, Calendar, Check, X, Truck, ChevronRight } from '../common/Icons';

const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus, config } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
           <h1 className="font-serif text-2xl font-bold text-gray-900">Orders</h1>
           <p className="text-gray-500">Manage customer orders and shipments.</p>
        </div>
        <div className="flex gap-2">
            <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock size={16} />
                <span>Pending: {orders.filter(o => o.status === 'pending').length}</span>
            </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID or Customer..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
         </div>
         <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {['All', 'pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'].map(status => (
                <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                        statusFilter === status 
                            ? `bg-gray-900 text-white border-gray-900` 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                    style={statusFilter === status ? { backgroundColor: config.primaryColor, borderColor: config.primaryColor } : {}}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ')}
                </button>
            ))}
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">
                                {order.id}
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                <p className="text-xs text-gray-500">{order.items.length} items</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    {new Date(order.date).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {config.currency}{order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status.replace(/-/g, ' ')}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => setSelectedOrder(order)}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="opacity-40" />
                </div>
                <p>No orders found matching your criteria.</p>
            </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
            onUpdateStatus={updateOrderStatus}
            primaryColor={config.primaryColor}
            currency={config.currency}
        />
      )}
    </div>
  );
};

const OrderDetailsModal = ({ order, onClose, onUpdateStatus, primaryColor, currency }: { order: Order, onClose: () => void, onUpdateStatus: (id: string, status: Order['status']) => void, primaryColor: string, currency: string }) => {
    const [status, setStatus] = useState<Order['status']>(order.status);

    const handleSave = () => {
        onUpdateStatus(order.id, status);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="font-serif text-xl font-bold text-gray-900">Order {order.id}</h2>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {status.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Customer & Shipping Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Truck size={16} /> Delivery Details
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                <p>{order.deliveryAddress}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Contact Info</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>{order.customerEmail}</p>
                                <p>{order.customerPhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Order Items</h3>
                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-500">Item</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-500 text-right">Price</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-500 text-right">Qty</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-500 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {order.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {item.image ? (
                                                        <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                                            <span className="text-xs text-gray-400">No Img</span>
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 text-right">{currency}{item.price.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.quantity}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{currency}{(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900 text-right">Total</td>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right" style={{ color: primaryColor }}>{currency}{order.total.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Status Management */}
                    <div className="pt-4 border-t border-gray-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Order Status</label>
                        <div className="flex gap-3">
                            <select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value as Order['status'])}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="out-for-delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <button 
                                onClick={handleSave}
                                className="px-6 py-2 rounded-lg text-white font-medium shadow-sm hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: primaryColor }}
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;