import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Package, Shield, Truck } from 'lucide-react';
import { Product } from '../types/product';
import { Facebook, Twitter, Instagram } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  theme: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (selectedColor?: string, selectedSize?: string) => void;
  onToggleWishlist: () => void;
  isInWishlist: boolean;
}

export default function QuickViewModal({
  product,
  theme,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || '');
      setCurrentImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (!product?.offerEndsIn) return;

    const interval = setInterval(() => {
      const remaining = product.offerEndsIn || 0;
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const colorIndex = product.colors.findIndex((c) => c.name === colorName);
    if (colorIndex !== -1 && product.images[colorIndex]) {
      setCurrentImageIndex(colorIndex);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(selectedColor, selectedSize);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div
        className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-scaleIn ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-xl transition-all hover:scale-110 ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } shadow-xl`}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-xl rounded-full shadow-xl hover:scale-110 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-xl rounded-full shadow-xl hover:scale-110 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-blue-500 scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              {product.badge && (
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full mb-3">
                  {product.badge}
                </span>
              )}
              <h2 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.description}
              </p>
            </div>

            {product.offerEndsIn && (
              <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl">
                <p className="text-white font-semibold mb-2">⏰ Limited Time Offer Ends In:</p>
                <div className="flex gap-3">
                  {[
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Min' },
                    { value: timeLeft.seconds, label: 'Sec' },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 bg-white/20 backdrop-blur-xl rounded-lg p-3 text-center">
                      <div className="text-3xl font-bold text-white tabular-nums">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-white/80">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-end gap-4">
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className={`text-2xl line-through mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    ${product.originalPrice}
                  </span>
                  <span className="mb-2 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  🔥 {product.viewingNow} people are viewing this right now
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(product.stock / product.totalStock) * 100}%` }}
                  />
                </div>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {product.stock} left
                </span>
              </div>
            </div>

            {product.colors.length > 1 && (
              <div>
                <label className={`block text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Color: <span className="text-blue-500">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`relative w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
                        selectedColor === color.name ? 'border-blue-500 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 1 && (
              <div>
                <label className={`block text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Size: <span className="text-blue-500">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-12 h-12 rounded-xl font-bold text-xl transition-all hover:scale-110 ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  -
                </button>
                <span className={`text-2xl font-bold w-12 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className={`w-12 h-12 rounded-xl font-bold text-xl transition-all hover:scale-110 ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              <button
                onClick={onToggleWishlist}
                className={`p-4 rounded-full transition-all hover:scale-110 ${
                  isInWishlist
                    ? 'bg-red-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900'
                } shadow-xl`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareTooltip(!showShareTooltip)}
                  className={`p-4 rounded-full transition-all hover:scale-110 ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                  } shadow-xl`}
                >
                  <Share2 className="w-6 h-6" />
                </button>

                {showShareTooltip && (
                  <div
                    className={`absolute top-full right-0 mt-2 p-4 rounded-2xl shadow-2xl z-10 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="flex gap-3">
                      {[
                        { Icon: Facebook, color: 'bg-blue-600' },
                        { Icon: Twitter, color: 'bg-sky-500' },
                        { Icon: Instagram, color: 'bg-pink-600' },
                      ].map(({ Icon, color }, i) => (
                        <button
                          key={i}
                          className={`${color} text-white p-3 rounded-full hover:scale-110 transition-all`}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
              Buy Now
            </button>

            <div className={`grid grid-cols-3 gap-4 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {[
                { Icon: Truck, text: `${product.deliveryDays} days delivery` },
                { Icon: Shield, text: '2-year warranty' },
                { Icon: Package, text: '30-day returns' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
