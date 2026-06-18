import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'doctor' | 'facility';
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  // Doctor Photos
  {
    id: '1',
    src: '/VMPF6651.JPG.jpeg',
    alt: 'Dr. Abhijeet Baldota at consultation desk in clinic office',
    category: 'doctor',
    title: 'Dr. Abhijeet Baldota',
    description: 'Leading Allopathy & Diabetology specialist at Alloveda Clinic'
  },
  {
    id: '2',
    src: '/VMPF6653.JPG.jpeg',
    alt: 'Doctor in professional white coat at clinic workspace with medical equipment',
    category: 'doctor',
    title: 'Professional Consultation',
    description: 'State-of-the-art medical workspace for patient care'
  },

  // Clinic & Facility Photos
  {
    id: '3',
    src: '/WhatsApp Image 2026-06-17 at 10.49.54 PM.jpeg',
    alt: 'Alloveda Clinic premium reception area with branded signage',
    category: 'facility',
    title: 'Alloveda Reception',
    description: 'Welcome to our premium healthcare facility'
  },
  {
    id: '4',
    src: '/VMPF6659.JPG.jpeg',
    alt: 'Clinic consultation room with modern medical setup and comfortable seating',
    category: 'facility',
    title: 'Consultation Room',
    description: 'Private, comfortable consultation spaces for patient comfort'
  },
  {
    id: '5',
    src: '/VMPF6660.JPG.jpeg',
    alt: 'Glass entrance door of Alloveda Clinic with bright clinical interior',
    category: 'facility',
    title: 'Clinic Entrance',
    description: 'Modern glass entrance with professional aesthetic'
  },
  {
    id: '6',
    src: '/VMPF6663.JPG.jpeg',
    alt: 'Clinic waiting area with professional seating and welcoming atmosphere',
    category: 'facility',
    title: 'Waiting Area',
    description: 'Comfortable patient waiting space'
  },
  {
    id: '7',
    src: '/VMPF6664.JPG.jpeg',
    alt: 'Medical consultation setup with diagnostic equipment at clinic desk',
    category: 'facility',
    title: 'Diagnostic Station',
    description: 'Advanced medical diagnostic equipment available on-site'
  },
  {
    id: '8',
    src: '/VMPF6666.JPG.jpeg',
    alt: 'Doctor reception desk with professional office setup and clinic branding',
    category: 'facility',
    title: 'Reception Desk',
    description: 'Professional reception area for patient check-in'
  },
  {
    id: '9',
    src: '/VMPF6667.JPG.jpeg',
    alt: 'Modern clinical office space with wall-mounted certifications and credentials',
    category: 'facility',
    title: 'Professional Credentials',
    description: 'Display of medical qualifications and certifications'
  },
  {
    id: '10',
    src: '/VMPF6669.JPG.jpeg',
    alt: 'Clinic treatment room with medical examination bed and therapeutic setup',
    category: 'facility',
    title: 'Treatment Room',
    description: 'Specialized therapeutic treatment spaces'
  },
  {
    id: '11',
    src: '/VMPF6670.JPG.jpeg',
    alt: 'Ayurvedic treatment chamber with specialized medical bed and ambient lighting',
    category: 'facility',
    title: 'Ayurveda Treatment Space',
    description: 'Dedicated Ayurveda and Panchakarma therapy chambers'
  },
  {
    id: '12',
    src: '/VMPF6672.JPG.jpeg',
    alt: 'Clinic corridor showing professional interior design and cleanliness standards',
    category: 'facility',
    title: 'Clinic Interior',
    description: 'Premium clinical infrastructure and design'
  },
  {
    id: '13',
    src: '/VMPF6680.JPG.jpeg',
    alt: 'Doctor office with extensive medical library and professional workspace organization',
    category: 'facility',
    title: 'Doctor Office',
    description: 'Professional medical library and workspace'
  },
  {
    id: '14',
    src: '/VMPF6654.JPG.jpeg',
    alt: 'Clinic examination room setup with modern medical infrastructure',
    category: 'facility',
    title: 'Examination Area',
    description: 'Modern examination and diagnostic area'
  }
];

