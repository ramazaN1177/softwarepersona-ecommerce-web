import React, { useState, useEffect } from 'react';
import { X, BookPlus, Save } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import type { Category } from '../types/book';

const categories: Category[] = [
  'Roman & Edebiyat',
  'Yazılım & Teknoloji',
  'Kişisel Gelişim',
  'Tarih & Felsefe',
  'Bilim Kurgu & Fantastik'
];

export const BookFormModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, editingBook, setEditingBook, addBook, updateBook } = useBookContext();

  const isOpen = isAddModalOpen || editingBook !== null;
  const isEditing = editingBook !== null;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 100,
    category: 'Roman & Edebiyat' as Category,
    description: '',
    coverImage: '',
    stock: 10,
    pages: 250,
    rating: 4.5
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        price: editingBook.price,
        category: editingBook.category as Category,
        description: editingBook.description,
        coverImage: editingBook.coverImage,
        stock: editingBook.stock,
        pages: editingBook.pages || 250,
        rating: editingBook.rating || 4.5
      });
    } else {
      setFormData({
        title: '',
        author: '',
        price: 100,
        category: 'Roman & Edebiyat',
        description: '',
        coverImage: '',
        stock: 10,
        pages: 250,
        rating: 4.5
      });
    }
  }, [editingBook, isAddModalOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAddModalOpen(false);
    setEditingBook(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.price) {
      alert('Lütfen gerekli tüm alanları doldurun!');
      return;
    }

    const defaultImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80';
    const finalData = {
      ...formData,
      coverImage: formData.coverImage.trim() || defaultImage
    };

    if (isEditing && editingBook) {
      updateBook(editingBook.id, finalData);
    } else {
      addBook(finalData);
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#faf7f2] border border-[#e5dac8] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8dfd1] bg-[#f4ebe1]">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#6f4e37] text-[#faf7f2] rounded-xl shadow-sm">
              {isEditing ? <Save className="h-5 w-5" /> : <BookPlus className="h-5 w-5" />}
            </div>
            <h3 className="text-lg font-bold text-[#3d2b1f]">
              {isEditing ? 'Kitap Bilgilerini Güncelle' : 'Yeni Kitap Ekle'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-[#785942] hover:text-[#3d2b1f] hover:bg-[#e9dfce] rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kitap Adı */}
            <div>
              <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Kitap Adı *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Örn: Nutuk"
                className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
              />
            </div>

            {/* Yazar */}
            <div>
              <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Yazar *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                placeholder="Örn: M. Kemal Atatürk"
                className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Fiyat */}
            <div>
              <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Fiyat (₺) *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
              />
            </div>

            {/* Stok */}
            <div>
              <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Stok Adedi *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Kategori</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fotoğraf URL */}
          <div>
            <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Kapak Fotoğrafı URL</label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={formData.coverImage}
                onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
              />
            </div>
          </div>

          {/* Canlı Fotoğraf Önizlemesi */}
          {formData.coverImage && (
            <div className="flex items-center space-x-3 p-2.5 bg-[#eaf3ed] rounded-xl border border-[#cce3d3]">
              <img src={formData.coverImage} alt="Önizleme" className="w-12 h-16 object-cover rounded-lg shadow-sm" />
              <span className="text-xs text-[#2e6f40] font-bold">Fotoğraf Önizleme Başarılı</span>
            </div>
          )}

          {/* Açıklama */}
          <div>
            <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Kitap Açıklaması</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Kitabın özeti, konusu veya detayları..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
            />
          </div>

          {/* Footer Butonları */}
          <div className="pt-4 border-t border-[#e8dfd1] flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-sm font-semibold text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl transition"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-[#faf7f2] bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] hover:to-[#774f2a] rounded-xl shadow-md transition"
            >
              {isEditing ? 'Değişiklikleri Kaydet' : 'Kitabı Ekle'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
