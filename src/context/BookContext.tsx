import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Book, Category } from '../types/book';
import { storageService } from '../services/storageService';
import { toast } from 'react-toastify';

export type ViewMode = 'admin' | 'customer';
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'stock';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface BookContextType {
  books: Book[];
  filteredBooks: Book[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  resetFilters: () => void;

  // Müşteri Sepeti & Çekmece State'i
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (book: Book, quantity?: number) => void;
  updateCartQuantity: (bookId: string, delta: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;

  // CRUD Metodları
  addBook: (bookData: Omit<Book, 'id' | 'createdAt'>) => void;
  updateBook: (id: string, updatedFields: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  resetToDefault: () => void;
  
  // Modal Durumları
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  editingBook: Book | null;
  setEditingBook: (book: Book | null) => void;
  viewingBook: Book | null;
  setViewingBook: (book: Book | null) => void;
  deletingBook: Book | null;
  setDeletingBook: (book: Book | null) => void;
  isResetConfirmOpen: boolean;
  setIsResetConfirmOpen: (open: boolean) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tüm Kategoriler');
  const [viewMode, setViewMode] = useState<ViewMode>('admin');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Müşteri Sepet & Çekmece State'i
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal State'leri
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewingBook, setViewingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // İlk yüklemede LocalStorage'dan verileri çek
  useEffect(() => {
    const loadedBooks = storageService.getBooks();
    setBooks(loadedBooks);
  }, []);

  // Sepete Ekle (Toast Bildirimli)
  const handleAddToCart = useCallback((book: Book, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, book.stock);
        return prev.map(item => item.book.id === book.id ? { ...item, quantity: newQty } : item);
      }
      return [...prev, { book, quantity: Math.min(quantity, book.stock) }];
    });
    toast.success(`"${book.title}" (${quantity} adet) sepetinize eklendi!`, {
      icon: false
    });
  }, []);

  // Sepet Adet Güncelle
  const handleUpdateCartQuantity = useCallback((bookId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.book.id === bookId) {
            const targetQty = item.quantity + delta;
            if (targetQty <= 0) return null;
            const finalQty = Math.min(targetQty, item.book.stock);
            return { ...item, quantity: finalQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  }, []);

  // Sepetten Çıkar
  const handleRemoveFromCart = useCallback((bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
    toast.success('Ürün sepetten çıkarıldı.');
  }, []);

  // Sepeti Temizle
  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Yeni Kitap Ekle (Toast Bildirimli - Yeşil)
  const handleAddBook = useCallback((bookData: Omit<Book, 'id' | 'createdAt'>) => {
    const newBook = storageService.addBook(bookData);
    setBooks(prev => [newBook, ...prev]);
    setIsAddModalOpen(false);
    toast.success(`"${newBook.title}" kitabı başarıyla eklendi!`);
  }, []);

  // Kitap Güncelle (Toast Bildirimli - Yeşil)
  const handleUpdateBook = useCallback((id: string, updatedFields: Partial<Book>) => {
    const updated = storageService.updateBook(id, updatedFields);
    if (updated) {
      setBooks(prev => prev.map(b => (b.id === id ? updated : b)));
      toast.success(`"${updated.title}" kitap bilgileri güncellendi!`);
    }
    setEditingBook(null);
  }, []);

  // Kitap Sil (Toast Bildirimli - Yeşil)
  const handleDeleteBook = useCallback((id: string) => {
    const bookToDelete = books.find(b => b.id === id);
    storageService.deleteBook(id);
    setBooks(prev => prev.filter(b => b.id !== id));
    setDeletingBook(null);
    toast.success(`"${bookToDelete?.title || 'Kitap'}" başarıyla silindi!`);
  }, [books]);

  // Varsayılan Verilere Sıfırla (Yeşil)
  const handleResetToDefault = useCallback(() => {
    const defaultBooks = storageService.resetToDefault();
    setBooks(defaultBooks);
    setIsResetConfirmOpen(false);
    toast.success('Tüm kitaplar varsayılan verilere sıfırlandı.');
  }, []);

  // Filtreleri Temizle
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('Tüm Kategoriler');
    setSortOption('newest');
    setMinPrice('');
    setMaxPrice('');
    toast.success('Tüm filtreler temizlendi.');
  }, []);

  // PERFORMANS OPTİMİZASYONU: useMemo ile Caching
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const matchesSearch = 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = 
          selectedCategory === 'Tüm Kategoriler' || book.category === selectedCategory;

        const matchesMinPrice = minPrice === '' || book.price >= Number(minPrice);
        const matchesMaxPrice = maxPrice === '' || book.price <= Number(maxPrice);

        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortOption === 'stock') return b.stock - a.stock;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [books, searchQuery, selectedCategory, sortOption, minPrice, maxPrice]);

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        viewMode,
        setViewMode,
        sortOption,
        setSortOption,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        resetFilters,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart: handleAddToCart,
        updateCartQuantity: handleUpdateCartQuantity,
        removeFromCart: handleRemoveFromCart,
        clearCart: handleClearCart,
        addBook: handleAddBook,
        updateBook: handleUpdateBook,
        deleteBook: handleDeleteBook,
        resetToDefault: handleResetToDefault,
        isAddModalOpen,
        setIsAddModalOpen,
        editingBook,
        setEditingBook,
        viewingBook,
        setViewingBook,
        deletingBook,
        setDeletingBook,
        isResetConfirmOpen,
        setIsResetConfirmOpen
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext bir BookProvider içinde kullanılmalıdır');
  }
  return context;
};
