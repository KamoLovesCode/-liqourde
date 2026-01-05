import React, { useState } from 'react';
// FIX: Affirm existing import for useNavigate to address "Module has no exported member" errors
import { useNavigate } from 'react-router-dom';
// FIX: Affirm existing import for useStore to address "Module has no exported member" errors
import { useStore } from '../../context/StoreContext';
import { Check, CreditCard, Lock, MapPin, ChevronRight, AlertCircle, Trash2, Plus } from '../common/Icons';

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
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
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
                    <h2 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
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
                                <input name="firstName" value={contact.firstName} onChange={handleContactChange} type="