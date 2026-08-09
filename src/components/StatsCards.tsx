import React from 'react';
import { Book, PackageCheck, AlertTriangle, LiraSign } from 'lucide-react';
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
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-500/10',
            textColor: 'text-blue-400',
            borderColor: 'border-blue-500/20'
        },
        {
            title: 'Toplam Stok Adedi',
            value: totalStock.toLocaleString('tr-TR'),
            icon: PackageCheck,
            color: 'from-emerald-500 to-teal-600',
            bgColor: 'bg-emerald-500/10',
            textColor: 'text-emerald-400',
            borderColor: 'border-emerald-500/20'
        },
        {
            title: 'Stok Değeri',
            value: `${totalValue.toLocaleString('tr-TR')} ₺`,
            icon: LiraSign,
            color: 'from-violet-500 to-purple-600',
            bgColor: 'bg-violet-500/10',
            textColor: 'text-violet-400',
            borderColor: 'border-violet-500/20'
        },
        {
            title: 'Kritik Stok (<10)',
            value: lowStockCount,
            icon: AlertTriangle,
            color: 'from-amber-500 to-rose-600',
            bgColor: lowStockCount > 0 ? 'bg-rose-500/10' : 'bg-slate-800',
            textColor: lowStockCount > 0 ? 'text-rose-400' : 'text-slate-400',
            borderColor: lowStockCount > 0 ? 'border-rose-500/30' : 'border-slate-700'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className={`p-5 rounded-2xl bg-slate-900 border ${stat.borderColor} shadow-lg transition duration-200 hover:scale-[1.02] flex items-center justify-between`}
                    >
                        <div>
                            <p className="text-xs font-medium text-slate-400">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
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
