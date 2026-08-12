import React, { useState } from 'react';
import { Plus, RefreshCw, BarChart3, LayoutGrid, ShieldCheck, ShoppingCart, Store, Menu, X, Globe } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { setIsAddModalOpen, setIsResetConfirmOpen, viewMode, setViewMode, cart, setIsCartOpen } = useBookContext();
  const { language, setLanguage, t } = useLanguage();
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

  const handleToggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <header className="bg-[#f2ebdc] border-b border-[#e5dac8] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Kitaplık AI Üretimi Logosu (kitaplik-logo.png) */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <Link to={viewMode === 'admin' ? '/' : '/books'} className="flex items-center space-x-2.5 sm:space-x-3 group">
              <img 
                src="/kitaplik-logo.png" 
                alt="Shelfy Logo" 
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain rounded-xl drop-shadow-md group-hover:scale-105 transition duration-200"
              />
              <div>
                <h1 className="text-base sm:text-xl font-extrabold text-[#3d2b1f] tracking-tight leading-none">
                  {t('app_title')}
                </h1>
                <p className="text-[10px] sm:text-[11px] text-[#785942] font-semibold mt-0.5 hidden xs:block">
                  {viewMode === 'admin' ? t('app_subtitle_admin') : t('app_subtitle_customer')}
                </p>
              </div>
            </Link>

            {/* Masaüstü Navigasyon Linkleri */}
            {viewMode === 'admin' ? (
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
                  <span>{t('nav_dashboard')}</span>
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
                  <span>{t('nav_catalog')}</span>
                </NavLink>
              </div>
            ) : (
              /* Müşteri Modunda Tek Temiz Mağaza Linki */
              <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-[#6f4e37] bg-[#f4ebe1] px-3.5 py-1.5 rounded-xl border border-[#e5dac8]">
                <LayoutGrid className="h-4 w-4" />
                <span>{t('nav_store_banner')}</span>
              </div>
            )}
          </div>

          {/* Sağ Butonlar (Dil Değiştirici + Mod Değiştirici + Sıfırla + Ekle) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* TR / EN Dil Seçici Butonu (Language Switcher) */}
            <button
              onClick={handleToggleLanguage}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-extrabold text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl border border-[#d8cbb7] transition cursor-pointer"
              title="Türkçe / English Dil Değiştir"
            >
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#6f4e37]" />
              <span className="uppercase">{language}</span>
            </button>

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
                  <span className="hidden sm:inline">{t('nav_customer_mode')}</span>
                  <span className="sm:hidden text-[11px]">Mağaza</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">{t('nav_admin_mode')}</span>
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
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2e6f40] text-[#faf7f2] font-extrabold text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#f2ebdc] shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Admin Modu Aksiyon Butonları (Özel Tasarım Sıfırla Modalı) */}
            {viewMode === 'admin' && (
              <>
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  title="Örnek Verilere Sıfırla"
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl border border-[#d8cbb7] transition duration-150 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">{t('nav_reset')}</span>
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-[#faf7f2] bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] rounded-xl shadow-md transition duration-200 cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-[#faf7f2]" />
                  <span className="hidden sm:inline">{t('nav_add_book')}</span>
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

        {/* Mobil Dropdown Menü */}
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
              <span>{t('nav_dashboard')}</span>
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
              <span>{t('nav_catalog')}</span>
            </NavLink>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResetConfirmOpen(true);
              }}
              className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#f4ebe1] text-[#6f4e37] border border-[#e5dac8]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{t('nav_reset')}</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
