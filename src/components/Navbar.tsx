import React from 'react';
import { BookOpen, Plus, RefreshCw } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const Navbar: React.FC = () => {
  const { setIsAddModalOpen, resetToDefault } = useBookContext();

  return (
    <header className="bg-[#f2ebdc] border-b border-[#e5dac8] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Başlık */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-[#6f4e37] to-[#8b5e34] rounded-xl shadow-md text-[#faf7f2]">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-[#3d2b1f] tracking-tight">KitapDünyası</h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#e6dccb] text-[#6f4e37] rounded-full border border-[#d8cbb7]">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-[#785942]">E-Ticaret Ürün & Stok Yönetimi</p>
            </div>
          </div>

          {/* Sağ Butonlar */}
          <div className="flex items-center space-x-3">
            
            {/* Varsayılana Sıfırla Butonu */}
            <button
              onClick={() => {
                if (window.confirm('Tüm kitaplar sıfırlanıp varsayılan listeye dönülsün mü?')) {
                  resetToDefault();
                }
              }}
              title="Örnek Verilere Sıfırla"
              className="inline-flex items-center space-x-2 px-3.5 py-2 text-sm font-medium text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl border border-[#d8cbb7] transition duration-150"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>

            {/* Yeni Kitap Ekle Butonu */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold text-[#faf7f2] bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] hover:to-[#774f2a] rounded-xl shadow-md shadow-[#6f4e37]/20 transition duration-200"
            >
              <Plus className="h-5 w-5 text-[#faf7f2]" />
              <span>Yeni Kitap Ekle</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
