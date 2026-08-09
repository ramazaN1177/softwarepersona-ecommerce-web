import { Book } from '../types/book';

const STORAGE_KEY = 'bookstore_admin_books';

// Uygulama ilk çalıştığında görünecek varsayılan örnek kitaplar
const INITIAL_BOOKS: Book[] = [
    {
        id: '1',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        price: 450,
        category: 'Yazılım & Teknoloji',
        description: 'Kötü kod da çalışabilir. Ancak kod temiz değilse, geliştirme ekibini dize getirebilir.',
        coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
        stock: 24,
        pages: 464,
        rating: 4.9,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Atomik Alışkanlıklar',
        author: 'James Clear',
        price: 220,
        category: 'Kişisel Gelişim',
        description: 'Kötü alışkanlıkları kırıp harika alışkanlıklar edinmek için kolay ve kanıtlanmış bir yol.',
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        stock: 45,
        pages: 352,
        rating: 4.8,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        price: 135,
        category: 'Bilim Kurgu & Fantastik',
        description: 'Büyük Birader seni izliyor! Dünya edebiyatının en sarsıcı distopik romanı.',
        coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
        stock: 12,
        pages: 352,
        rating: 4.7,
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        title: 'Şeker Portakalı',
        author: 'José Mauro de Vasconcelos',
        price: 110,
        category: 'Roman & Edebiyat',
        description: 'Günün birinde acıyı keşfeden küçük bir çocuğun öyküsü.',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
        stock: 8,
        pages: 200,
        rating: 4.9,
        createdAt: new Date().toISOString()
    },
    {
        id: '5',
        title: 'Nutuk',
        author: 'Mustafa Kemal Atatürk',
        price: 190,
        category: 'Tarih & Felsefe',
        description: 'Gazi Mustafa Kemal Atatürkün Türkiye Cumhuriyetinin kuruluş sürecini anlattığı tarihi eser.',
        coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
        stock: 30,
        pages: 640,
        rating: 5.0,
        createdAt: new Date().toISOString()
    }
];

// LocalStorage İşlemleri
export const storageService = {
    // Tüm Kitapları Getir (Yoksa ilk örnek verileri yükle)
    getBooks: (): Book[] => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
            return INITIAL_BOOKS;
        }
        try {
            return JSON.parse(data);
        } catch {
            return INITIAL_BOOKS;
        }
    },

    // Yeni Kitap Ekle
    addBook: (bookData: Omit<Book, 'id' | 'createdAt'>): Book => {
        const books = storageService.getBooks();
        const newBook: Book = {
            ...bookData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        const updated = [newBook, ...books];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return newBook;
    },

    // Kitap Güncelle
    updateBook: (id: string, updatedFields: Partial<Book>): Book | null => {
        const books = storageService.getBooks();
        const index = books.findIndex(b => b.id === id);
        if (index === -1) return null;

        const updatedBook = { ...books[index], ...updatedFields };
        books[index] = updatedBook;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        return updatedBook;
    },

    // Kitap Sil
    deleteBook: (id: string): void => {
        const books = storageService.getBooks();
        const updated = books.filter(b => b.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    // Başlangıç Verilerine Sıfırla
    resetToDefault: (): Book[] => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
        return INITIAL_BOOKS;
    }
};
