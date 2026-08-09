import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import type { Category } from '../types/book';

const categories: Category[] = [
    'Tüm Kategoriler',
    'Roman & Edebiyat',
    'Yazılım & Teknoloji',
    'Kişisel Gelişim',
    'Tarih & Felsefe',
    'Bilim Kurgu & Fantastik'
];

export const FilterBar: React.FC = () => {
    const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useBookContext();

    return (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-8 shadow-xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* Arama Girdisi */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Kitap adı veya yazar ara..."
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Kategori Butonları (Pills) */}
                <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                    <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mr-1">
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        <span className="hidden sm:inline">Kategori:</span>
                    </div>

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition duration-150 ${selectedCategory === category
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};
