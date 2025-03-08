'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <div
          className={`relative h-full w-full transition-transform duration-500 cursor-zoom-in ${isZoomed ? 'scale-150' : 'scale-100'}`}
          onMouseMove={(e) => {
            if (isZoomed) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
            }
          }}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={images[selectedImage]}
            alt="Product image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedImage === 0}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
            >
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}