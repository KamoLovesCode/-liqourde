import React, { useState } from 'react';
// FIX: Affirm existing import for useStore to address "Module has no exported member" errors
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, ImageIcon, X } from '../common/Icons';

const ProductManager: React.FC = () => {
  const { products, deleteProduct, addProduct, updateProduct, config } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const currency = config.currency;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
           <h1 className="font-serif text-2xl font-bold text-gray-900">Products</h1>
           <p className="text-gray-500">Manage your inventory and catalog.</p>
        </div>
        <button 
            onClick={handleAddNew}
            className="px-4 py-2 text-white rounded-lg shadow-sm hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: config.primaryColor }}
        >
            <Plus size={18} />
            <span>Add Product</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name or category..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm">
            <Filter size={16} />
            <span>Filter</span>
         </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.volume} • {product.abv}% ABV</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {product.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-900 font-medium">
                                {currency}{product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm text-gray-600">{product.stock} in stock</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEdit(product)}
                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
                No products found matching your search.
            </div>
        )}
      </div>

      {isModalOpen && (
        <ProductModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            product={editingProduct} 
            onSave={(p: Product) => { // FIX: Explicitly type 'p' as Product
                if (editingProduct) {
                    updateProduct(editingProduct.id, p);
                } else {
                    addProduct(p);
                }
                setIsModalOpen(false);
            }}
            config={config}
        />
      )}
    </div>
  );
};

// FIX: Define explicit types for ProductModal props
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onSave: (product: Product) => void;
    config: { currency: string, primaryColor: string };
}

const ProductModal = ({ isOpen, onClose, product, onSave, config }: ProductModalProps) => {
    const [formData, setFormData] = useState<Partial<Product>>(product || {
        name: '',
        category: 'Spirits',
        subcategory: '',
        price: 0,
        stock: 0,
        description: '',
        sku: '',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400', // Default image placeholder
        abv: 0,
        volume: '',
        featured: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { // FIX: Type e for handleChange
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
                    <h2 className="font-serif text-xl font-bold text-gray-900">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Aged Whiskey" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none">
                                <option>Spirits</option>
                                <option>Wine</option>
                                <option>Beer</option>
                                <option>Mixers</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                            <input type="text" name="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="e.g. Bourbon" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ({config.currency})</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" step="0.01" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Qty</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">ABV (%)</label>
                            <input type="number" name="abv" value={formData.abv} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" step="0.1" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                            <input type="text" name="volume" value={formData.volume} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="e.g. 750ml" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg outline-none" rows={3}></textarea>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="rounded text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as Featured Product</label>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                    <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button onClick={() => onSave(formData as Product)} className="px-4 py-2 text-white rounded-lg shadow-sm hover:opacity-90" style={{ backgroundColor: config.primaryColor }}>Save Product</button>
                </div>
            </div>
        </div>
    );
}

export default ProductManager;