import React, { useState, useRef } from 'react';
import { 
  Crop, 
  RotateCw, 
  RotateCcw, 
  Check, 
  X, 
  Move, 
  Grid, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedBase64: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Kırpma Dikdörtgeni Durumu (x, y, width, height)
  const [crop, setCrop] = useState({ x: 50, y: 25, width: 210, height: 280 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<'3:4' | '1:1' | 'free'>('3:4');
  const [showGrid, setShowGrid] = useState(true);

  // Sürükleme Başlangıcı
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, handle?: string) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    if (handle) {
      setIsResizing(handle);
    } else {
      setIsDragging(true);
    }
    setDragStart({ x: clientX - crop.x, y: clientY - crop.y });
  };

  // Sürükleme ve Boyutlandırma Hareketi
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !isResizing) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    if (isDragging) {
      let newX = clientX - dragStart.x;
      let newY = clientY - dragStart.y;

      newX = Math.max(0, Math.min(newX, bounds.width - crop.width));
      newY = Math.max(0, Math.min(newY, bounds.height - crop.height));

      setCrop(prev => ({ ...prev, x: newX, y: newY }));
    } else if (isResizing) {
      const mouseX = clientX - bounds.left;
      const mouseY = clientY - bounds.top;

      let newWidth = crop.width;
      let newHeight = crop.height;
      let newX = crop.x;
      let newY = crop.y;

      if (isResizing.includes('r')) {
        newWidth = Math.max(80, Math.min(mouseX - crop.x, bounds.width - crop.x));
      }
      if (isResizing.includes('b')) {
        newHeight = Math.max(100, Math.min(mouseY - crop.y, bounds.height - crop.y));
      }
      if (isResizing.includes('l')) {
        const diff = crop.x - mouseX;
        if (crop.width + diff >= 80) {
          newX = Math.max(0, mouseX);
          newWidth = crop.width + (crop.x - newX);
        }
      }
      if (isResizing.includes('t')) {
        const diff = crop.y - mouseY;
        if (crop.height + diff >= 100) {
          newY = Math.max(0, mouseY);
          newHeight = crop.height + (crop.y - newY);
        }
      }

      // Kırpma Formatı Oranı Uygula
      if (aspectRatio === '3:4') {
        newHeight = newWidth * (4 / 3);
      } else if (aspectRatio === '1:1') {
        newHeight = newWidth;
      }

      setCrop({ x: newX, y: newY, width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(null);
  };

  // Gerçek Piksel Çözünürlüğünde Yüksek Kaliteli Kırpma İşlemi
  const handleSaveCrop = () => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const containerBounds = container.getBoundingClientRect();
    const scaleX = img.naturalWidth / containerBounds.width;
    const scaleY = img.naturalHeight / containerBounds.height;

    const canvas = document.createElement('canvas');
    const targetWidth = aspectRatio === '3:4' ? 600 : aspectRatio === '1:1' ? 600 : Math.round(crop.width * 2);
    const targetHeight = aspectRatio === '3:4' ? 800 : aspectRatio === '1:1' ? 600 : Math.round(crop.height * 2);

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const sourceX = crop.x * scaleX;
    const sourceY = crop.y * scaleY;
    const sourceW = crop.width * scaleX;
    const sourceH = crop.height * scaleY;

    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      0,
      0,
      targetWidth,
      targetHeight
    );

    const croppedBase64 = canvas.toDataURL('image/jpeg', 0.95);
    onCropComplete(croppedBase64);
  };

  const handleResetCrop = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 50, y: 25, width: 210, height: 280 });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-none animate-fadeIn"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div className="bg-[#faf7f2] border border-[#e5dac8] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e8dfd1] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-gradient-to-tr from-[#6f4e37] to-[#8b5e34] text-white rounded-xl shadow-md">
              <Crop className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#3d2b1f] leading-tight">Profesyonel Görsel Kırpıcı</h3>
              <p className="text-xs text-[#785942]">Kılavuz çizgileri ve oranlarla resmi mükemmel hizalayın</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-[#785942] hover:bg-[#e9dfce] rounded-xl transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* İnteraktif Elle Kırpma Alanı (Photoshop Tarzı Kanvas & Kılavuz Çizgileri) */}
        <div 
          ref={containerRef}
          className="relative w-full h-80 sm:h-96 bg-[#160e0a] rounded-xl overflow-hidden flex items-center justify-center border border-[#d8cbb7] shadow-inner"
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Kırpılacak Görsel"
            style={{ 
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.2s ease'
            }}
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* Dışındaki Karartma Overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* Elle Sürüklenebilir ve Boyutlandırılabilir Kırpma Çerçevesi */}
          <div
            style={{
              left: `${crop.x}px`,
              top: `${crop.y}px`,
              width: `${crop.width}px`,
              height: `${crop.height}px`,
            }}
            onMouseDown={(e) => handleMouseDown(e)}
            onTouchStart={(e) => handleMouseDown(e)}
            className="absolute border-2 border-amber-400 cursor-move shadow-2xl z-20 group"
          >
            {/* Şeffaf İç Kısım (3x3 Kılavuz Çizgileri - Rule of Thirds Grid) */}
            <div 
              className="w-full h-full relative pointer-events-none"
              style={{
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)'
              }}
            >
              {showGrid && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  <div className="border-r border-b border-amber-300/40" />
                  <div className="border-r border-b border-amber-300/40" />
                  <div className="border-b border-amber-300/40" />
                  <div className="border-r border-b border-amber-300/40" />
                  <div className="border-r border-b border-amber-300/40" />
                  <div className="border-b border-amber-300/40" />
                  <div className="border-r border-amber-300/40" />
                  <div className="border-r border-amber-300/40" />
                  <div />
                </div>
              )}
            </div>

            {/* Taşıma İkonu */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-amber-400/80">
              <Move className="h-6 w-6 drop-shadow-lg" />
            </div>

            {/* 4 KÖŞE TUTAMAĞI (Corner Handles) */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'tl'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'tl'); }}
              className="absolute -top-2.5 -left-2.5 w-5 h-5 bg-amber-400 border-2 border-white rounded-full cursor-nwse-resize shadow-lg hover:scale-125 transition"
            />
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'tr'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'tr'); }}
              className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-amber-400 border-2 border-white rounded-full cursor-nesw-resize shadow-lg hover:scale-125 transition"
            />
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'bl'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'bl'); }}
              className="absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-amber-400 border-2 border-white rounded-full cursor-nesw-resize shadow-lg hover:scale-125 transition"
            />
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'br'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'br'); }}
              className="absolute -bottom-2.5 -right-2.5 w-5 h-5 bg-amber-400 border-2 border-white rounded-full cursor-nwse-resize shadow-lg hover:scale-125 transition"
            />

            {/* Oran Etiketi */}
            <span className="absolute bottom-2 right-2 bg-amber-500 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-md pointer-events-none">
              {aspectRatio === '3:4' ? '3:4 Kitap Kapağı' : aspectRatio === '1:1' ? '1:1 Kare' : 'Serbest'}
            </span>
          </div>

        </div>

        {/* Kontrol Paneli (Zoom + Döndürme + Grid + Format) */}
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-[#e8dfd1] text-xs">
          
          {/* Zoom & Döndürme Araç Çubuğu */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            
            {/* Zoom Slider */}
            <div className="flex items-center space-x-2 flex-1 min-w-[180px]">
              <ZoomOut className="h-4 w-4 text-[#785942] shrink-0" />
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[#6f4e37]"
              />
              <ZoomIn className="h-4 w-4 text-[#785942] shrink-0" />
              <span className="font-bold text-[#3d2b1f] text-[11px] w-10 text-right">{Math.round(zoom * 100)}%</span>
            </div>

            {/* Döndürme & Sıfırla Butonları */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                className="p-1.5 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-lg transition"
                title="Sola 90° Döndür"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-1.5 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-lg transition"
                title="Sağa 90° Döndür"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`p-1.5 rounded-lg transition ${showGrid ? 'bg-[#6f4e37] text-white' : 'bg-[#f4ebe1] text-[#6f4e37]'}`}
                title="3x3 Kılavuz Çizgileri Aç/Kapat"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleResetCrop}
                className="p-1.5 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-lg transition"
                title="Konumu Sıfırla"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Kırpma Format Seçenekleri */}
          <div className="flex items-center justify-between pt-2 border-t border-[#f2ebdc]">
            <span className="font-bold text-[#785942]">Kırpma Formatı:</span>
            <div className="flex space-x-1.5">
              <button
                type="button"
                onClick={() => setAspectRatio('3:4')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                  aspectRatio === '3:4' ? 'bg-[#6f4e37] text-white shadow-sm' : 'bg-[#f4ebe1] text-[#543d2b]'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Kitap (3:4)</span>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('1:1')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  aspectRatio === '1:1' ? 'bg-[#6f4e37] text-white shadow-sm' : 'bg-[#f4ebe1] text-[#543d2b]'
                }`}
              >
                Kare (1:1)
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('free')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  aspectRatio === 'free' ? 'bg-[#6f4e37] text-white shadow-sm' : 'bg-[#f4ebe1] text-[#543d2b]'
                }`}
              >
                <Maximize2 className="h-3 w-3 inline mr-1" />
                <span>Serbest</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Aksiyon Butonları */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-bold text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl transition"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleSaveCrop}
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] rounded-xl shadow-md flex items-center space-x-2 transition"
          >
            <Check className="h-4 w-4" />
            <span>Kırpmayı Tamamla ve Kullan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
