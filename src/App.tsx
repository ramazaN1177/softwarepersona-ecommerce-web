import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { Navbar } from './components/Navbar';
import { BookFormModal } from './components/BookFormModal';
import { BookDetailModal } from './components/BookDetailModal';
import { ConfirmModal } from './components/ConfirmModal';
import { CartDrawer } from './components/CartDrawer';
import { RefreshCw } from 'lucide-react';

// PERFORMANS OPTİMİZASYONU: Code-splitting & Lazy Loading (Sayfaları ihtiyaç anında yükleme)
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const BooksPage = lazy(() => import('./pages/BooksPage').then(m => ({ default: m.BooksPage })));
const BookDetailPage = lazy(() => import('./pages/BookDetailPage').then(m => ({ default: m.BookDetailPage })));

// Yükleme Spinner'ı
const PageLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
    <RefreshCw className="h-8 w-8 text-[#6f4e37] animate-spin" />
    <span className="text-xs font-bold text-[#785942]">Yükleniyor...</span>
  </div>
);

function AppContent() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3d2b1f] font-sans antialiased selection:bg-[#8b5e34] selection:text-white flex flex-col justify-between">
      <div>
        {/* Üst Navigasyon Çubuğu */}
        <Navbar />

        {/* Sayfa Yönlendirmeleri (React Router & Suspense) */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<PageLoadingFallback />}>
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
          </Suspense>
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
