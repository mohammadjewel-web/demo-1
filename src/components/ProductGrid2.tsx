import { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import CompareModal from './CompareModal';
import Toast from './Toast';

interface ProductGrid2Props {
  theme: 'light' | 'dark';
}

export default function ProductGrid2({ theme }: ProductGrid2Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...Array.from(new Set(initialProducts.map((p) => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts;

    if (filterCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return sorted;
  }, [filterCategory, sortBy]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (productId: number, color?: string, size?: string) => {
    setCart((prev) => [...prev, productId]);
    setToast({ show: true, message: 'Added to cart successfully!' });
    setIsQuickViewOpen(false);
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleToggleCompare = (productId: number, checked: boolean) => {
    if (checked && compareList.length < 4) {
      setCompareList((prev) => [...prev, productId]);
    } else if (!checked) {
      setCompareList((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleRemoveFromCompare = (productId: number) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  };

  const compareProducts = initialProducts.filter((p) => compareList.includes(p.id));

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Premium Collection
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover our handpicked selection of trending products
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                showFilters
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-900'
              } shadow-lg`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>

            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Compare ({compareList.length})
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-900'
              } shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className={`flex gap-2 p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div
            className={`mb-8 p-6 rounded-2xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-xl animate-slideDown`}
          >
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                    filterCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          className={`grid gap-8 transition-all duration-500 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              theme={theme}
              onQuickView={() => handleQuickView(product)}
              onAddToCart={() => handleAddToCart(product.id)}
              onToggleWishlist={() => handleToggleWishlist(product.id)}
              onToggleCompare={(checked) => handleToggleCompare(product.id, checked)}
              isInWishlist={wishlist.includes(product.id)}
              isInComparison={compareList.includes(product.id)}
              index={index}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className={`px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            } shadow-xl`}
          >
            Load More Products
          </button>
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        theme={theme}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={(color, size) => selectedProduct && handleAddToCart(selectedProduct.id, color, size)}
        onToggleWishlist={() => selectedProduct && handleToggleWishlist(selectedProduct.id)}
        isInWishlist={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
      />

      <CompareModal
        products={compareProducts}
        theme={theme}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={handleRemoveFromCompare}
      />

      <Toast
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, message: '' })}
        theme={theme}
      />

      {cart.length > 0 && (
        <div className="fixed bottom-8 left-8 z-40">
          <button
            className="relative p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <ShoppingCart className="w-8 h-8" />
            <span className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
