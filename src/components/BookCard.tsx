import React from 'react';
import { Eye, Edit3, Trash2, Star, ShoppingCart, Check } from 'lucide-react';
import type { Book } from '../types/book';
import { useBookContext } from '../context/BookContext';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { setEditingBook, setDeletingBook, viewMode, addToCart } = useBookContext();
  const [added, setAdded] = React.useState(false);

  const isLowStock = book.stock < 10;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white border border-[#e8dfd1] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 hover:border-[#cbb9a3] flex flex-col group">
      
      {/* Kapak Fotoğrafı & Badge'ler */}
      <Link to={`/books/${book.id}`} className="relative h-64 overflow-hidden bg-[#f4ebe1] block">
        <img
          src={book.coverImage || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Subtle Bottom Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Kategori Badge */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#6f4e37] text-xs font-bold px-2.5 py-1 rounded-lg border border-[#e5dac8] shadow-sm">
          {book.category}
        </span>

        {/* Fiyat Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] text-[#faf7f2] font-bold text-sm px-3 py-1 rounded-xl shadow-md border border-[#5a3e2b]">
          {book.price} ₺
        </div>

        {/* Stok Durumu Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
            isLowStock 
              ? 'bg-[#fdf2f2] text-[#c0392b] border border-[#f8d7da]' 
              : 'bg-[#eaf3ed] text-[#2e6f40] border border-[#cce3d3]'
          }`}>
            {isLowStock ? `Kritik Stok: ${book.stock}` : `Stok: ${book.stock}`}
          </span>
        </div>
      </Link>

      {/* İçerik Bilgileri */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <Link to={`/books/${book.id}`} className="text-lg font-bold text-[#3d2b1f] line-clamp-1 group-hover:text-[#8b5e34] transition block">
            {book.title}
          </Link>
          <p className="text-sm font-medium text-[#785942] mt-1">{book.author}</p>
          <p className="text-xs text-[#8c7462] mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Alt Butonlar ve İşlemler (Admin Modu vs Müşteri Modu) */}
        <div className="pt-4 mt-4 border-t border-[#f2ebdc] flex items-center justify-between">
          <div className="flex items-center text-[#d97706] text-xs font-bold">
            <Star className="h-4 w-4 fill-[#d97706] mr-1" />
            <span>{book.rating || '4.5'}</span>
          </div>

          {viewMode === 'customer' ? (
            /* Müşteri Görünümü Butonları */
            <div className="flex items-center space-x-2">
              <Link
                to={`/books/${book.id}`}
                className="px-2.5 py-1.5 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-lg text-xs font-bold transition flex items-center space-x-1"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Detay</span>
              </Link>

              <button
                onClick={handleAddToCart}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#6f4e37] hover:bg-[#5a3e2b] text-[#faf7f2] shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Eklendi!</span>
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
            <div className="flex items-center space-x-1">
              <Link
                to={`/books/${book.id}`}
                title="Detaylı İncele (Özel Sayfa)"
                className="p-2 text-[#785942] hover:text-[#3d2b1f] hover:bg-[#f5efe6] rounded-lg transition"
              >
                <Eye className="h-4.5 w-4.5" />
              </Link>

              <button
                onClick={() => setEditingBook(book)}
                title="Düzenle"
                className="p-2 text-[#785942] hover:text-[#8b5e34] hover:bg-[#f5efe6] rounded-lg transition"
              >
                <Edit3 className="h-4.5 w-4.5" />
              </button>

              <button
                onClick={() => setDeletingBook(book)}
                title="Sil"
                className="p-2 text-[#785942] hover:text-[#c0392b] hover:bg-[#fdf2f2] rounded-lg transition"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
