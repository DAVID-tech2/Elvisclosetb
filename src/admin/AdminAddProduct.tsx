import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  UploadCloud,
  X,
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Code,
  Check,
  Package,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { ProductSize } from '../types';

export const AdminAddProduct: React.FC = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('editId');
  const { showToast } = useStore();
  const navigate = useNavigate();

  // Form Fields matching screenshot `file_00000000cc888211a040eb3cff607f66_1b11231e.png`
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("Men's Fashion");
  const [brand, setBrand] = useState("Elvis' Closet");
  const [price, setPrice] = useState('185000');
  const [comparePrice, setComparePrice] = useState('220000');
  const [stockQuantity, setStockQuantity] = useState('45');
  const [stockStatus, setStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [visibility, setVisibility] = useState<'public' | 'draft' | 'archived'>('public');

  // Images list
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1625910513413-5bc1334c2d33?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=400&q=80',
  ]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Sizes & Colours
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>(['S', 'M', 'L', 'XL', 'XXL']);
  const [selectedColors, setSelectedColors] = useState<string[]>(['Black', 'White', 'Navy']);
  const [otherColor, setOtherColor] = useState('');

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  useEffect(() => {
    if (editId) {
      const existing = storeService.getProductById(editId);
      if (existing) {
        setName(existing.name);
        setDescription(existing.description);
        setCategory(existing.category);
        setBrand(existing.brand || '');
        setPrice(existing.price.toString());
        setComparePrice(existing.comparePrice ? existing.comparePrice.toString() : '');
        setStockQuantity(existing.stockQuantity.toString());
        setStockStatus(existing.stockStatus);
        setVisibility(existing.visibility);
        setImages(existing.images);
        setSelectedSizes(existing.sizes);
        setSelectedColors(existing.colors.map((c) => c.name));
        setMetaTitle(existing.name);
        setMetaDesc(existing.description.slice(0, 150));
      }
    }
  }, [editId]);

  const handleToggleSize = (sz: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const handleToggleColor = (col: string) => {
    setSelectedColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter a product name', 'error');
      return;
    }

    const colorObjects = selectedColors.map((c) => ({
      name: c,
      hex:
        c === 'Black'
          ? '#111827'
          : c === 'White'
          ? '#F9FAFB'
          : c === 'Navy'
          ? '#1E3A8A'
          : c === 'Red'
          ? '#DC2626'
          : c === 'Grey'
          ? '#6B7280'
          : '#B45309',
    }));

    if (otherColor.trim()) {
      colorObjects.push({ name: otherColor.trim(), hex: '#111827' });
    }

    const saved = storeService.saveProduct({
      id: editId || undefined,
      name,
      description,
      category,
      collection: category.toLowerCase().includes('men')
        ? 'men'
        : category.toLowerCase().includes('women')
        ? 'women'
        : category.toLowerCase().includes('shoe')
        ? 'shoes'
        : 'accessories',
      brand,
      price: parseInt(price, 10) || 0,
      comparePrice: comparePrice ? parseInt(comparePrice, 10) : undefined,
      stockQuantity: parseInt(stockQuantity, 10) || 0,
      stockStatus,
      visibility,
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80'
      ],
      sizes: selectedSizes,
      colors: colorObjects,
      isBestSeller: true,
      isNewArrival: true,
    });

    showToast(`Saved product "${saved.name}" successfully!`, 'success');
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Breadcrumb matching screenshot `file_00000000cc888211a040eb3cff607f66_1b11231e.png` */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Link to="/admin" className="hover:text-[#F97316]">
          Dashboard
        </Link>
        <span>&gt;</span>
        <Link to="/admin/products" className="hover:text-[#F97316]">
          Products Management
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-bold">
          {editId ? 'Edit Product' : 'Add New Product'}
        </span>
      </div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center shadow-xs">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {editId ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-xs text-gray-500">
              Fill in the details below to add or update a product in your boutique store.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </div>

      {/* 2 Column Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols): Info, Details, Inventory */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Product Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Product Information
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter product name (e.g. Classic Polo Shirt)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F97316] text-gray-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              {/* Rich text formatting bar matching screenshot */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 text-gray-600">
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Bold">
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Italic">
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Underline">
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Bullet List">
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Numbered List">
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Align Left">
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Align Center">
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Align Right">
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Link">
                    <Link2 className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Image">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Code">
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter product description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 text-xs focus:outline-none text-gray-800 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 2. Product Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Product Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 font-medium"
                >
                  <option value="Men's Fashion">Men's Fashion</option>
                  <option value="Women's Fashion">Women's Fashion</option>
                  <option value="Footwear">Footwear / Shoes</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bags">Bags</option>
                  <option value="Watches">Watches</option>
                  <option value="Perfumes">Perfumes</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Brand (optional)</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Price (UGX) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 185000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Compare Price (UGX) (optional)
                </label>
                <input
                  type="number"
                  placeholder="Enter original price (e.g. 220000)"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 3. Inventory & Publishing */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Inventory & Publishing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 45"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Stock Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 font-medium"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Visibility <span className="text-red-500">*</span>
                </label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 font-medium"
                >
                  <option value="public">Public</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Product Images, Sizes & Colours, SEO */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Product Images Dropzone matching screenshot */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Product Images
            </h3>

            {/* Drag & Drop Upload Container */}
            <div className="border-2 border-dashed border-gray-200 hover:border-[#F97316] rounded-2xl p-6 text-center space-y-2 bg-gray-50/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">
                  Drag & drop images here or enter image URL
                </p>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  Supports JPG, PNG, WebP (Max 5MB each)
                </span>
              </div>

              <div className="flex gap-2 pt-2 max-w-sm mx-auto">
                <input
                  type="url"
                  placeholder="Paste image URL (https://...)"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3 py-1.5 bg-[#F97316] text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Thumbnail preview list with Delete (x) button */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group"
                >
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const demoImages = [
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
                    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
                    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
                  ];
                  const pick = demoImages[Math.floor(Math.random() * demoImages.length)];
                  setImages((prev) => [...prev, pick]);
                }}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#F97316] flex flex-col items-center justify-center text-gray-500 hover:text-[#F97316] text-[10px] font-bold gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 text-[#F97316]" />
                <span>Add More</span>
              </button>
            </div>
          </div>

          {/* 2. Sizes & Colours matching screenshot */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Sizes & Colours
            </h3>

            {/* Available Sizes Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Available Sizes <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((sz) => (
                  <label
                    key={sz}
                    className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      selectedSizes.includes(sz)
                        ? 'bg-orange-50 border-[#F97316] text-[#F97316]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(sz)}
                      onChange={() => handleToggleSize(sz)}
                      className="accent-[#F97316]"
                    />
                    <span>{sz}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Available Colours Chips & Custom input */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Available Colours <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {[
                  { name: 'Black', hex: '#111827' },
                  { name: 'White', hex: '#FFFFFF' },
                  { name: 'Navy', hex: '#1E3A8A' },
                  { name: 'Blue', hex: '#2563EB' },
                  { name: 'Red', hex: '#DC2626' },
                  { name: 'Grey', hex: '#9CA3AF' },
                  { name: 'Beige', hex: '#D7C4B7' },
                  { name: 'Green', hex: '#16A34A' },
                ].map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => handleToggleColor(col.name)}
                    title={col.name}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      selectedColors.includes(col.name)
                        ? 'border-[#F97316] ring-2 ring-orange-200 scale-110'
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {selectedColors.includes(col.name) && (
                      <Check className={`w-3.5 h-3.5 ${col.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Other colour (optional)"
                  value={otherColor}
                  onChange={(e) => setOtherColor(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 3. SEO & Additional Options */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> SEO & Additional Options
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">Meta Title (SEO)</label>
                <input
                  type="text"
                  placeholder="Enter meta title (optional)"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  placeholder="Enter meta description (optional)"
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
