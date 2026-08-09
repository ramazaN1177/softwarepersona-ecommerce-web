import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { BooksPage } from './pages/BooksPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { BookFormModal } from './components/BookFormModal';
import { BookDetailModal } from './components/BookDetailModal';
import { ConfirmModal } from './components/ConfirmModal';
import { CartDrawer } from './components/CartDrawer';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3d2b1f] font-sans antialiased selection:bg-[#8b5e34] selection:text-white flex flex-col justify-between">
      <div>
        {/* Üst Navigasyon Çubuğu */}
        <Navbar />

        {/* Sayfa Yönlendirmeleri (React Router) */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* İlk Açılan Sayfa: Satış & Analiz Dashboard */}
            <Route path="/" element={<DashboardPage />} />

            {/* Kitap Kataloğu Sayfası */}
            <Route path="/books" element={<BooksPage />} />

            {/* Özel Kitap Detay Sayfası */}
            <Route path="/books/:id" element={<BookDetailPage />} />

            {/* Bilinmeyen adresleri Dashboard'a yönlendir */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Modallar & Sepet Çekmecesi */}
      <BookFormModal />
      <BookDetailModal />
      <ConfirmModal />
      <CartDrawer />

      {/* Footer */}
      <footer className="border-t border-[#e6dbc9] bg-[#f2ebdc] py-6 text-center text-xs text-[#785942] mt-12">
        <p>© 2026 Ramazan Çavuş KitapDünyası E-Ticaret Admin Paneli — React Router v6 & LocalStorage</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <AppContent />
      </BookProvider>
    </BrowserRouter>
  );
}
