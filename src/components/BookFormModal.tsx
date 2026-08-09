import React, { useState, useEffect } from 'react';
import { X, BookPlus, Save, Upload, Link as LinkIcon, Trash2, Crop } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import type { Category } from '../types/book';
import { ImageCropper } from './ImageCropper';

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

  const [uploadType, setUploadType] = useState<'url' | 'file'>('file');
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '' as string | number,
    category: 'Roman & Edebiyat' as Category,
    description: '',
    coverImage: '',
    stock: '' as string | number,
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
        price: 150,
        category: 'Roman & Edebiyat',
        description: '',
        coverImage: '',
        stock: 15,
        pages: 250,
        rating: 4.5
      });
    }
  }, [editingBook, isAddModalOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAddModalOpen(false);
    setEditingBook(null);
    setCropperSrc(null);
  };

  // Bilgisayardan Fotoğraf Yükleme ve Otomatik Kırpıcıyı Açma
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Görsel boyutu 5MB dan küçük olmalıdır!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropperSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBase64: string) => {
    setFormData(prev => ({ ...prev, coverImage: croppedBase64 }));
    setCropperSrc(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Number(formData.price);
    const parsedStock = Number(formData.stock);

    if (!formData.title || !formData.author || isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Lütfen geçerli bir kitap adı, yazar ve fiyat giriniz!');
      return;
    }

    const defaultImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80';
    const finalData = {
      ...formData,
      price: parsedPrice,
      stock: isNaN(parsedStock) ? 10 : parsedStock,
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
    <>
      {/* Kırpma Modalı */}
      {cropperSrc && (
        <ImageCropper
          imageSrc={cropperSrc}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropperSrc(null)}
        />
      )}

      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
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
                  placeholder="Örn: 370"
                  value={formData.price}
                  onFocus={e => e.target.select()}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData({ ...formData, price: val === '' ? '' : Number(val) });
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm font-semibold"
                />
              </div>

              {/* Stok */}
              <div>
                <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Stok Adedi *</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="Örn: 20"
                  value={formData.stock}
                  onFocus={e => e.target.select()}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData({ ...formData, stock: val === '' ? '' : Number(val) });
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm font-semibold"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-xs font-bold text-[#543d2b] uppercase mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm font-semibold"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Kapak Fotoğrafı Seçimi (Kırpma Destekli) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#543d2b] uppercase">Kapak Fotoğrafı</label>
                <div className="flex space-x-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setUploadType('file')}
                    className={`px-2 py-0.5 rounded-md font-semibold ${uploadType === 'file' ? 'bg-[#6f4e37] text-white' : 'text-[#785942] hover:bg-[#e9dfce]'}`}
                  >
                    Dosya Yükle
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadType('url')}
                    className={`px-2 py-0.5 rounded-md font-semibold ${uploadType === 'url' ? 'bg-[#6f4e37] text-white' : 'text-[#785942] hover:bg-[#e9dfce]'}`}
                  >
                    URL Linki
                  </button>
                </div>
              </div>

              {uploadType === 'file' ? (
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#d8cbb7] hover:border-[#8b5e34] rounded-xl cursor-pointer bg-white transition p-4 text-center">
                    <Upload className="h-6 w-6 text-[#8b5e34] mb-1" />
                    <span className="text-xs font-semibold text-[#543d2b]">Resim Seç ve Otomatik Kırp</span>
                    <span className="text-[10px] text-[#8c7462] mt-0.5">PNG, JPG, WEBP (Max 5MB)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8c7462]">
                      <LinkIcon className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#e2d5c3] rounded-xl text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm"
                    />
                  </div>
                  {formData.coverImage && (
                    <button
                      type="button"
                      onClick={() => setCropperSrc(formData.coverImage)}
                      className="px-3 py-2 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] border border-[#e5dac8] rounded-xl text-xs font-bold flex items-center space-x-1 transition"
                    >
                      <Crop className="h-4 w-4" />
                      <span>Kırp</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Fotoğraf Önizlemesi ve Yeniden Kırpma / Silme */}
            {formData.coverImage && (
              <div className="flex items-center justify-between p-2.5 bg-[#eaf3ed] rounded-xl border border-[#cce3d3]">
                <div className="flex items-center space-x-3">
                  <img src={formData.coverImage} alt="Önizleme" className="w-12 h-16 object-cover rounded-lg shadow-sm border border-[#b2d8bc]" />
                  <div>
                    <span className="text-xs text-[#2e6f40] font-bold block">Görsel Hazır & Kırpıldı</span>
                    <span className="text-[10px] text-[#428154]">3:4 Kapak formatına ayarlandı</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setCropperSrc(formData.coverImage)}
                    className="px-2.5 py-1 text-xs font-bold text-[#6f4e37] bg-white hover:bg-[#f4ebe1] rounded-lg border border-[#cce3d3] transition flex items-center space-x-1"
                  >
                    <Crop className="h-3.5 w-3.5" />
                    <span>Yeniden Kırp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: '' })}
                    className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                    title="Resmi Kaldır"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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
    </>
  );
};
