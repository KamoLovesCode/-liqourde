import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, Plus, Check } from '../common/Icons';

const StoreHome: React.FC = () => {
  const { config, products, addToCart, cart } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const isInCart = (id: number) => cart.some(item => item.productId === id);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
            <img src={config.heroImage} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gray-900/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">{config.heroHeadline}</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">{config.heroSubheadline}</p>
            <button 
                onClick={() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-xl"
            >
                Shop Now
            </button>
        </div>
      </div>

      {/* Categories */}
      <div id="shop-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat 
                            ? 'text-white shadow-md transform scale-105' 
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={activeCategory === cat ? { backgroundColor: config.primaryColor } : {}}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Product Grid */}
        <div className={`grid gap-6 ${config.layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredProducts.map(product => (
                <div 
                    key={product.id} 
                    className={`bg-white rounded-xl border border-gray-100 overflow-hidden group transition-all hover:shadow-lg ${config.layout === 'list' ? 'flex items-center gap-6 p-4' : 'flex flex-col'}`}
                >
                    <div 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className={`relative overflow-hidden cursor-pointer ${config.layout === 'list' ? 'w-32 h-32 rounded-lg flex-shrink-0' : 'h-64 w-full'}`}
                    >
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        {product.comparePrice && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                SALE
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    </div>
                    
                    <div className={`flex-1 ${config.layout === 'grid' ? 'p-5' : ''}`}>
                        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                        <h3 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="font-serif font-bold text-gray-900 text-lg mb-1 leading-tight cursor-pointer hover:text-gray-700 transition-colors"
                        >
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{product.volume} • {product.abv ? `${product.abv}% ABV` : ''}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-col">
                                {product.comparePrice && (
                                    <span className="text-xs text-gray-400 line-through">{config.currency}{product.comparePrice.toFixed(2)}</span>
                                )}
                                <span className="text-lg font-bold text-gray-900" style={{ color: config.primaryColor }}>
                                    {config.currency}{product.price.toFixed(2)}
                                </span>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product, 1);
                                }}
                                disabled={isInCart(product.id) || product.stock === 0}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                                    isInCart(product.id) 
                                        ? 'bg-green-100 text-green-600' 
                                        : product.stock === 0 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                                style={!isInCart(product.id) && product.stock > 0 ? { backgroundColor: config.primaryColor } : {}}
                            >
                                {isInCart(product.id) ? <Check size={20} /> : <Plus size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Feature Banners */}
      <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Wine" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 text-white">
                        <h3 className="font-serif text-3xl font-bold mb-2">Vintage Collection</h3>
                        <p className="opacity-90 mb-4">Explore our curated selection of fine wines.</p>
                        <span className="underline font-medium">Shop Wine</span>
                    </div>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Spirits" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 text-white">
                        <h3 className="font-serif text-3xl font-bold mb-2">Craft Spirits</h3>
                        <p className="opacity-90 mb-4">Discover local distilleries and rare finds.</p>
                        <span className="underline font-medium">Shop Spirits</span>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default StoreHome;