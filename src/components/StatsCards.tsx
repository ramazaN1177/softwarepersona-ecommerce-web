import React from 'react';
import { Book, PackageCheck, AlertTriangle, Coins } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const StatsCards: React.FC = () => {
  const { books } = useBookContext();

  const totalBooksCount = books.length;
  const totalStock = books.reduce((acc, b) => acc + (b.stock || 0), 0);
  const totalValue = books.reduce((acc, b) => acc + (b.price * (b.stock || 1)), 0);
  const lowStockCount = books.filter(b => b.stock < 10).length;

  const stats = [
    {
      title: 'Toplam Kitap Çeşidi',
      value: totalBooksCount,
      icon: Book,
      bgColor: 'bg-[#f4ebe1]',
      textColor: 'text-[#6f4e37]',
      borderColor: 'border-[#e5d8c8]'
    },
    {
      title: 'Toplam Stok Adedi',
      value: totalStock.toLocaleString('tr-TR'),
      icon: PackageCheck,
      bgColor: 'bg-[#eaf3ed]',
      textColor: 'text-[#2e6f40]',
      borderColor: 'border-[#cce3d3]'
    },
    {
      title: 'Stok Değeri',
      value: `${totalValue.toLocaleString('tr-TR')} ₺`,
      icon: Coins,
      bgColor: 'bg-[#fdf3e7]',
      textColor: 'text-[#9c5f25]',
      borderColor: 'border-[#f5dfc6]'
    },
    {
      title: 'Kritik Stok (<10)',
      value: lowStockCount,
      icon: AlertTriangle,
      bgColor: lowStockCount > 0 ? 'bg-[#fdf2f2]' : 'bg-[#f2ebdc]',
      textColor: lowStockCount > 0 ? 'text-[#c0392b]' : 'text-[#785942]',
      borderColor: lowStockCount > 0 ? 'border-[#f8d7da]' : 'border-[#e5dac8]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-5 rounded-2xl bg-white border ${stat.borderColor} shadow-sm transition duration-200 hover:shadow-md hover:scale-[1.01] flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-semibold text-[#785942]">{stat.title}</p>
              <h3 className="text-2xl font-bold text-[#3d2b1f] mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
