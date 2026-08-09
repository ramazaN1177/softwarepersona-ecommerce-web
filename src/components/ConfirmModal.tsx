import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const ConfirmModal: React.FC = () => {
  const { deletingBook, setDeletingBook, deleteBook } = useBookContext();

  if (!deletingBook) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#faf7f2] border border-[#e5dac8] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center">
        
        <div className="inline-flex p-3.5 bg-[#fdf2f2] text-[#c0392b] rounded-2xl mb-4 border border-[#f8d7da]">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-bold text-[#3d2b1f] mb-2">Silme İşlemini Onaylıyor Musunuz?</h3>
        <p className="text-sm text-[#785942] mb-6 leading-relaxed">
          <span className="text-[#3d2b1f] font-bold block mt-1">"{deletingBook.title}"</span> 
          kitabı kalıcı olarak silinecektir. Bu işlem geri alınamaz.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={() => setDeletingBook(null)}
            className="flex-1 py-2.5 bg-[#e9dfce] hover:bg-[#dfd3c0] text-[#543d2b] text-sm font-semibold rounded-xl transition border border-[#d8cbb7]"
          >
            İptal
          </button>
          <button
            onClick={() => deleteBook(deletingBook.id)}
            className="flex-1 py-2.5 bg-[#c0392b] hover:bg-[#a93226] text-white text-sm font-semibold rounded-xl shadow-md transition"
          >
            Evet, Sil
          </button>
        </div>

      </div>
    </div>
  );
};
