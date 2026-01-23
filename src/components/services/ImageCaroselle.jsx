import React from 'react'
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
function ImageCaroselle({service,images,API_URL}) {
     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const getImageUrl = (img) => {
  if (img.startsWith('http')) return img;
  if (img.startsWith('/')) return `${API_URL}${img}`;
  return `${API_URL}/${img}`;
};

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="space-y-4 animate">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square group">
              {images.length > 0 ? (
                <>
                  <img
                 src={getImageUrl(images[currentImageIndex])}
                    alt={`${service.titre} - ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 "
                  />
                  
                  {/* Navigation Buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <span className="text-slate-500">Pas d'image disponible</span>
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {images.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? 'border-blue-600 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <img
                      src={getImageUrl(url)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
  )
}

export default ImageCaroselle