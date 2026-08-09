import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';

export const ConfirmModal: React.FC = () => {
  const { deletingBook, setDeletingBook, deleteBook } = useBookContext();
  const { t, language } = useLanguage();

  if (!deletingBook) return null;

  const handleConfirm = () => {
    deleteBook(deletingBook.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#faf7f2] border border-[#e5dac8] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-4 p-6">
        
        {/* Modal Başlık */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#fdf2f2] text-rose-600 rounded-2xl border border-[#f8d7da]">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3d2b1f]">
                {language === 'tr' ? 'Kitabı Silmeyi Onayla' : 'Confirm Book Deletion'}
              </h3>
              <p className="text-xs text-[#785942]">
                {language === 'tr' ? 'Bu işlem geri alınamaz' : 'This action cannot be undone'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDeletingBook(null)}
            className="p-1 text-[#785942] hover:bg-[#e9dfce] rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Açıklama */}
        <div className="bg-white p-4 rounded-xl border border-[#e8dfd1] text-xs text-[#543d2b] space-y-2">
          <p>
            <b className="text-[#3d2b1f]">{deletingBook.title}</b> {language === 'tr' ? 'isimli kitabı silmek istediğinizden emin misiniz?' : 'are you sure you want to delete this book?'}
          </p>
          <p className="text-[#c0392b] text-[11px] font-semibold">
            {language === 'tr' ? 'Bu ürün veritabanından kalıcı olarak kaldırılacaktır.' : 'This item will be permanently removed from storage.'}
          </p>
        </div>

        {/* Butonlar */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setDeletingBook(null)}
            className="px-4 py-2 text-xs font-bold text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl transition"
          >
            {t('btn_cancel')}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition"
          >
            {language === 'tr' ? 'Evet, Kitabı Sil' : 'Yes, Delete Book'}
          </button>
        </div>

      </div>
    </div>
  );
};
