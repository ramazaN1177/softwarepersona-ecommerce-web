export interface Book {
    id: string;
    title: string;          // Ürün/Kitap Adı
    author: string;         // Yazar Adı
    price: number;          // Fiyat (₺)
    category: string;       // Kategori (Örn: Roman, Bilim, Yazılım vb.)
    description: string;    // Kitap Açıklaması
    coverImage: string;     // Kitap Kapak Fotoğrafı (URL)
    stock: number;          // Stok Adedi
    pages?: number;         // Sayfa Sayısı (Opsiyonel)
    rating?: number;        // Değerlendirme Puani (Opsiyonel)
    createdAt: string;      // Eklenme Tarihi
}

export type Category =
    | 'Tüm Kategoriler'
    | 'Roman & Edebiyat'
    | 'Yazılım & Teknoloji'
    | 'Kişisel Gelişim'
    | 'Tarih & Felsefe'
    | 'Bilim Kurgu & Fantastik';
