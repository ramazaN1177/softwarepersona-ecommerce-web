import React from 'react';
import { BookCard } from './BookCard';
import { useBookContext } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';
import { BookX, Plus, Layers } from 'lucide-react';

export const BookList: React.FC = () => {
    const { filteredBooks, setIsAddModalOpen, searchQuery, selectedCategory } = useBookContext();
    const { t, language } = useLanguage();

    if (filteredBooks.length === 0) {
        return (
            <div className="text-center py-16 px-4 bg-white border border-[#e8dfd1] rounded-2xl my-8 shadow-sm">
                <div className="inline-flex p-4 bg-[#f4ebe1] text-[#6f4e37] rounded-full mb-4">
                    <BookX className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-[#3d2b1f] mb-2">
                    {language === 'tr' ? 'Aranan Kitap Bulunamadı' : 'No Books Found'}
                </h3>
                <p className="text-sm text-[#785942] max-w-md mx-auto mb-6">
                    "{searchQuery}" {language === 'tr' ? 'aramanıza veya' : 'search or'} "{selectedCategory}" {language === 'tr' ? 'kategorisine uygun kayıtlı bir kitap bulunamadı.' : 'category.'}
                </p>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] text-white text-sm font-semibold rounded-xl transition shadow-md"
                >
                    <Plus className="h-4 w-4" />
                    <span>{t('nav_add_book')}</span>
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Şık Kitap Sayacı Rozeti */}
            <div className="flex items-center justify-between mb-4 bg-white px-4 py-2.5 rounded-2xl border border-[#e8dfd1] shadow-sm">
                <div className="flex items-center space-x-2">
                    <Layers className="h-4 w-4 text-[#6f4e37]" />
                    <p className="text-xs font-semibold text-[#785942]">
                        {language === 'tr' ? 'Toplam' : 'Total'}{' '}
                        <span className="font-extrabold text-[#6f4e37] bg-[#f4ebe1] px-2.5 py-0.5 rounded-md border border-[#e5dac8] text-xs">
                            {filteredBooks.length}
                        </span>{' '}
                        {language === 'tr' ? 'kitap listeleniyor' : 'books listed'}
                    </p>
                </div>
            </div>

            {/* Kitap Izgarası Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};
