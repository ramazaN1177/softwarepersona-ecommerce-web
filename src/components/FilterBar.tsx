import React from 'react';
import { Search, Filter, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { useBookContext, type SortOption } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';
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
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    sortOption,
    setSortOption,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    resetFilters,
    books
  } = useBookContext();

  const { t } = useLanguage();

  const isFilterActive = searchQuery !== '' || selectedCategory !== 'Tüm Kategoriler' || sortOption !== 'newest' || minPrice !== '' || maxPrice !== '';

  return (
    <div className="bg-white border border-[#e8dfd1] rounded-2xl p-5 mb-8 shadow-sm space-y-4">
      
      {/* Üst Kısım: Arama Barı + Sıralama + Fiyat Filtreleri */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Arama Barı */}
        <div className="md:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9c8473]">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_placeholder')}
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

        {/* Fiyat Aralığı Filtresi (Min - Max) */}
        <div className="md:col-span-4 flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder={t('price_min')}
              className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e2d5c3] rounded-xl text-xs text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34]"
            />
          </div>
          <span className="text-[#8c7462] text-xs font-bold">-</span>
          <div className="relative flex-1">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder={t('price_max')}
              className="w-full px-3 py-2 bg-[#faf7f2] border border-[#e2d5c3] rounded-xl text-xs text-[#3d2b1f] placeholder-[#a89485] focus:outline-none focus:ring-2 focus:ring-[#8b5e34]"
            />
          </div>
        </div>

        {/* Sıralama Açılır Menüsü */}
        <div className="md:col-span-3 flex items-center space-x-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8c7462]">
              <ArrowUpDown className="h-4 w-4" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#faf7f2] border border-[#e2d5c3] rounded-xl text-xs font-bold text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#8b5e34]"
            >
              <option value="newest">{t('sort_newest')}</option>
              <option value="price-asc">{t('sort_price_asc')}</option>
              <option value="price-desc">{t('sort_price_desc')}</option>
              <option value="rating">{t('sort_rating')}</option>
              <option value="stock">{t('sort_stock')}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Alt Kısım: Kategori Butonları (Pills) + Sıfırla */}
      <div className="pt-3 border-t border-[#f2ebdc] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center text-[#785942] text-xs font-bold uppercase tracking-wider mr-1">
            <Filter className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">Kategori:</span>
          </div>

          {categories.map((category) => {
            const count = category === 'Tüm Kategoriler' ? books.length : books.filter(b => b.category === category).length;
            const categoryLabel = category === 'Tüm Kategoriler' ? t('category_all') : category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition duration-150 flex items-center space-x-1.5 ${
                  selectedCategory === category
                    ? 'bg-[#6f4e37] text-[#faf7f2] shadow-sm'
                    : 'bg-[#f4ebe1] text-[#543d2b] hover:bg-[#e9ded0] border border-[#e5dac8]'
                }`}
              >
                <span>{categoryLabel}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  selectedCategory === category ? 'bg-white/20 text-white' : 'bg-[#e6dccb] text-[#6f4e37]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Aktif Filtre Bilgisi & Temizle Butonu */}
        {isFilterActive && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#fdf2f2] hover:bg-[#f8d7da] text-[#c0392b] text-xs font-bold rounded-xl border border-[#f8d7da] transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t('reset_filters')}</span>
          </button>
        )}

      </div>

    </div>
  );
};
