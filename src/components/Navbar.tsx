import React from 'react';
import { BookOpen, Plus, RefreshCw } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const Navbar: React.FC = () => {
  const { setIsAddModalOpen, resetToDefault } = useBookContext();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-lg backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Başlık */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-md text-white">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white tracking-tight">KitapDünyası</h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-slate-400">E-Ticaret Ürün & Stok Yönetimi</p>
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
              className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition duration-150"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>

            {/* Yeni Kitap Ekle Butonu */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Yeni Kitap Ekle</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
