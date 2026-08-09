import React from 'react';
import { StatsCards } from '../components/StatsCards';
import { FilterBar } from '../components/FilterBar';
import { BookList } from '../components/BookList';
import { useBookContext } from '../context/BookContext';
import { Sparkles, ShoppingBag } from 'lucide-react';

export const BooksPage: React.FC = () => {
  const { viewMode } = useBookContext();

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Müşteri Görünümü Hoş Geldiniz Banner'ı */}
      {viewMode === 'customer' ? (
        <div className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] text-[#faf7f2] p-6 rounded-2xl shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-300" />
              <h2 className="text-xl font-bold">KitapDünyası Mağazasına Hoş Geldiniz!</h2>
            </div>
            <p className="text-xs text-amber-100/90">
              Aradığınız en popüler romanlar, yazılım kitapları ve klasik eserler en uygun fiyatlarla mağazamızda.
            </p>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold border border-white/20 flex items-center space-x-1.5 whitespace-nowrap">
            <ShoppingBag className="h-4 w-4 text-amber-300" />
            <span>Tüm Siparişlerde Hızlı Kargo</span>
          </div>
        </div>
      ) : (
        /* Admin İstatistikleri */
        <StatsCards />
      )}

      {/* Gelişmiş Arama ve Filtre Çubuğu */}
      <FilterBar />

      {/* Kitap Listesi Grid */}
      <BookList />
    </div>
  );
};
