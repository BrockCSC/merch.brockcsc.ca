import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { SizeGuideModal } from '~/components/size-guide-modal';
import { useOrder } from '~/context/order-context';
import { animate } from 'motion';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'BrockCSC Hoodie | Official Merch' },
    {
      name: 'description',
      content:
        'Get the official BrockCSC Hoodie. Available in Black and White.',
    },
  ];
}

const PRODUCT = {
  name: 'BrockCSC Hoodie',
  price: 45.0,
  description:
    'The official hoodie of the Brock Computer Science Club. Made with premium heavyweight cotton for maximum comfort during those late-night coding sessions. Features a modern fit and durable embroidery.',
  colors: [
    { id: 'white', name: 'White', class: 'bg-white border-gray-200' },
    { id: 'black', name: 'Black', class: 'bg-black border-black' },
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  images: {
    white: {
      m: '/merch/white-m.png',
      f: '/merch/white-f.png',
    },
    black: {
      m: '/merch/black-m.png',
      f: '/merch/black-f.png',
    },
  },
};

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<'white' | 'black'>(
    'black'
  );
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { setOrderItem } = useOrder();
  const navigate = useNavigate();

  // Reset image index when color changes
  const handleColorChange = (color: 'white' | 'black') => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };

  // Auto-swap images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Landing animations
  useEffect(() => {
    animate(
      '.image-container',
      { opacity: [0, 1], scale: [0.9, 1] },
      { duration: 0.8, delay: 0.1 }
    );
    animate(
      '.title',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.2 }
    );
    animate(
      '.price',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.4 }
    );
    animate(
      '.description',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.6 }
    );
    animate(
      '.color-selector',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.8 }
    );
    animate(
      '.size-selector',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 1.0 }
    );
    animate(
      '.actions',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 1.2 }
    );
  }, []);

  const currentImages = [
    PRODUCT.images[selectedColor].m,
    PRODUCT.images[selectedColor].f,
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Image Section */}
        <div className="image-container flex flex-col gap-4">
          <div className="relative group rounded-3xl overflow-hidden bg-gray-50 aspect-square md:aspect-[4/5] flex items-center justify-center shadow-sm">
            <img
              src={currentImages[0]}
              alt={`${PRODUCT.name} in ${selectedColor} view 1`}
              className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 group-hover:scale-105"
              style={{
                opacity: currentImageIndex === 0 ? 1 : 0,
                transition: 'opacity 1s',
              }}
            />
            <img
              src={currentImages[1]}
              alt={`${PRODUCT.name} in ${selectedColor} view 2`}
              className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 group-hover:scale-105"
              style={{
                opacity: currentImageIndex === 1 ? 1 : 0,
                transition: 'opacity 1s',
              }}
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex justify-center gap-4">
            {currentImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex justify-center ${
                  currentImageIndex === idx
                    ? 'border-[#aa3b3b] ring-2 ring-[#aa3b3b] ring-offset-2'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col space-y-8 px-4 lg:px-0">
          <div className="space-y-4">
            <h1 className="title text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              {PRODUCT.name}
            </h1>
            <p className="price text-2xl font-medium text-[#aa3b3b]">
              ${PRODUCT.price.toFixed(2)}
            </p>
            <p className="description text-lg text-gray-600 leading-relaxed max-w-md">
              {PRODUCT.description}
            </p>
          </div>

          <div className="space-y-6">
            {/* Color Selector */}
            <div className="color-selector space-y-3">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Color
                </span>
              </div>
              <div className="flex gap-4">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() =>
                      handleColorChange(color.id as 'white' | 'black')
                    }
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 focus:outline-none ring-2 ring-offset-2 cursor-pointer ${color.class} ${
                      selectedColor === color.id
                        ? 'ring-[#aa3b3b] scale-110'
                        : 'ring-transparent hover:scale-105 hover:ring-[#aa3b3b]/50'
                    }`}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="size-selector space-y-3">
              <div className="flex justify-between items-center max-w-md">
                <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sm text-gray-500 underline hover:text-[#aa3b3b] transition-colors cursor-pointer"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 max-w-md">
                {PRODUCT.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#aa3b3b] bg-[#aa3b3b] text-white shadow-md'
                        : 'border-gray-200 text-gray-900 hover:border-[#aa3b3b] hover:bg-[#aa3b3b]/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="actions pt-6 pb-8 md:pb-0 max-w-md">
            <button
              onClick={() => {
                setOrderItem({
                  color: selectedColor,
                  size: selectedSize,
                  imageIndex: currentImageIndex,
                });
                navigate('/checkout');
              }}
              className="w-full bg-[#aa3b3b] text-white h-14 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#8a2f2f] hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              Order Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Free pickup at Brock University campus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
