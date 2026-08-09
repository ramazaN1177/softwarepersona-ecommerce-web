import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateCartQuantity, removeFromCart, clearCart } = useBookContext();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Slide-over Paneli */}
        <div className="w-screen max-w-md bg-[#faf7f2] border-l border-[#e5dac8] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#e8dfd1] bg-[#f4ebe1] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#6f4e37] text-[#faf7f2] rounded-xl shadow-sm">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#3d2b1f]">Alışveriş Sepetim</h2>
                <p className="text-xs text-[#785942]">Toplam {totalItemsCount} Adet Ürün</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#785942] hover:text-[#3d2b1f] hover:bg-[#e9dfce] rounded-xl transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sipariş Başarılı Bildirimi */}
          {checkoutSuccess ? (
            <div className="p-8 text-center my-auto space-y-4 animate-scaleUp">
              <div className="inline-flex p-4 bg-[#eaf3ed] text-[#2e6f40] rounded-full border border-[#cce3d3]">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-[#3d2b1f]">Siparişiniz Alındı!</h3>
              <p className="text-xs text-[#785942]">
                Siparişiniz başarıyla işlendi ve kargo hazırlığına alındı. Teşekkür ederiz!
              </p>
            </div>
          ) : cart.length === 0 ? (
            /* Boş Sepet */
            <div className="p-8 text-center my-auto space-y-4">
              <div className="inline-flex p-4 bg-[#f4ebe1] text-[#8c7462] rounded-full">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="text-base font-bold text-[#3d2b1f]">Sepetiniz Boş</h3>
              <p className="text-xs text-[#785942] max-w-xs mx-auto">
                Mağazamızdaki harika kitapları inceleyip sepetinize ekleyebilirsiniz.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-[#6f4e37] text-white rounded-xl text-xs font-bold hover:bg-[#5a3e2b] transition"
              >
                Kitapları İncele
              </button>
            </div>
          ) : (
            /* Sepet Ürün Listesi */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map(({ book, quantity }) => (
                <div 
                  key={book.id}
                  className="bg-white border border-[#e8dfd1] rounded-2xl p-4 flex gap-4 items-center shadow-sm"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded-lg border border-[#e2d5c3] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#3d2b1f] truncate">{book.title}</h4>
                    <p className="text-xs text-[#785942] font-medium">{book.author}</p>
                    <div className="text-xs font-bold text-[#6f4e37] mt-1">{book.price} ₺</div>

                    {/* Adet Seçimi (+ / -) */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center border border-[#d8cbb7] bg-[#faf7f2] rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQuantity(book.id, -1)}
                          className="p-1 text-[#543d2b] hover:bg-[#e9dfce] rounded transition"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#3d2b1f]">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(book.id, 1)}
                          disabled={quantity >= book.stock}
                          className="p-1 text-[#543d2b] hover:bg-[#e9dfce] disabled:opacity-30 rounded transition"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-[10px] text-[#8c7462]">
                        (Stok: {book.stock})
                      </span>
                    </div>
                  </div>

                  {/* Sil Butonu */}
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition shrink-0"
                    title="Sepetten Çıkar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sepet Özet & Sipariş Butonu */}
          {!checkoutSuccess && cart.length > 0 && (
            <div className="p-6 border-t border-[#e8dfd1] bg-white space-y-4">
              <div className="space-y-2 text-xs text-[#543d2b]">
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span className="font-bold text-[#3d2b1f]">{totalAmount.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo Ücreti:</span>
                  <span className="font-bold text-[#2e6f40] bg-[#eaf3ed] px-2 py-0.5 rounded-md">Ücretsiz Kargo</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#f2ebdc]">
                  <span className="font-bold text-[#3d2b1f]">Genel Toplam:</span>
                  <span className="font-extrabold text-[#6f4e37] text-base">{totalAmount.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] text-[#faf7f2] font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-[#8c7462] pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2e6f40]" />
                <span>%100 Güvenli Ödeme Garantisi</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
