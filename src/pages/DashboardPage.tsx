import React, { useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Trophy, 
  ArrowUpRight, 
  Clock,
  PieChart as PieChartIcon,
  BookOpen,
  Plus,
  User,
  Calendar
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { books, setIsAddModalOpen, viewMode } = useBookContext();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Müşteri modunda iken dashboard erişilirse otomatik olarak kitap mağazasına yönlendir
  useEffect(() => {
    if (viewMode === 'customer') {
      navigate('/books');
    }
  }, [viewMode, navigate]);

  // Mock Sales Data Calculations based on actual books list
  const totalStock = books.reduce((acc, b) => acc + (b.stock || 0), 0);
  const totalValuation = books.reduce((acc, b) => acc + (b.price * (b.stock || 1)), 0);

  // Simulated Sales Figures
  const monthlyRevenue = 148450;
  const monthlySoldUnits = 1240;
  const avgOrderValue = 340;

  // Monthly Sales Bar Data
  const monthlyData = [
    { month: language === 'tr' ? 'Oca' : 'Jan', revenue: 84000, height: '45%' },
    { month: language === 'tr' ? 'Şub' : 'Feb', revenue: 92000, height: '52%' },
    { month: language === 'tr' ? 'Mar' : 'Mar', revenue: 105000, height: '60%' },
    { month: language === 'tr' ? 'Nis' : 'Apr', revenue: 118000, height: '70%' },
    { month: language === 'tr' ? 'May' : 'May', revenue: 110000, height: '65%' },
    { month: language === 'tr' ? 'Haz' : 'Jun', revenue: 132000, height: '82%' },
    { month: language === 'tr' ? 'Tem' : 'Jul', revenue: 128000, height: '78%' },
    { month: language === 'tr' ? 'Ağu' : 'Aug', revenue: 148450, height: '95%' },
  ];

  // Category Share Breakdown
  const categoryStats = [
    { name: 'Roman & Edebiyat', percent: 35, count: 434, color: 'bg-[#6f4e37]' },
    { name: 'Yazılım & Teknoloji', percent: 28, count: 347, color: 'bg-[#8b5e34]' },
    { name: 'Kişisel Gelişim', percent: 20, count: 248, color: 'bg-[#a06d3b]' },
    { name: 'Tarih & Felsefe', percent: 12, count: 148, color: 'bg-[#c58b4e]' },
    { name: 'Bilim Kurgu & Fantastik', percent: 5, count: 63, color: 'bg-[#d8cbb7]' }
  ];

  // Top Selling Books
  const topSellers = books.slice(0, 5).map((book, idx) => ({
    rank: idx + 1,
    book,
    soldCount: Math.floor(180 - idx * 28 + (book.price % 30)),
    totalRevenue: Math.floor((180 - idx * 28 + (book.price % 30)) * book.price)
  }));

  // Recent Orders Activity with Ramazan Çavuş
  const recentOrders = [
    { id: 'ORD-9842', customer: 'Ramazan Çavuş', book: books[0]?.title || 'Clean Code', date: language === 'tr' ? 'Bugün, 14:22' : 'Today, 14:22', amount: books[0]?.price || 450, status: t('status_completed') },
    { id: 'ORD-9841', customer: 'Ramazan Çavuş', book: books[1]?.title || 'Atomik Alışkanlıklar', date: language === 'tr' ? 'Bugün, 13:45' : 'Today, 13:45', amount: books[1]?.price || 220, status: t('status_shipping') },
    { id: 'ORD-9840', customer: 'Ramazan Çavuş', book: books[2]?.title || '1984', date: language === 'tr' ? 'Bugün, 12:10' : 'Today, 12:10', amount: books[2]?.price || 135, status: t('status_completed') },
    { id: 'ORD-9839', customer: 'Ramazan Çavuş', book: books[3]?.title || 'Şeker Portakalı', date: language === 'tr' ? 'Dün, 18:30' : 'Yesterday, 18:30', amount: books[3]?.price || 110, status: t('status_preparing') },
    { id: 'ORD-9838', customer: 'Ramazan Çavuş', book: books[4]?.title || 'Nutuk', date: language === 'tr' ? 'Dün, 16:15' : 'Yesterday, 16:15', amount: books[4]?.price || 190, status: t('status_completed') },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Başlık & Hızlı Aksiyon Barı */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#e8dfd1] shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-[#f4ebe1] text-[#6f4e37] rounded-xl font-bold">
              <PieChartIcon className="h-5 w-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#3d2b1f]">{t('dashboard_title')}</h2>
          </div>
          <p className="text-xs text-[#785942] mt-1">{t('dashboard_desc')}</p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            to="/books"
            className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-[#6f4e37] bg-[#f4ebe1] hover:bg-[#e8dfd1] rounded-xl border border-[#e5dac8] transition"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t('dash_all_catalog')}</span>
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-[#faf7f2] bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] rounded-xl shadow-sm transition"
          >
            <Plus className="h-4 w-4" />
            <span>{t('nav_add_book')}</span>
          </button>
        </div>
      </div>

      {/* 4 Ana Metrik Kartı */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Aylık Ciro */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e8dfd1] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#785942]">{t('dash_monthly_revenue')}</span>
            <span className="p-2 bg-[#f4ebe1] text-[#6f4e37] rounded-xl">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3d2b1f]">{monthlyRevenue.toLocaleString('tr-TR')} ₺</h3>
          <div className="flex items-center mt-2 text-[11px] sm:text-xs font-semibold text-[#2e6f40]">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
            <span>+%18.4</span>
          </div>
        </div>

        {/* Satılan Kitap Adedi */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e8dfd1] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#785942]">{t('dash_sold_units')}</span>
            <span className="p-2 bg-[#eaf3ed] text-[#2e6f40] rounded-xl">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3d2b1f]">{monthlySoldUnits.toLocaleString('tr-TR')}</h3>
          <div className="flex items-center mt-2 text-[11px] sm:text-xs font-semibold text-[#2e6f40]">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
            <span>+%12.5</span>
          </div>
        </div>

        {/* Ortalama Sepet Tutarı */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e8dfd1] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#785942]">{t('dash_avg_basket')}</span>
            <span className="p-2 bg-[#fdf3e7] text-[#9c5f25] rounded-xl">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3d2b1f]">{avgOrderValue} ₺</h3>
          <div className="flex items-center mt-2 text-[11px] sm:text-xs font-semibold text-[#2e6f40]">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
            <span>+%5.2</span>
          </div>
        </div>

        {/* Aktif Stok Değeri */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e8dfd1] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#785942]">{t('dash_stock_value')}</span>
            <span className="p-2 bg-[#f4ebe1] text-[#6f4e37] rounded-xl">
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3d2b1f]">{totalValuation.toLocaleString('tr-TR')} ₺</h3>
          <div className="flex items-center mt-2 text-[11px] sm:text-xs font-semibold text-[#785942]">
            <span>{totalStock} {language === 'tr' ? 'Adet Depoda' : 'Items in Stock'}</span>
          </div>
        </div>

      </div>

      {/* Grafikler Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Aylık Satış Bar Grafiği */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-[#e8dfd1] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#3d2b1f]">{t('dash_chart_title')}</h3>
              <p className="text-xs text-[#785942]">{t('dash_chart_sub')}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6f4e37]"></span>
              <span className="text-[11px] text-[#785942] font-semibold">Ciro (₺)</span>
            </div>
          </div>

          <div className="h-56 sm:h-64 flex items-end justify-between gap-1.5 sm:gap-2 pt-8 pb-2 px-1 border-b border-[#f2ebdc]">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition bg-[#3d2b1f] text-[#faf7f2] text-[10px] font-bold py-1 px-1.5 rounded-lg pointer-events-none whitespace-nowrap shadow-md z-10">
                  {item.revenue.toLocaleString('tr-TR')} ₺
                </div>

                <div 
                  style={{ height: item.height }} 
                  className="w-full max-w-[36px] bg-gradient-to-t from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] hover:to-[#774f2a] rounded-t-lg transition-all duration-300 shadow-sm"
                />

                <span className="text-[11px] font-semibold text-[#785942] mt-3">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-[#8c7462] pt-4 gap-1">
            <span>{language === 'tr' ? 'En Yüksek Ciro:' : 'Highest Revenue:'} <b>148,450 ₺</b></span>
            <span>{language === 'tr' ? 'Ortalama Aylık Ciro:' : 'Avg Monthly Revenue:'} <b>114,680 ₺</b></span>
          </div>
        </div>

        {/* Kategori Bazlı Dağılım */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e8dfd1] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#3d2b1f] mb-1">{t('dash_cat_title')}</h3>
            <p className="text-xs text-[#785942] mb-6">Kategorilerin toplam satış içindeki oranı</p>

            <div className="space-y-4">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#3d2b1f] truncate pr-2">{cat.name}</span>
                    <span className="text-[#6f4e37] shrink-0">%{cat.percent} ({cat.count})</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#f4ebe1] rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${cat.percent}%` }} 
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#f2ebdc] text-center">
            <p className="text-xs text-[#785942]">{language === 'tr' ? 'Lider Kategori:' : 'Leading Category:'} <b className="text-[#6f4e37]">Roman & Edebiyat (%35)</b></p>
          </div>
        </div>

      </div>

      {/* En Çok Satan Kitaplar Leaderboard */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e8dfd1] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-[#fdf3e7] text-[#9c5f25] rounded-xl font-bold">
              <Trophy className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#3d2b1f]">{t('dash_top_title')}</h3>
              <p className="text-xs text-[#785942]">{t('dash_top_sub')}</p>
            </div>
          </div>
          <Link to="/books" className="text-xs font-bold text-[#6f4e37] hover:underline whitespace-nowrap">
            {t('dash_all_catalog')} →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead>
              <tr className="border-b border-[#e8dfd1] text-[#785942] uppercase font-bold text-[11px] whitespace-nowrap">
                <th className="pb-3 pl-2 w-12">{t('table_rank')}</th>
                <th className="pb-3">{t('table_book')}</th>
                <th className="pb-3">{t('table_category')}</th>
                <th className="pb-3">{t('table_price')}</th>
                <th className="pb-3">{t('table_sold')}</th>
                <th className="pb-3">{t('table_revenue')}</th>
                <th className="pb-3 pr-2 text-right">{t('table_detail')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4ebe1]">
              {topSellers.map((item) => (
                <tr key={item.book.id} className="hover:bg-[#faf7f2] transition">
                  <td className="py-3 pl-2 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      item.rank === 1 ? 'bg-amber-400 text-amber-950' :
                      item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                      item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-[#e9dfce] text-[#543d2b]'
                    }`}>
                      #{item.rank}
                    </span>
                  </td>

                  <td className="py-3 pr-4">
                    <div className="flex items-center space-x-3 min-w-[180px]">
                      <img 
                        src={item.book.coverImage} 
                        alt={item.book.title} 
                        className="w-8 h-11 object-cover rounded-md shadow-sm border border-[#e5dac8] shrink-0" 
                      />
                      <div className="min-w-0">
                        <Link to={`/books/${item.book.id}`} className="font-bold text-[#3d2b1f] hover:text-[#8b5e34] block truncate">
                          {item.book.title}
                        </Link>
                        <span className="text-[#8c7462] text-[11px] block truncate">{item.book.author}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-[#f4ebe1] text-[#6f4e37] rounded-md font-semibold text-[11px]">
                      {item.book.category}
                    </span>
                  </td>

                  <td className="py-3 font-semibold text-[#3d2b1f] whitespace-nowrap">{item.book.price} ₺</td>
                  <td className="py-3 font-bold text-[#6f4e37] whitespace-nowrap">{item.soldCount}</td>
                  <td className="py-3 font-bold text-[#2e6f40] whitespace-nowrap">{item.totalRevenue.toLocaleString('tr-TR')} ₺</td>

                  <td className="py-3 pr-2 text-right whitespace-nowrap">
                    <Link
                      to={`/books/${item.book.id}`}
                      className="px-2.5 py-1 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-lg text-[11px] font-bold transition"
                    >
                      {t('btn_detail')} →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Son Sipariş Hareketleri */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e8dfd1] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-[#eaf3ed] text-[#2e6f40] rounded-xl font-bold">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#3d2b1f]">{t('dash_recent_title')}</h3>
              <p className="text-xs text-[#785942]">{t('dash_recent_sub')}</p>
            </div>
          </div>
        </div>

        {/* MOBİL GÖRÜNÜM KARTLARI */}
        <div className="block sm:hidden space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-3.5 bg-[#faf7f2] rounded-xl border border-[#e8dfd1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#6f4e37] text-xs">{order.id}</span>
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                  order.status === t('status_completed') ? 'bg-[#eaf3ed] text-[#2e6f40]' :
                  order.status === t('status_shipping') ? 'bg-[#fdf3e7] text-[#9c5f25]' : 'bg-[#f4ebe1] text-[#6f4e37]'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="text-xs font-bold text-[#3d2b1f] flex items-center space-x-1.5">
                <User className="h-3.5 w-3.5 text-[#785942]" />
                <span>{order.customer}</span>
              </div>

              <div className="text-xs text-[#543d2b] font-semibold bg-white p-2 rounded-lg border border-[#f2ebdc]">
                {t('table_book')}: <span className="font-bold text-[#3d2b1f]">{order.book}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#8c7462]">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{order.date}</span>
                </div>
                <span className="font-bold text-[#3d2b1f] text-xs">{order.amount} ₺</span>
              </div>
            </div>
          ))}
        </div>

        {/* MASAÜSTÜ TABLOSU */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="border-b border-[#e8dfd1] text-[#785942] uppercase font-bold text-[11px] whitespace-nowrap">
                <th className="pb-3">{t('table_order_code')}</th>
                <th className="pb-3">{t('table_customer')}</th>
                <th className="pb-3">{t('table_book')}</th>
                <th className="pb-3">{t('table_date')}</th>
                <th className="pb-3">{t('table_amount')}</th>
                <th className="pb-3 text-right">{t('table_status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4ebe1]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#faf7f2] transition whitespace-nowrap">
                  <td className="py-3 font-bold text-[#6f4e37]">{order.id}</td>
                  <td className="py-3 font-semibold text-[#3d2b1f]">{order.customer}</td>
                  <td className="py-3 text-[#543d2b] font-medium">{order.book}</td>
                  <td className="py-3 text-[#8c7462]">{order.date}</td>
                  <td className="py-3 font-bold text-[#3d2b1f]">{order.amount} ₺</td>
                  <td className="py-3 text-right">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      order.status === t('status_completed') ? 'bg-[#eaf3ed] text-[#2e6f40]' :
                      order.status === t('status_shipping') ? 'bg-[#fdf3e7] text-[#9c5f25]' : 'bg-[#f4ebe1] text-[#6f4e37]'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
