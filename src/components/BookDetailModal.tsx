import React from 'react';
import { X, BookOpen, Star } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const BookDetailModal: React.FC = () => {
  const { viewingBook, setViewingBook } = useBookContext();

  if (!viewingBook) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#faf7f2] border border-[#e5dac8] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        
        {/* Modal Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8dfd1] bg-[#f4ebe1]">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-[#8b5e34]" />
            <h3 className="text-lg font-bold text-[#3d2b1f]">Kitap Detayı</h3>
          </div>
          <button
            onClick={() => setViewingBook(null)}
            className="p-1 text-[#785942] hover:text-[#3d2b1f] hover:bg-[#e9dfce] rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal İçerik */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Kapak Resmi */}
          <div className="w-full md:w-48 h-64 shrink-0 rounded-xl overflow-hidden bg-[#f4ebe1] shadow-md border border-[#e2d5c3]">
            <img
              src={viewingBook.coverImage}
              alt={viewingBook.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kitap Bilgileri */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-bold bg-[#f4ebe1] text-[#6f4e37] border border-[#e5dac8] rounded-lg mb-2">
                {viewingBook.category}
              </span>
              <h2 className="text-xl font-bold text-[#3d2b1f]">{viewingBook.title}</h2>
              <p className="text-sm font-semibold text-[#785942] mt-1">Yazar: {viewingBook.author}</p>
              
              <div className="mt-4 p-3.5 bg-white rounded-xl border border-[#e8dfd1] text-xs text-[#3d2b1f] space-y-2 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-[#785942] font-medium">Fiyat:</span>
                  <span className="font-bold text-[#6f4e37] text-sm">{viewingBook.price} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#785942] font-medium">Stok Adedi:</span>
                  <span className="font-bold text-[#3d2b1f]">{viewingBook.stock} Adet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#785942] font-medium">Puan:</span>
                  <span className="font-bold text-[#d97706] flex items-center">
                    <Star className="h-3.5 w-3.5 fill-[#d97706] mr-1" />
                    {viewingBook.rating || '4.8'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#543d2b] mt-4 leading-relaxed">
                {viewingBook.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#e8dfd1] flex justify-end">
              <button
                onClick={() => setViewingBook(null)}
                className="px-5 py-2.5 bg-[#6f4e37] hover:bg-[#5a3e2b] text-[#faf7f2] text-sm font-semibold rounded-xl transition shadow-sm"
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
