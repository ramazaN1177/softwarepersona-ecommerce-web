import React from 'react';
import { X, BookOpen, Star } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const BookDetailModal: React.FC = () => {
  const { viewingBook, setViewingBook } = useBookContext();

  if (!viewingBook) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        
        {/* Modal Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Kitap Detayı</h3>
          </div>
          <button
            onClick={() => setViewingBook(null)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal İçerik */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Kapak Resmi */}
          <div className="w-full md:w-44 h-64 shrink-0 rounded-xl overflow-hidden bg-slate-800 shadow-md">
            <img
              src={viewingBook.coverImage}
              alt={viewingBook.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kitap Bilgileri */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg mb-2">
                {viewingBook.category}
              </span>
              <h2 className="text-xl font-bold text-white">{viewingBook.title}</h2>
              <p className="text-sm font-medium text-slate-400 mt-1">Yazar: {viewingBook.author}</p>
              
              <div className="mt-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Fiyat:</span>
                  <span className="font-bold text-emerald-400 text-sm">{viewingBook.price} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stok Adedi:</span>
                  <span className="font-semibold text-white">{viewingBook.stock} Adet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Puan:</span>
                  <span className="font-semibold text-amber-400 flex items-center">
                    <Star className="h-3.5 w-3.5 fill-amber-400 mr-1" />
                    {viewingBook.rating || '4.8'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {viewingBook.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setViewingBook(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
