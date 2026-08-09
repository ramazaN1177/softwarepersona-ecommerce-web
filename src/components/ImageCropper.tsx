import React, { useState, useRef } from 'react';
import { Crop, RotateCw, Check, X, Move } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedBase64: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Kırpma Dikdörtgeni Durumu (x, y, width, height)
  const [crop, setCrop] = useState({ x: 40, y: 30, width: 220, height: 290 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'3:4' | 'free'>('3:4');

  // Fare/Dokunma Başlangıcı (Kırpma Kutusunu Taşıma)
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

  // Fare/Dokunma Hareketi (Sürükleme ve Boyutlandırma)
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

      // Konteynır dışına çıkmayı engelle
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

      // Sabit 3:4 Kitap Kapağı Oranı Uygula
      if (aspectRatio === '3:4') {
        newHeight = newWidth * (4 / 3);
      }

      setCrop({ x: newX, y: newY, width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(null);
  };

  // Canvas ile Seçili Alanı Gerçek Piksel Boyutlarında Kırp ve Kaydet
  const handleSaveCrop = () => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const containerBounds = container.getBoundingClientRect();
    const scaleX = img.naturalWidth / containerBounds.width;
    const scaleY = img.naturalHeight / containerBounds.height;

    const canvas = document.createElement('canvas');
    const targetWidth = 600;
    const targetHeight = 800;

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gerçek resim üzerindeki kırpma koordinatları
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

    const croppedBase64 = canvas.toDataURL('image/jpeg', 0.92);
    onCropComplete(croppedBase64);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none animate-fadeIn"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div className="bg-[#faf7f2] border border-[#e5dac8] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e8dfd1] pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#6f4e37] text-white rounded-xl shadow-sm">
              <Crop className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3d2b1f]">Manuel Görsel Kırpma</h3>
              <p className="text-xs text-[#785942]">Köşelerden sürükleyerek kırpma alanını seçin</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-[#785942] hover:bg-[#e9dfce] rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* İnteraktif Elle Kırpma Alanı (Interactive Drag & Crop Box) */}
        <div 
          ref={containerRef}
          className="relative w-full h-80 bg-[#1e140d] rounded-xl overflow-hidden flex items-center justify-center border border-[#d8cbb7]"
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Kırpılacak Görsel"
            style={{ transform: `rotate(${rotation}deg)` }}
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* Dışındaki Karartma Overlay */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />

          {/* Elle Sürüklenebilir Kırpma Kutusu (Cropping Bounding Box) */}
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
            {/* Şeffaf İç Kısım (Karartmasız Net Görsel) */}
            <div 
              className="w-full h-full bg-transparent overflow-hidden pointer-events-none"
              style={{
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
              }}
            />

            {/* Orta Taşıma İkonu */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-amber-400/80">
              <Move className="h-6 w-6 drop-shadow-md" />
            </div>

            {/* 4 KÖŞE TUTAMAĞI (Corner Handles) */}
            {/* Top-Left */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'tl'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'tl'); }}
              className="absolute -top-2 -left-2 w-4 h-4 bg-amber-400 border-2 border-white rounded-full cursor-nwse-resize shadow-md"
            />
            {/* Top-Right */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'tr'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'tr'); }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 border-2 border-white rounded-full cursor-nesw-resize shadow-md"
            />
            {/* Bottom-Left */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'bl'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'bl'); }}
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-400 border-2 border-white rounded-full cursor-nesw-resize shadow-md"
            />
            {/* Bottom-Right */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'br'); }}
              onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, 'br'); }}
              className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-400 border-2 border-white rounded-full cursor-nwse-resize shadow-md"
            />

            {/* Kapağın 3:4 Etiketi */}
            <span className="absolute bottom-1 right-1.5 bg-amber-500 text-amber-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm pointer-events-none">
              3:4 Kapak
            </span>
          </div>

        </div>

        {/* Oran ve Döndürme Seçenekleri */}
        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#e8dfd1] text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#785942]">Kırpma Formatı:</span>
            <button
              type="button"
              onClick={() => setAspectRatio('3:4')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                aspectRatio === '3:4' ? 'bg-[#6f4e37] text-white' : 'bg-[#f4ebe1] text-[#543d2b]'
              }`}
            >
              Kitap (3:4)
            </button>
            <button
              type="button"
              onClick={() => setAspectRatio('free')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                aspectRatio === 'free' ? 'bg-[#6f4e37] text-white' : 'bg-[#f4ebe1] text-[#543d2b]'
              }`}
            >
              Serbest
            </button>
          </div>

          <button
            type="button"
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="p-1.5 bg-[#f4ebe1] hover:bg-[#e8dfd1] text-[#6f4e37] rounded-lg font-bold flex items-center space-x-1 transition"
            title="90 Derece Döndür"
          >
            <RotateCw className="h-4 w-4" />
            <span>Döndür</span>
          </button>
        </div>

        {/* Footer Butonları */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-[#543d2b] bg-[#e9dfce] hover:bg-[#dfd3c0] rounded-xl transition"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleSaveCrop}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b] rounded-xl shadow-md flex items-center space-x-1.5 transition"
          >
            <Check className="h-4 w-4" />
            <span>Seçili Alanı Kırp ve Kullan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
