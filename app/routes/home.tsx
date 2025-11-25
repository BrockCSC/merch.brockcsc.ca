import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { SizeGuideModal } from '~/components/size-guide-modal';
import { useOrder } from '~/context/order-context';
import { animate } from 'motion';

export function meta({}: Route.MetaArgs) {
  const baseUrl = 'https://merch.brockcsc.ca';

  return [
    { title: 'BrockCSC Official Hoodie | Premium Computer Science Club Merch' },
    {
      name: 'description',
      content:
        'Get the official BrockCSC hoodie. Premium heavyweight cotton hoodie with modern fit and durable embroidery. Available in Black and White. Free campus pickup at Brock University.',
    },
    {
      name: 'keywords',
      content:
        'BrockCSC hoodie, Brock University merchandise, computer science club apparel, premium hoodie, campus wear, St. Catharines, student merchandise',
    },
    {
      name: 'robots',
      content:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
    { rel: 'canonical', href: baseUrl },
    {
      name: 'keywords',
      content:
        'BrockCSC hoodie, Brock University merchandise, computer science club apparel, premium hoodie, campus wear, St. Catharines, student merchandise',
    },
    {
      name: 'robots',
      content:
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
    { name: 'canonical', content: baseUrl },

    // Open Graph
    { property: 'og:type', content: 'product' },
    { property: 'og:url', content: baseUrl },
    {
      property: 'og:title',
      content: 'BrockCSC Official Hoodie | Premium Computer Science Club Merch',
    },
    {
      property: 'og:description',
      content:
        'Premium heavyweight cotton hoodie with modern fit and durable embroidery. Available in Black and White. Free campus pickup.',
    },
    { property: 'og:image', content: `${baseUrl}/merch/black-m.png` },
    { property: 'og:image:alt', content: 'BrockCSC Official Hoodie in Black' },
    { property: 'og:price:amount', content: '45.00' },
    { property: 'og:price:currency', content: 'CAD' },
    { property: 'og:availability', content: 'instock' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'BrockCSC Official Hoodie | Premium Computer Science Club Merch',
    },
    {
      name: 'twitter:description',
      content:
        'Premium heavyweight cotton hoodie with modern fit and durable embroidery. Available in Black and White.',
    },
    { name: 'twitter:image', content: `${baseUrl}/merch/black-m.png` },

    // Product structured data
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'BrockCSC Official Hoodie',
        description:
          'The official hoodie of the Brock Computer Science Club. Made with premium heavyweight cotton for maximum comfort during those late-night coding sessions. Features a modern fit and durable embroidery.',
        image: [
          `${baseUrl}/merch/black-m.png`,
          `${baseUrl}/merch/black-f.png`,
          `${baseUrl}/merch/white-m.png`,
          `${baseUrl}/merch/white-f.png`,
        ],
        brand: {
          '@type': 'Organization',
          name: 'Brock Computer Science Club',
          url: 'https://brockcsc.ca',
        },
        offers: {
          '@type': 'Offer',
          price: '45.00',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Brock Computer Science Club',
          },
        },
        category: 'Apparel & Accessories > Clothing > Outerwear > Hoodies',
        material: 'Heavyweight Cotton',
        color: ['Black', 'White'],
        size: ['S', 'M', 'L', 'XL'],
      },
    },

    // Organization structured data
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Brock Computer Science Club',
        url: 'https://brockcsc.ca',
        logo: `${baseUrl}/assets/logo-black.svg`,
        sameAs: ['https://brockcsc.ca'],
      },
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
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: PRODUCT.name,
            description: PRODUCT.description,
            image: [
              `${window.location.origin}/merch/black-m.png`,
              `${window.location.origin}/merch/black-f.png`,
              `${window.location.origin}/merch/white-m.png`,
              `${window.location.origin}/merch/white-f.png`,
            ],
            brand: {
              '@type': 'Organization',
              name: 'Brock Computer Science Club',
              url: 'https://brockcsc.ca',
            },
            offers: {
              '@type': 'Offer',
              price: PRODUCT.price.toString(),
              priceCurrency: 'CAD',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Brock Computer Science Club',
              },
            },
            category: 'Apparel & Accessories > Clothing > Outerwear > Hoodies',
            material: 'Heavyweight Cotton',
            color: PRODUCT.colors.map((c) => c.name),
            size: PRODUCT.sizes,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Brock Computer Science Club',
            url: 'https://brockcsc.ca',
            logo: `${window.location.origin}/assets/logo-black.svg`,
            sameAs: ['https://brockcsc.ca'],
          }),
        }}
      />

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
                alt={`BrockCSC Official Hoodie in ${selectedColor} - Front view - Premium computer science club merchandise`}
                className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 group-hover:scale-105"
                style={{
                  opacity: currentImageIndex === 0 ? 1 : 0,
                  transition: 'opacity 1s',
                }}
              />
              <img
                src={currentImages[1]}
                alt={`BrockCSC Official Hoodie in ${selectedColor} - Back view - Premium computer science club merchandise`}
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
                    alt={`BrockCSC hoodie ${selectedColor} view ${idx + 1} thumbnail`}
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
    </>
  );
}
