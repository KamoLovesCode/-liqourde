import React, { useState } from 'react';
// FIX: Affirm existing import for useStore to address "Module has no exported member" errors
import { useStore } from '../../context/StoreContext';
import { PrimaryColorPreset } from '../../types';
import { Palette, LayoutDashboard, Monitor, Smartphone, Check, Menu, DollarSign, Plus } from '../common/Icons';

const StoreCustomizer: React.FC = () => {
  const { config, updateConfig } = useStore();
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  const presets = Object.values(PrimaryColorPreset);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6">
      {/* Settings Panel */}
      <div className="w-full lg:w-96 bg-white rounded-xl border border-gray-100 shadow-sm overflow-y-auto flex-shrink-0">
        <div className="p-5 border-b border-gray-100">
            <h2 className="font-serif text-lg font-bold text-gray-900">Design & Theme</h2>
            <p className="text-sm text-gray-500">Customize your storefront appearance.</p>
        </div>
        
        <div className="p-5 space-y-8">
            {/* Color Section */}
            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Primary Brand Color</label>
                <div className="grid grid-cols-4 gap-3">
                    {presets.map(color => (
                        <button
                            key={color}
                            onClick={() => updateConfig({ primaryColor: color })}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${config.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                            style={{ backgroundColor: color }}
                        >
                            {config.primaryColor === color && <Check size={16} className="text-white" />}
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    <label className="block text-xs text-gray-500 mb-1">Custom Hex</label>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: config.primaryColor }}></div>
                        <input 
                            type="text" 
                            value={config.primaryColor}
                            onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-sm font-mono"
                        />
                    </div>
                </div>
            </div>

            {/* Store Details */}
            <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900">Store Information</label>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Store Name</label>
                    <input 
                        type="text" 
                        value={config.storeName}
                        onChange={(e) => updateConfig({ storeName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Currency Symbol</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input 
                            type="text" 
                            value={config.currency}
                            onChange={(e) => updateConfig({ currency: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
                            placeholder="e.g. $, £, €"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Hero Headline</label>
                    <input 
                        type="text" 
                        value={config.heroHeadline}
                        onChange={(e) => updateConfig({ heroHeadline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                </div>
                 <div>
                    <label className="block text-xs text-gray-500 mb-1">Hero Subheadline</label>
                    <textarea 
                        value={config.heroSubheadline}
                        onChange={(e) => updateConfig({ heroSubheadline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        rows={2}
                    />
                </div>
            </div>

             {/* Layout Options */}
             <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Product Layout</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => updateConfig({ layout: 'grid' })}
                        className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${config.layout === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <LayoutDashboard size={16} className="mr-2" /> Grid
                    </button>
                    <button 
                         onClick={() => updateConfig({ layout: 'list' })}
                         className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${config.layout === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <Menu size={16} className="mr-2" /> List
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 flex flex-col bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Live Preview</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1.5 rounded ${deviceView === 'desktop' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                    <Monitor size={18} />
                </button>
                <button 
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1.5 rounded ${deviceView === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                    <Smartphone size={18} />
                </button>
            </div>
        </div>
        
        <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-gray-200/50">
            <div 
                className={`bg-white shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${deviceView === 'mobile' ? 'w-[375px] h-[700px] rounded-3xl border-8 border-gray-800' : 'w-full h-full rounded-lg border border-gray-200'}`}
            >
                {/* Mock Header */}
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 flex-shrink-0">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold" style={{ backgroundColor: config.primaryColor }}>S</div>
                    <div className="font-serif font-bold text-gray-900">{config.storeName}</div>
                    <div className="w-8"></div>
                </div>

                {/* Mock Hero */}
                <div className="relative h-48 bg-gray-900 flex-shrink-0">
                    <img src={config.heroImage} className="w-full h-full object-cover opacity-60" alt="Hero" />
                    <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
                        <h2 className="font-serif text-2xl font-bold mb-2">{config.heroHeadline}</h2>
                        <p className="text-sm opacity-90 mb-8 max-w-2xl mx-auto">{config.heroSubheadline}</p>
                        <button className="mt-4 px-4 py-2 rounded-md text-xs font-bold w-fit bg-white text-gray-900">SHOP NOW</button>
                    </div>
                </div>

                {/* Mock Products */}
                <div className="p-4 bg-gray-50 flex-1 overflow-hidden">
                    <h3 className="font-serif font-bold text-gray-900 mb-3 text-sm">Featured Collection</h3>
                    <div className={`grid gap-3 ${config.layout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {[1, 2, 3, 4].map(i => (
                             <div key={i} className={`bg-white p-3 rounded-lg shadow-sm border border-gray-100 ${config.layout === 'list' ? 'flex gap-3 items-center' : ''}`}>
                                <div className={`bg-gray-200 rounded-md ${config.layout === 'grid' ? 'h-24 w-full mb-2' : 'h-16 w-16 flex-shrink-0'}`}></div>
                                <div>
                                    <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                                    <div className="mt-2 text-xs font-bold" style={{ color: config.primaryColor }}>{config.currency}29.99</div>
                                </div>
                                {config.layout === 'list' && (
                                    <button className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: config.primaryColor }}>
                                        <Plus size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCustomizer;