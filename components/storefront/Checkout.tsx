import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Check, CreditCard, Lock, MapPin, ChevronRight, AlertCircle, Trash2, Plus } from '../common/Icons';
import { CURRENCY } from '../../constants';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, config, checkout } = useStore();
  
  // Checkout Steps
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [contact, setContact] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  // Payment State
  const [selectedCard, setSelectedCard] = useState<string>('saved-1'); // 'saved-1', 'saved-2', 'new'
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (e.target.name === 'number') {
        val = val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    if (e.target.name === 'expiry') {
        val = val.replace(/\D/g, '').replace(/^(\d{2})(\d{0,2})/, '$1/$2').trim();
    }
    setNewCard({ ...newCard, [e.target.name]: val });
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const orderId = checkout({
        name: `${contact.firstName} ${contact.lastName}`,
        email: contact.email,
        phone: contact.phone,
        address: `${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}`
      });
      setLoading(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any spirits yet.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 rounded-full text-white font-bold shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: config.primaryColor }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Checkout Steps */}
        <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact & Shipping */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step > 1 ? 'bg-green-500' : 'bg-gray-900'}`}>
                            {step > 1 ? <Check size={14} /> : '1'}
                        </span>
                        Contact & Delivery
                    </h2>
                    {step === 2 && (
                        <button onClick={() => setStep(1)} className="text-sm text-blue-600 font-medium hover:underline">Edit</button>
                    )}
                </div>
                
                {step === 1 && (
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input name="email" value={contact.email} onChange={handleContactChange} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input name="firstName" value={contact.firstName} onChange={handleContactChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input name="lastName" value={contact.lastName} onChange={handleContactChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input name="address" value={contact.address} onChange={handleContactChange} type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="123 Main St" />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input name="city" value={contact.city} onChange={handleContactChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input name="state" value={contact.state} onChange={handleContactChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                <input name="zip" value={contact.zip} onChange={handleContactChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input name="phone" value={contact.phone} onChange={handleContactChange} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <button 
                            onClick={() => setStep(2)}
                            className="w-full py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all mt-4"
                            style={{ backgroundColor: config.primaryColor }}
                        >
                            Continue to Payment
                        </button>
                    </div>
                )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${step === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">2</span>
                        Payment Method
                    </h2>
                </div>
                
                {step === 2 && (
                    <div className="p-6">
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Payment Method</h3>
                            
                            <div className="space-y-3">
                                {/* Saved Card 1 */}
                                <div 
                                    onClick={() => setSelectedCard('saved-1')}
                                    className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedCard === 'saved-1' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-10 h-6 bg-gray-800 rounded mr-4"></div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-sm">Visa ending in 4242</p>
                                        <p className="text-xs text-gray-500">Expires 12/24</p>
                                    </div>
                                    {selectedCard === 'saved-1' && <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white"><Check size={12}/></div>}
                                </div>

                                {/* Saved Card 2 */}
                                <div 
                                    onClick={() => setSelectedCard('saved-2')}
                                    className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedCard === 'saved-2' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-10 h-6 bg-orange-600 rounded mr-4"></div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-sm">Mastercard ending in 8888</p>
                                        <p className="text-xs text-gray-500">Expires 09/25</p>
                                    </div>
                                    {selectedCard === 'saved-2' && <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white"><Check size={12}/></div>}
                                </div>

                                {/* Add New Card */}
                                <div 
                                    onClick={() => setSelectedCard('new')}
                                    className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedCard === 'new' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-10 h-6 border-2 border-dashed border-gray-300 rounded mr-4 flex items-center justify-center">
                                        <Plus className="text-gray-400" size={14} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-sm">Add New Card</p>
                                    </div>
                                    {selectedCard === 'new' && <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white"><Check size={12}/></div>}
                                </div>
                            </div>
                        </div>

                        {/* New Card Form */}
                        {selectedCard === 'new' && (
                            <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                                <div className="flex flex-col md:flex-row gap-6 mb-6">
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Card Number</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="text" 
                                                    name="number"
                                                    value={newCard.number}
                                                    onChange={handleCardChange}
                                                    maxLength={19}
                                                    placeholder="0000 0000 0000 0000"
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Name on Card</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={newCard.name}
                                                onChange={handleCardChange}
                                                placeholder="JOHN DOE"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Expiry</label>
                                                <input 
                                                    type="text" 
                                                    name="expiry"
                                                    value={newCard.expiry}
                                                    onChange={handleCardChange}
                                                    maxLength={5}
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">CVC</label>
                                                <input 
                                                    type="text" 
                                                    name="cvc"
                                                    value={newCard.cvc}
                                                    onChange={handleCardChange}
                                                    maxLength={3}
                                                    placeholder="123"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Visual Card Representation */}
                                    <div className="w-full md:w-80 h-48 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white shadow-xl relative flex flex-col justify-between overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                        <div className="relative z-10 flex justify-between items-start">
                                            <div className="w-12 h-8 bg-yellow-500/80 rounded-md"></div>
                                            <span className="font-mono text-sm opacity-70">DEBIT</span>
                                        </div>
                                        <div className="relative z-10">
                                            <div className="font-mono text-xl tracking-wider mb-4">
                                                {newCard.number || '0000 0000 0000 0000'}
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-[10px] opacity-70 uppercase tracking-widest">Card Holder</div>
                                                    <div className="font-medium tracking-wide uppercase">{newCard.name || 'YOUR NAME'}</div>
                                                </div>
                                                <div className="text-right">
                                                     <div className="text-[10px] opacity-70 uppercase tracking-widest">Expires</div>
                                                     <div className="font-medium">{newCard.expiry || 'MM/YY'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-8 pt-6 border-t border-gray-100">
                             <button 
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'}`}
                                style={{ backgroundColor: config.primaryColor }}
                            >
                                {loading ? (
                                    <>Processing Payment...</>
                                ) : (
                                    <>
                                        <Lock size={18} /> Pay {CURRENCY}{total.toFixed(2)}
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <Lock size={12} /> Secure 256-bit SSL Encrypted Payment
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Order Summary</h3>
                
                <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
                    {cart.map((item, idx) => (
                        <div key={`${item.productId}-${idx}`} className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                                {CURRENCY}{(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>{CURRENCY}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `${CURRENCY}${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Estimated Tax (8%)</span>
                        <span>{CURRENCY}{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                        <span>Total</span>
                        <span style={{ color: config.primaryColor }}>{CURRENCY}{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;