import React, { useState } from 'react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { FolderTree, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { showToast } = useStore();
  const [categories, setCategories] = useState<Category[]>(() => storeService.getCategories());
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [itemCount, setItemCount] = useState('24');
  const [isAdding, setIsAdding] = useState(false);

  const startEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setImage(cat.image);
    setItemCount(cat.itemCount.toString());
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setImage('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80');
    setItemCount('12');
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const cat: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      image,
      itemCount: parseInt(itemCount, 10) || 0,
      order: editingCategory ? editingCategory.order : categories.length + 1,
    };

    storeService.saveCategory(cat);
    setCategories(storeService.getCategories());
    setEditingCategory(null);
    setIsAdding(false);
    showToast(`Saved category "${cat.name}"`, 'success');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      storeService.deleteCategory(id);
      setCategories(storeService.getCategories());
      showToast(`Removed category "${name}"`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Categories Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize products by departments and update department showcase artwork.
          </p>
        </div>

        <button
          onClick={startAdd}
          className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Category
        </button>
      </div>

      {(isAdding || editingCategory) && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl p-6 border border-[#F97316]/40 shadow-sm space-y-4 text-xs animate-in fade-in"
        >
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <h3 className="font-extrabold text-sm text-gray-900">
              {editingCategory ? `Edit: ${editingCategory.name}` : 'Add New Category'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingCategory(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Circular Artwork URL</label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#F97316] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save Category
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingCategory(null);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-100 shrink-0"
              />
              <div>
                <h4 className="font-extrabold text-xs text-gray-900">{cat.name}</h4>
                <span className="text-[10px] text-gray-400 block">{cat.itemCount} items listed</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(cat)}
                className="p-1.5 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-[#F97316] rounded-lg transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
