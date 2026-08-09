import React, { useState } from 'react';
import { BookOpen, Plus, RefreshCw, BarChart3, LayoutGrid, ShieldCheck, ShoppingCart, Store, Menu, X } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { setIsAddModalOpen, resetToDefault, viewMode, setViewMode, cart, setIsCartOpen } = useBookContext();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleToggleViewMode = () => {
    if (viewMode === 'admin') {
      setViewMode('customer');
      navigate('/books');
    } else {
      setViewMode('admin');
      navigate('/');
    }
  };

  return (
    <header className="bg-[#f2ebdc] border-b border-[#e5dac8] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <Link to={viewMode === 'admin' ? '/' : '/books'} className="flex items-center space-x-2.5 sm:space-x-3 group">
              <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-[#6f4e37] to-[#8b5e34] rounded-xl shadow-md text-[#faf7f2] group-hover:scale-105 transition duration-200">
                <BookOpen className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-extrabold text-[#3d2b1f] tracking-tight leading-none">KitapDünyası</h1>
                <p className="text-[10px] sm:text-[11px] text-[#785942] font-semibold mt-0.5 hidden xs:block">
                  {viewMode === 'admin' ? 'Yönetici Platformu' : 'Online Kitap Mağazası'}
                </p>
              </div>
            </Link>

            {/* Masaüstü Navigasyon Linkleri */}
            {viewMode === 'admin' && (
              <div className="hidden md:flex items-center p-1 bg-[#e9dfce] rounded-xl border border-[#d8cbb7]">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#6f4e37] text-[#faf7f2] shadow-sm'
                        : 'text-[#543d2b] hover:text-[#3d2b1f]'
                    }`
                  }
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Satış & Analiz</span>
                </NavLink>

                <NavLink
                  to="/books"
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#6f4e37] text-[#faf7f2] shadow-sm'
                        : 'text-[#543d2b] hover:text-[#3d2b1f]'
                    }`
                  }
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Kitap Kataloğu</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Sağ Butonlar (Mobil & Masaüstü Uyumlu) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            
            {/* Mod Değiştirici Buton (Müşteri / Yönetici) */}
            <button
              onClick={handleToggleViewMode}
              className={`inline-flex items-center space-x-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                viewMode === 'customer'
                  ? 'bg-[#2e6f40] text-white border-[#245833] shadow-sm'
                  : 'bg-[#faf7f2] text-[#6f4e37] border-[#d8cbb7] hover:bg-[#e9dfce]'
              }`}
              title="Görünüm Modunu Değiştir"
            >
              {viewMode === 'admin' ? (
                <>
                  <Store className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Müşteri Mağazası</span>
                  <span className="sm:hidden text-[11px]">Mağaza</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Yönetici Paneli</span>
                  <span className="sm:hidden text-[11px]">Panel</span>
                </>
              )}
            </button>

            {/* Müşteri Sepet İkonu ve Butonu */}
            {viewMode === 'customer' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl border border-[#d8cbb7] text-[#6f4e37] transition cursor-pointer"
                title="Sepetimi Aç"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2e6f40] text-white font-extrabold text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#f2ebdc] shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Admin Modu Aksiyon Butonları */}
            {viewMode === 'admin' && (
              <>
                <button
                  onClick={() => {
                    if (window.confirm('Tüm kitaplar sıfırlanıp varsayılan listeye dönülsün mü?')) {
                      resetToDefault();
                    }
                  }}
                  title="Örnek Verilere Sıfırla"
                  className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl border border-[#d8cbb7] transition duration-150"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Sıfırla</span>
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-[#faf7f2] bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] rounded-xl shadow-md transition duration-200"
                >
                  <Plus className="h-4 w-4 text-[#faf7f2]" />
                  <span className="hidden sm:inline">Yeni Kitap Ekle</span>
                </button>

                {/* Mobil Menü Butonu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1.5 text-[#6f4e37] hover:bg-[#e9dfce] rounded-xl transition"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </>
            )}

          </div>

        </div>

        {/* Mobil Dropdown Menü (Admin Sekmeleri) */}
        {mobileMenuOpen && viewMode === 'admin' && (
          <div className="md:hidden py-3 border-t border-[#e5dac8] space-y-2 animate-fadeIn">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive ? 'bg-[#6f4e37] text-white' : 'bg-[#e9dfce] text-[#543d2b]'
                }`
              }
            >
              <BarChart3 className="h-4 w-4" />
              <span>Satış & Analiz Dashboard</span>
            </NavLink>

            <NavLink
              to="/books"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive ? 'bg-[#6f4e37] text-white' : 'bg-[#e9dfce] text-[#543d2b]'
                }`
              }
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Kitap Kataloğu & Yönetim</span>
            </NavLink>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (window.confirm('Tüm kitaplar sıfırlanıp varsayılan listeye dönülsün mü?')) {
                  resetToDefault();
                }
              }}
              className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#e9dfce] text-[#543d2b]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Varsayılan Verilere Sıfırla</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