interface LightboxImage extends GalleryImage {
  index: number;
}

export default function GalleryComponent() {
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'doctor' | 'facility'>('all');
  const [imageLoadingErrors, setImageLoadingErrors] = useState<Set<string>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const filteredImages = galleryImages.filter(img => 
    activeFilter === 'all' || img.category === activeFilter
  );

  const handleImageError = (id: string) => {
    setImageLoadingErrors(prev => new Set([...prev, id]));
  };

  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setSelectedImage({ ...image, index });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = useCallback(() => {
    if (!selectedImage) return;
    const nextIndex = (selectedImage.index + 1) % filteredImages.length;
    const nextImage = filteredImages[nextIndex];
    setSelectedImage({ ...nextImage, index: nextIndex });
  }, [selectedImage, filteredImages]);

  const goToPrevious = useCallback(() => {
    if (!selectedImage) return;
    const prevIndex = (selectedImage.index - 1 + filteredImages.length) % filteredImages.length;
    const prevImage = filteredImages[prevIndex];
    setSelectedImage({ ...prevImage, index: prevIndex });
  }, [selectedImage, filteredImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') closeLightbox();
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToNext, goToPrevious]);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-gallery-item]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredImages]);

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-10 sm:space-y-14">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
          Our Clinic & Doctor Gallery
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif leading-tight">
          Premium Healthcare Spaces & Medical Excellence
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Explore our state-of-the-art facility, professional consultation spaces, and advanced therapeutic chambers designed for optimal patient care and recovery.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {[
          { label: 'All Photos', value: 'all' as const },
          { label: 'Doctor Photos', value: 'doctor' as const },
          { label: 'Facility Photos', value: 'facility' as const }
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${
              activeFilter === filter.value
                ? 'bg-[#4CAF50] text-white shadow-lg'
                : 'bg-white border border-[#E8F5E9] text-slate-700 hover:border-[#4CAF50] hover:text-[#4CAF50]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredImages.map((image, index) => {
          const itemId = `gallery-item-${image.id}`;
          const isVisible = visibleItems.has(itemId);
          const hasError = imageLoadingErrors.has(image.id);

          return (
            <div
              key={image.id}
              id={itemId}
              data-gallery-item
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 h-64 sm:h-72 lg:h-80 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              onClick={() => openLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(image);
              }}
              style={{
                transition: isVisible ? `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s` : 'none'
              }}
            >
              {/* Image */}
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                {!hasError ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onError={() => handleImageError(image.id)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">📸</div>
                      <p className="text-xs text-slate-500 font-semibold">{image.title}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 sm:p-5">
                <h3 className="text-white font-bold text-base sm:text-lg font-serif mb-1">{image.title}</h3>
                <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{image.description}</p>
                <div className="flex items-center gap-2 mt-3 text-white/80 text-xs font-semibold">
                  <span>Click to view full size</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#4CAF50]/50 rounded-2xl sm:rounded-3xl transition-colors duration-300 pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 z-50 p-2 text-white hover:text-[#7ED957] transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Navigation and Info */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="flex-1 text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">{selectedImage.title}</h3>
                <p className="text-white/80 text-sm">{selectedImage.description}</p>
                <div className="flex items-center justify-center gap-4 pt-2 text-white/60 text-xs font-semibold">
                  <span className="px-3 py-1 bg-white/10 rounded-full">
                    {selectedImage.index + 1} / {filteredImages.length}
                  </span>
                  <span className="capitalize px-3 py-1 bg-[#4CAF50]/20 text-[#7ED957] rounded-full">
                    {selectedImage.category === 'doctor' ? 'Doctor' : 'Facility'}
                  </span>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Keyboard Hint */}
            <div className="text-center mt-4 text-white/40 text-xs">
              Use arrow keys to navigate • Press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
