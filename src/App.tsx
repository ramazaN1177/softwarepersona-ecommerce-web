import { BookProvider } from './context/BookContext';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { FilterBar } from './components/FilterBar';
import { BookList } from './components/BookList';
import { BookFormModal } from './components/BookFormModal';
import { BookDetailModal } from './components/BookDetailModal';
import { ConfirmModal } from './components/ConfirmModal';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3d2b1f] font-sans antialiased selection:bg-[#8b5e34] selection:text-white">
      {/* Üst Navbar */}
      <Navbar />

      {/* Ana İçerik Konteyneri */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistikler */}
        <StatsCards />

        {/* Arama ve Filtre Çubuğu */}
        <FilterBar />

        {/* Kitap Listesi Grid */}
        <BookList />
      </main>

      {/* Modallar */}
      <BookFormModal />
      <BookDetailModal />
      <ConfirmModal />

      {/* Footer */}
      <footer className="border-t border-[#e6dbc9] bg-[#f2ebdc] py-6 text-center text-xs text-[#785942]">
        <p>© 2026 KitapDünyası E-Ticaret Admin Paneli — Sıcak Bej & Kahve Teması</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}
