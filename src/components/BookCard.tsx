import React, { memo, useState } from 'react';
import { Eye, Edit3, Trash2, Star, ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import type { Book } from '../types/book';
import { useBookContext } from '../context/BookContext';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = memo(({ book }) => {
  const { setEditingBook, setDeletingBook, viewMode, addToCart } = useBookContext();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isLowStock = book.stock < 10;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white border border-[#e8dfd1] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 hover:border-[#cbb9a3] flex flex-col group">
      
      {/* Kapak Fotoğrafı (Çerçeve İçi Çerçeve Etkisini Kaldıran Doğal Görünüm) */}
      <Link to={`/books/${book.id}`} className="relative h-60 sm:h-64 bg-[#f4ebe1] flex items-center justify-center p-3 overflow-hidden block">
        <img
          src={book.coverImage || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'}
          alt={book.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Kategori Badge */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#6f4e37] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#e5dac8] shadow-sm">
          {book.category}
        </span>

        {/* Fiyat Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] text-[#faf7f2] font-bold text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-xl shadow-md border border-[#5a3e2b]">
          {book.price} ₺
        </div>

        {/* Stok Durumu Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
            isLowStock 
              ? 'bg-[#fdf2f2] text-[#c0392b] border border-[#f8d7da]' 
              : 'bg-[#eaf3ed] text-[#2e6f40] border border-[#cce3d3]'
          }`}>
            {isLowStock ? `Kritik Stok: ${book.stock}` : `Stok: ${book.stock}`}
          </span>
        </div>
      </Link>

      {/* İçerik Bilgileri */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between">
            <Link to={`/books/${book.id}`} className="text-base sm:text-lg font-bold text-[#3d2b1f] line-clamp-1 group-hover:text-[#8b5e34] transition block">
              {book.title}
            </Link>
            <div className="flex items-center text-[#d97706] text-xs font-bold shrink-0 ml-2">
              <Star className="h-3.5 w-3.5 fill-[#d97706] mr-0.5" />
              <span>{book.rating || '4.8'}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#785942] mt-0.5">{book.author}</p>
          <p className="text-xs text-[#8c7462] mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Alt Butonlar ve İşlemler */}
        <div className="pt-3.5 mt-4 border-t border-[#f2ebdc]">
          {viewMode === 'customer' ? (
            /* Müşteri Görünümünde Adet Seçici (- 1 +) */
            <div className="flex flex-col sm:flex-row items-center gap-2">
              
              <div className="flex items-center border border-[#d8cbb7] bg-[#faf7f2] rounded-xl p-0.5 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setQuantity(Math.max(1, quantity - 1)); }}
                  disabled={quantity <= 1}
                  className="p-1 text-[#543d2b] hover:bg-[#e9dfce] disabled:opacity-30 rounded-lg transition"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="px-2.5 text-xs font-bold text-[#3d2b1f]">{quantity}</span>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setQuantity(Math.min(book.stock, quantity + 1)); }}
                  disabled={quantity >= book.stock}
                  className="p-1 text-[#543d2b] hover:bg-[#e9dfce] disabled:opacity-30 rounded-lg transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#6f4e37] hover:bg-[#5a3e2b] text-[#faf7f2]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Eklendi ({quantity})</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Sepete Ekle</span>
                  </>
                )}
              </button>

            </div>
          ) : (
            /* Admin Görünümü Butonları */
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#785942] font-semibold">Stok: {book.stock} Adet</span>
              <div className="flex items-center space-x-1">
                <Link
                  to={`/books/${book.id}`}
                  title="Detaylı İncele"
                  className="p-2 text-[#785942] hover:text-[#3d2b1f] hover:bg-[#f5efe6] rounded-lg transition"
                >
                  <Eye className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => setEditingBook(book)}
                  title="Düzenle"
                  className="p-2 text-[#785942] hover:text-[#8b5e34] hover:bg-[#f5efe6] rounded-lg transition"
                >
                  <Edit3 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setDeletingBook(book)}
                  title="Sil"
                  className="p-2 text-[#785942] hover:text-[#c0392b] hover:bg-[#fdf2f2] rounded-lg transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
});
