import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Category } from '../types/book';
import { storageService } from '../services/storageService';

interface BookContextType {
    books: Book[];
    filteredBooks: Book[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
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
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('Tüm Kategoriler');

    // Modal State'leri
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [viewingBook, setViewingBook] = useState<Book | null>(null);
    const [deletingBook, setDeletingBook] = useState<Book | null>(null);

    // İlk yüklemede LocalStorage'dan verileri çek
    useEffect(() => {
        const loadedBooks = storageService.getBooks();
        setBooks(loadedBooks);
    }, []);

    // Yeni Kitap Ekle
    const handleAddBook = (bookData: Omit<Book, 'id' | 'createdAt'>) => {
        const newBook = storageService.addBook(bookData);
        setBooks(prev => [newBook, ...prev]);
        setIsAddModalOpen(false);
    };

    // Kitap Güncelle
    const handleUpdateBook = (id: string, updatedFields: Partial<Book>) => {
        const updated = storageService.updateBook(id, updatedFields);
        if (updated) {
            setBooks(prev => prev.map(b => (b.id === id ? updated : b)));
        }
        setEditingBook(null);
    };

    // Kitap Sil
    const handleDeleteBook = (id: string) => {
        storageService.deleteBook(id);
        setBooks(prev => prev.filter(b => b.id !== id));
        setDeletingBook(null);
    };

    // Varsayılan Verilere Sıfırla
    const handleResetToDefault = () => {
        const defaultBooks = storageService.resetToDefault();
        setBooks(defaultBooks);
    };

    // Arama ve Kategoriye Göre Canlı Filtreleme
    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === 'Tüm Kategoriler' || book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <BookContext.Provider
            value={{
                books,
                filteredBooks,
                searchQuery,
                setSearchQuery,
                selectedCategory,
                setSelectedCategory,
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
                setDeletingBook
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

// Özel Hook: Bileşenlerde kolayca kullanmak için
export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBookContext bir BookProvider içinde kullanılmalıdır');
    }
    return context;
};
