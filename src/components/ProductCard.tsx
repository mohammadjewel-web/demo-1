import { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingCart, Eye, ArrowLeftRight, Share2 } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  theme: 'light' | 'dark';
  onQuickView: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onToggleCompare: (checked: boolean) => void;
  isInWishlist: boolean;
  isInComparison: boolean;
  index: number;
}

export default function ProductCard({
  product,
  theme,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isInWishlist,
  isInComparison,
  index,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showPriceFlip, setShowPriceFlip] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageTimer = useRef<NodeJS.Timeout>();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const badgeColors = {
    Hot: 'from-red-500 to-orange-500',
    Sale: 'from-green-500 to-emerald-500',
    Limited: 'from-purple-500 to-pink-500',
    New: 'from-blue-500 to-cyan-500',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    if (isHovered && product.images.length > 1) {
      imageTimer.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
      if (imageTimer.current) {
        clearInterval(imageTimer.current);
      }
    }

    return () => {
      if (imageTimer.current) {
        clearInterval(imageTimer.current);
      }
    };
  }, [isHovered, product.images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowPriceFlip(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPriceFlip(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } ${isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-lg'}`}
      >
        <div className="relative h-80 overflow-hidden">
          {product.images.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={image}
              alt={`${product.name} ${imgIndex + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                imgIndex === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.badge && (
            <div
              className={`absolute top-4 left-4 px-4 py-2 rounded-full font-bold text-white bg-gradient-to-r ${
                badgeColors[product.badge]
              } shadow-lg ${isHovered ? 'animate-pulse' : ''}`}
            >
              {product.badge === 'Hot' && '🔥 '}
              {product.badge === 'New' && '✨ '}
              {product.badge}
            </div>
          )}

          {discount > 0 && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
              -{discount}%
            </div>
          )}

          <button
            onClick={onToggleWishlist}
            className={`absolute top-16 right-4 p-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              isInWishlist
                ? 'bg-red-500 border-red-500 scale-110'
                : 'bg-white/20 border-white/40 hover:scale-110'
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isInWishlist ? 'fill-white text-white animate-pulse' : 'text-white'
              }`}
            />
          </button>

          <div
            className={`absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm transition-all duration-500 ${
              isHovered ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
          >
            <div className="flex items-center justify-between text-white text-sm">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {product.viewingNow} viewing now
              </span>
              <button
                onClick={() => onToggleCompare(!isInComparison)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                  isInComparison
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                Compare
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <div className="flex gap-2">
              <button
                onClick={onAddToCart}
                className="flex-1 py-3 bg-white/90 backdrop-blur-xl rounded-full font-semibold text-gray-900 hover:bg-white transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={onQuickView}
                className="p-3 bg-white/90 backdrop-blur-xl rounded-full hover:bg-white transition-all hover:scale-105"
              >
                <Eye className="w-5 h-5 text-gray-900" />
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-xl rounded-full hover:bg-white transition-all hover:scale-105">
                <Share2 className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </div>

          {product.stock < 10 && (
            <div className="absolute bottom-4 left-4">
              <div className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                Only {product.stock} left!
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div
            className={`flex items-center gap-1 mb-2 transition-all duration-500 ${
              showPriceFlip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 scale-100' : 'text-gray-300 scale-90'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                ★
              </span>
            ))}
            <span
              className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
            >
              ({product.reviews})
            </span>
          </div>

          <h3
            className={`text-xl font-bold mb-3 transition-all duration-500 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            } ${isHovered ? 'translate-y-0' : 'translate-y-1'}`}
          >
            {product.name}
          </h3>

          <div className="relative h-10 mb-3 overflow-hidden">
            <div
              className={`absolute inset-0 flex items-center gap-3 transition-all duration-500 ${
                showPriceFlip ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span
                  className={`text-lg line-through ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div
              className={`absolute inset-0 flex items-center gap-2 transition-all duration-500 ${
                showPriceFlip ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <span className="text-sm font-semibold text-green-600">Save ${product.originalPrice - product.price}</span>
            </div>
          </div>

          <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            <div className="flex items-center justify-between">
              <span>Stock Status</span>
              <div className="flex-1 mx-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    product.stock / product.totalStock > 0.5
                      ? 'bg-green-500'
                      : product.stock / product.totalStock > 0.2
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${(product.stock / product.totalStock) * 100}%`,
                  }}
                />
              </div>
              <span className="font-semibold">{product.stock}/{product.totalStock}</span>
            </div>

            {product.freeShipping && (
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Free Shipping
              </div>
            )}

            <div>Delivery: {product.deliveryDays} days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
