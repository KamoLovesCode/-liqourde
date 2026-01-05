import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Check, ShoppingBag, ArrowUpRight } from '../common/Icons';

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { config } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center">
        <div className="bg-green-500 h-32 flex items-center justify-center relative overflow-hidden">
            <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-32 -left-10"></div>
            <div className="absolute w-40 h-40 bg-white/10 rounded-full bottom-0 -right-10"></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-[bounce_1s_ease-in-out_1]">
                <Check size={40} className="text-green-500" strokeWidth={3} />
            </div>
        </div>
        
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-6">
                Thank you for your purchase. We've received your order and will begin processing it shortly.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
                <p className="text-lg font-mono font-bold text-gray-900">{id}</p>
            </div>

            <div className="space-y-3">
                <button 
                    onClick={() => navigate('/')}
                    className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{ backgroundColor: config.primaryColor }}
                >
                    <ShoppingBag size={18} /> Continue Shopping
                </button>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3.5 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                    Track Order in Dashboard <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
            A confirmation email has been sent to your inbox.
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
