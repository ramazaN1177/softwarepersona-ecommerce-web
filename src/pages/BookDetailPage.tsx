import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBookContext } from '../context/BookContext';
import { 
  ArrowLeft, 
  Star, 
  Edit3, 
  Trash2, 
  PackageCheck, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck, 
  Check, 
  CreditCard 
} from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, setEditingBook, setDeletingBook, viewMode, addToCart, setIsCartOpen } = useBookContext();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="text-center py-20 bg-white border border-[#e8dfd1] rounded-2xl my-8">
        <h3 className="text-xl font-bold text-[#3d2b1f] mb-2">Kitap Bulunamadı</h3>
        <p className="text-sm text-[#785942] mb-6">Aradığınız kitap sistemde kayıtlı değil veya silinmiş olabilir.</p>
        <Link
          to="/books"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#6f4e37] text-white rounded-xl text-sm font-semibold hover:bg-[#5a3e2b] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kataloğa Dön</span>
        </Link>
      </div>
    );
  }

  const isLowStock = book.stock < 10;

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Üst Geri Butonu & Başlık */}
      <div className="flex items-center justify-between bg-white p-4 px-6 rounded-2xl border border-[#e8dfd1] shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-[#6f4e37] hover:text-[#3d2b1f] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Geri Dön</span>
        </button>

        {/* Yalnızca Admin Modunda Düzenle ve Sil Butonları Görünür */}
        {viewMode === 'admin' && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditingBook(book)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-xl text-xs font-bold transition"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Kitabı Düzenle</span>
            </button>
            <button
              onClick={() => setDeletingBook(book)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#fdf2f2] hover:bg-[#f8d7da] text-[#c0392b] rounded-xl text-xs font-bold transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Kitabı Sil</span>
            </button>
          </div>
        )}
      </div>

      {/* Detay Kartı */}
      <div className="bg-white border border-[#e8dfd1] rounded-2xl overflow-hidden shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sol: Büyük Kapak Resmi */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm h-96 rounded-2xl overflow-hidden bg-[#f4ebe1] border border-[#e2d5c3] shadow-md">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#6f4e37] text-xs font-bold px-3 py-1 rounded-lg border border-[#e5dac8]">
                {book.category}
              </div>
            </div>
          </div>

          {/* Sağ: Kitap Özellikleri ve Şartlı Müşteri/Admin Paneli */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-[#f4ebe1] text-[#6f4e37] rounded-md border border-[#e5dac8]">
                  Stok Kodu: #{book.id}
                </span>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                  isLowStock ? 'bg-[#fdf2f2] text-[#c0392b]' : 'bg-[#eaf3ed] text-[#2e6f40]'
                }`}>
                  {isLowStock ? `Kritik Stok: ${book.stock}` : `Stokta Var (${book.stock} Adet)`}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#3d2b1f] leading-tight">{book.title}</h1>
              <p className="text-base font-semibold text-[#785942] mt-1">Yazar: {book.author}</p>

              {/* Fiyat ve Puan Rozet Paneli */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                <div className="p-3.5 bg-[#faf7f2] rounded-xl border border-[#e8dfd1]">
                  <span className="text-[11px] font-semibold text-[#785942] block">Satış Fiyatı</span>
                  <span className="text-2xl font-extrabold text-[#6f4e37]">{book.price} ₺</span>
                </div>
                <div className="p-3.5 bg-[#faf7f2] rounded-xl border border-[#e8dfd1]">
                  <span className="text-[11px] font-semibold text-[#785942] block">Değerlendirme</span>
                  <div className="flex items-center text-amber-600 font-extrabold text-lg mt-0.5">
                    <Star className="h-4 w-4 fill-amber-500 mr-1" />
                    <span>{book.rating || '4.8'} / 5</span>
                  </div>
                </div>
                <div className="p-3.5 bg-[#faf7f2] rounded-xl border border-[#e8dfd1]">
                  <span className="text-[11px] font-semibold text-[#785942] block">Sayfa Sayısı</span>
                  <span className="text-lg font-bold text-[#3d2b1f]">{book.pages || 320} Sayfa</span>
                </div>
              </div>

              {/* YALNIZCA Müşteri Modunda Sipariş & Adet Paneli Görünür */}
              {viewMode === 'customer' && (
                <div className="p-5 bg-[#faf7f2] rounded-2xl border border-[#e8dfd1] space-y-4 my-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3d2b1f] uppercase tracking-wider">Sipariş Adedi Seçin</span>
                    <span className="text-xs text-[#785942]">Maksimum {book.stock} Adet Alabilirsiniz</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {/* Adet Seçim Butonları (- / +) */}
                    <div className="flex items-center border border-[#d8cbb7] bg-white rounded-xl p-1 shadow-sm w-full sm:w-auto justify-center">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="p-2 text-[#543d2b] hover:bg-[#f4ebe1] disabled:opacity-30 rounded-lg transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-5 text-base font-bold text-[#3d2b1f] min-w-[40px] text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                        disabled={quantity >= book.stock}
                        className="p-2 text-[#543d2b] hover:bg-[#f4ebe1] disabled:opacity-30 rounded-lg transition"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Toplam Fiyat */}
                    <div className="text-right sm:text-left text-xs font-bold text-[#6f4e37] bg-white px-4 py-2.5 rounded-xl border border-[#e5dac8] w-full sm:w-auto text-center">
                      Toplam: <span className="text-base font-extrabold">{book.price * quantity} ₺</span>
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-sm ${
                        added ? 'bg-emerald-600 text-white' : 'bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] border border-[#e5dac8]'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Sepete Eklendi ({quantity} Adet)</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span>Sepete Ekle</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="py-3 px-4 bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Hızlı Satın Al</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Kitap Özeti / Açıklaması */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#3d2b1f] uppercase tracking-wider">Kitap Özeti & Tanıtımı</h3>
                <p className="text-sm text-[#543d2b] leading-relaxed bg-[#faf7f2] p-4 rounded-xl border border-[#f2ebdc]">
                  {book.description || 'Bu kitap için detaylı açıklama metni girilmemiştir.'}
                </p>
              </div>
            </div>

            {/* Rozetler */}
            <div className="pt-4 border-t border-[#f2ebdc] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#785942]">
              <div className="flex items-center space-x-2 bg-[#faf7f2] p-2.5 rounded-xl border border-[#f2ebdc]">
                <Truck className="h-4 w-4 text-[#6f4e37]" />
                <span className="font-semibold text-[11px]">24 Saatte Hızlı Kargo</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#faf7f2] p-2.5 rounded-xl border border-[#f2ebdc]">
                <ShieldCheck className="h-4 w-4 text-[#2e6f40]" />
                <span className="font-semibold text-[11px]">%100 Orijinal Ürün</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#faf7f2] p-2.5 rounded-xl border border-[#f2ebdc]">
                <PackageCheck className="h-4 w-4 text-[#8b5e34]" />
                <span className="font-semibold text-[11px]">Özenli Paketleme</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
