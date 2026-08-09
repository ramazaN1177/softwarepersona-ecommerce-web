import React from 'react';
import { Eye, Edit3, Trash2, Star } from 'lucide-react';
import type { Book } from '../types/book';
import { useBookContext } from '../context/BookContext';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { setViewingBook, setEditingBook, setDeletingBook } = useBookContext();

  const isLowStock = book.stock < 10;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 hover:border-slate-700 flex flex-col group">
      
      {/* Kapak Fotoğrafı & Badge'ler */}
      <div className="relative h-60 overflow-hidden bg-slate-800">
        <img
          src={book.coverImage || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Kategori Badge */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700">
          {book.category}
        </span>

        {/* Fiyat Badge */}
        <div className="absolute top-3 right-3 bg-indigo-600 text-white font-bold text-sm px-3 py-1 rounded-xl shadow-lg">
          {book.price} ₺
        </div>

        {/* Stok Durumu Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
            isLowStock 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {isLowStock ? `Kritik Stok: ${book.stock}` : `Stok: ${book.stock}`}
          </span>
        </div>
      </div>

      {/* İçerik Bilgileri */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition">
            {book.title}
          </h3>
          <p className="text-sm font-medium text-slate-400 mt-1">{book.author}</p>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Alt Butonlar ve İşlemler */}
        <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center text-amber-400 text-xs font-semibold">
            <Star className="h-4 w-4 fill-amber-400 mr-1" />
            <span>{book.rating || '4.5'}</span>
          </div>

          <div className="flex items-center space-x-1">
            {/* Detay Göster */}
            <button
              onClick={() => setViewingBook(book)}
              title="Detay İncele"
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>

            {/* Güncelle */}
            <button
              onClick={() => setEditingBook(book)}
              title="Düzenle"
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
            >
              <Edit3 className="h-4.5 w-4.5" />
            </button>

            {/* Sil */}
            <button
              onClick={() => setDeletingBook(book)}
              title="Sil"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
