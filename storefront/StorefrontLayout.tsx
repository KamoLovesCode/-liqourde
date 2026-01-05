import React, { useState } from 'react';
// FIX: Affirm existing imports for react-router-dom to address "Module has no exported member" errors
import { Outlet, useNavigate } from 'react-router-dom';
// FIX: Affirm existing import for useStore to address "Module has no exported member" errors
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, Search, Menu, User, X, ShoppingBag } from '../common/Icons';

const StorefrontLayout: React.FC = () => {
  const { config, cart, removeFromCart } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 text-center px-4">
        Free delivery on orders over {config.currency}50 • Verify age at delivery
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-gray-600"><Menu size={24} /></button>
                <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: config.primaryColor }}>S</div>
                    <span className="font-serif font-bold text-xl tracking-tight hidden sm:block">{config.storeName}</span>
                </div>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for wine, beer, spirits..."
                        className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm transition-all outline-none border"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button 
                    onClick={() => navigate('/dashboard')} 
                    className="hidden sm:block text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-full"
                >
                    Owner Login
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <User size={22} />
                </button>
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
                >
                    <ShoppingCart size={22} />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-serif text-white font-bold text-xl mb-4">{config.storeName}</h3>
                <p className="text-sm leading-relaxed opacity-80">
                    Premium liquor delivery service. Bringing the best spirits directly to your doorstep.
                </p>
            </div>
            <div>
                <h4 className="font-serif text-white font-bold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Beer</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Wine</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Spirits</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-serif text-white font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-serif text-white font-bold mb-4">Contact</h4>
                <p className="text-sm mb-2">{config.contactEmail}</p>
                <p className="text-sm">{config.contactPhone}</p>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs opacity-50">
            © 2024 {config.storeName}. All rights reserved. Please drink responsibly.
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingCart size={20} /> Your Cart
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p>Your cart is empty.</p>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 px-6 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                                style={{ backgroundColor: config.primaryColor }}
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={`${item.productId}-${idx}`} className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{config.currency}{item.price.toFixed(2)}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                                        <button onClick={() => removeFromCart(item.productId)} className="text-xs text-red-500 hover:underline">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between mb-4 text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold text-gray-900">{config.currency}{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6 text-sm">
                            <span className="text-gray-600">Delivery</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <button 
                            className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg hover:opacity-95 transition-all transform active:scale-[0.99]"
                            style={{ backgroundColor: config.primaryColor }}
                            onClick={handleCheckout}
                        >
                            Checkout • {config.currency}{cartTotal.toFixed(2)}
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default StorefrontLayout;