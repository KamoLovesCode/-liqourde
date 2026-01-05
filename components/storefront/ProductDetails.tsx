import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Plus, Check, ChevronRight, Truck, Box, Tag } from '../common/Icons';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, cart, config } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === Number(id));

  // Reset state when ID changes
  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900">Product not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <span onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-900">Home</span>
          <ChevronRight size={14} className="mx-2" />
          <span className="cursor-pointer hover:text-gray-900">{product.category}</span>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-50 h-[500px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover mix-blend-multiply p-8"
            />
            {product.comparePrice && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                ON SALE
              </span>
            )}
          </div>

          {/* Details Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{product.subcategory || product.category}</span>
              {product.stock < 5 && product.stock > 0 && (
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Low Stock</span>
              )}
            </div>
            
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold" style={{ color: config.primaryColor }}>{config.currency}{product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-xl text-gray-400 line-through mb-1">{config.currency}{product.comparePrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                <Box className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Volume</p>
                  <p className="font-medium text-gray-900">{product.volume || '750ml'}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                <Tag className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">ABV</p>
                  <p className="font-medium text-gray-900">{product.abv ? `${product.abv}%` : 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 h-12 rounded-lg text-white font-bold shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                  style={{ backgroundColor: added ? '#22c55e' : config.primaryColor }}
                >
                  {added ? (
                    <>
                      <Check size={20} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus size={20} /> Add to Cart
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Truck size={16} />
                <span>Free delivery on orders over {config.currency}50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 border-t border-gray-100 pt-12">
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">You might also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <div 
                key={rp.id}
                onClick={() => navigate(`/product/${rp.id}`)}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden bg-gray-50">
                   <img src={rp.image} alt={rp.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="p-4">
                   <h4 className="font-serif font-bold text-gray-900 mb-1">{rp.name}</h4>
                   <p className="text-gray-500 text-sm mb-3">{config.currency}{rp.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;