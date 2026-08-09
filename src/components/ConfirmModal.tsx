import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const ConfirmModal: React.FC = () => {
    const { deletingBook, setDeletingBook, deleteBook } = useBookContext();

    if (!deletingBook) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center">

                <div className="inline-flex p-3.5 bg-rose-500/10 text-rose-500 rounded-2xl mb-4 border border-rose-500/20">
                    <AlertTriangle className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Silme İşlemini Onaylıyor Musunuz?</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    <span className="text-white font-semibold block mt-1">"{deletingBook.title}"</span>
                    kitabı kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                </p>

                <div className="flex space-x-3">
                    <button
                        onClick={() => setDeletingBook(null)}
                        className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition border border-slate-700"
                    >
                        İptal
                    </button>
                    <button
                        onClick={() => deleteBook(deletingBook.id)}
                        className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-600/30 transition"
                    >
                        Evet, Sil
                    </button>
                </div>

            </div>
        </div>
    );
};
