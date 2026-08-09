import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Crop as CropIcon, X, Check, Sparkles, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedBase64: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
  const { t, language } = useLanguage();
  const imgRef = useRef<HTMLImageElement>(null);

  const [aspect, setAspect] = useState<number | undefined>(3 / 4);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10
  });

  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  // Kırpılmış resmi Canvas üzerinden 600x800 yüksek kaliteli JPEG olarak çiz ve dönüştür
  const handleConfirmCrop = async () => {
    if (!completedCrop || !imgRef.current) {
      onCropComplete(imageSrc);
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const targetWidth = aspect ? 600 : Math.round(completedCrop.width * scaleX);
    const targetHeight = aspect ? (aspect === 1 ? 600 : 800) : Math.round(completedCrop.height * scaleY);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
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
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
      onClick={onCancel}
    >
      <div
        className="bg-[#faf7f2] border border-[#e5dac8] rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#e8dfd1] bg-[#f4ebe1]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#6f4e37] text-white rounded-xl shadow-sm">
              <CropIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3d2b1f]">
                {language === 'tr' ? 'Resmi Kırp' : 'Crop Image'}
              </h2>
              <p className="text-xs text-[#785942]">
                {language === 'tr' ? 'Köşelerden tutarak resmi dilediğiniz gibi kırpın' : 'Drag corners to crop your book image'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-[#785942] hover:bg-[#e9dfce] rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content (React Crop Alanı) */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[#18110b]">
          <div className="max-w-full max-h-[55vh] flex items-center justify-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="rounded-lg shadow-2xl border border-amber-500/40"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop Target"
                className="max-w-full max-h-[55vh] object-contain rounded-lg"
              />
            </ReactCrop>
          </div>
        </div>

        {/* Format Seçenekleri */}
        <div className="px-6 py-3 bg-white border-t border-[#e8dfd1] flex items-center justify-between text-xs">
          <span className="font-bold text-[#785942]">
            {language === 'tr' ? 'Kırpma Formatı:' : 'Aspect Ratio:'}
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setAspect(3 / 4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                aspect === 3 / 4 ? 'bg-[#6f4e37] text-white shadow-sm' : 'bg-[#f4ebe1] text-[#543d2b]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{language === 'tr' ? 'Kitap Kapağı (3:4)' : 'Book Cover (3:4)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAspect(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                aspect === 1 ? 'bg-[#6f4e37] text-white shadow-sm' : 'bg-[#f4ebe1] text-[#543d2b]'
              }`}
            >
              <span>{language === 'tr' ? 'Kare (1:1)' : 'Square (1:1)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAspect(undefined)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                aspect === undefined ? 'bg-[#6f4e37] text-white shadow-sm' : 'bg-[#f4ebe1] text-[#543d2b]'
              }`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>{language === 'tr' ? 'Serbest Kırpma' : 'Free Crop'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#e8dfd1] bg-[#f4ebe1]">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-[#d8cbb7] bg-white font-bold text-xs text-[#543d2b] hover:bg-[#faf7f2] transition"
          >
            {t('btn_cancel')}
          </button>
          <button
            type="button"
            onClick={handleConfirmCrop}
            className="flex-1 py-2.5 rounded-xl font-bold text-white text-xs shadow-md transition flex items-center justify-center space-x-2 bg-gradient-to-r from-[#6f4e37] to-[#8b5e34] hover:from-[#5a3e2b]"
          >
            <Check className="h-4 w-4" />
            <span className="whitespace-nowrap">
              {language === 'tr' ? 'Kırpmayı Onayla' : 'Confirm Crop'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
