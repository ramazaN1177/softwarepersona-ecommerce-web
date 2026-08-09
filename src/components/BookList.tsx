import React from 'react';
import { BookCard } from './BookCard';
import { useBookContext } from '../context/BookContext';
import { BookX, Plus } from 'lucide-react';

export const BookList: React.FC = () => {
    const { filteredBooks, setIsAddModalOpen, searchQuery, selectedCategory } = useBookContext();

    if (filteredBooks.length === 0) {
        return (
            <div className="text-center py-16 px-4 bg-slate-900/50 border border-slate-800 rounded-2xl my-8">
                <div className="inline-flex p-4 bg-slate-800 text-slate-400 rounded-full mb-4">
                    <BookX className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aranan Kitap Bulunamadı</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                    "{searchQuery}" aramanıza veya "{selectedCategory}" kategorisine uygun kayıtlı bir kitap bulunamadı.
                </p>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30"
                >
                    <Plus className="h-4 w-4" />
                    <span>Yeni Kitap Ekleyin</span>
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-400">
                    Toplam <span className="font-semibold text-white">{filteredBooks.length}</span> kitap listeleniyor
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};
