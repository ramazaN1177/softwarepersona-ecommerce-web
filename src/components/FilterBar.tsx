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
    <div className="bg-white border border-[#e8dfd1] rounded-2xl p-4 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Arama Girdisi */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9c8473]">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap adı veya yazar ara..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#faf7f2] border border-[#e2d5c3] rounded-xl text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34] text-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9c8473] hover:text-[#3d2b1f]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Kategori Butonları (Pills) */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <div className="flex items-center text-[#785942] text-xs font-bold uppercase tracking-wider mr-1">
            <Filter className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">Kategori:</span>
          </div>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition duration-150 ${
                selectedCategory === category
                  ? 'bg-[#6f4e37] text-[#faf7f2] shadow-sm'
                  : 'bg-[#f4ebe1] text-[#543d2b] hover:bg-[#e9ded0] border border-[#e5dac8]'
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
