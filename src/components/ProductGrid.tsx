import { useState } from 'react';
import { Heart, ShoppingCart, Eye, ArrowLeftRight } from 'lucide-react';

interface ProductGridProps {
  theme: 'light' | 'dark';
}

export default function ProductGrid({ theme }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('best-for-you');

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299,
      originalPrice: 399,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      badge: 'Hot',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 449,
      originalPrice: 599,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
      badge: 'Sale',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Designer Backpack',
      price: 129,
      originalPrice: 199,
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600',
      badge: 'Limited',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Running Shoes Elite',
      price: 189,
      originalPrice: 249,
      image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
      badge: 'Trending',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Minimalist Wallet',
      price: 79,
      originalPrice: 99,
      image: 'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=600',
      badge: 'Hot',
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Vintage Sunglasses',
      price: 159,
      originalPrice: 219,
      image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600',
      badge: 'Sale',
      rating: 4.8,
    },
  ];

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const badgeColors = {
    Hot: 'from-red-500 to-orange-500',
    Sale: 'from-green-500 to-emerald-500',
    Limited: 'from-purple-500 to-pink-500',
    Trending: 'from-blue-500 to-cyan-500',
  };

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Featured Products
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Handpicked just for you
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`mt-4 md:mt-0 px-6 py-3 rounded-full border-2 font-semibold transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:border-purple-500`}
          >
            <option value="best-for-you">Best For You</option>
            <option value="eco-friendly">Eco Friendly</option>
            <option value="editors-picks">Editor's Picks</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-2xl hover:-translate-y-2`}>
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full font-bold text-white bg-gradient-to-r ${
                    badgeColors[product.badge as keyof typeof badgeColors]
                  } animate-pulse`}>
                    {product.badge}
                  </div>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl border transition-all ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500 border-red-500 scale-110'
                        : 'bg-white/20 border-white/40 hover:scale-110'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        wishlist.includes(product.id) ? 'fill-white text-white' : 'text-white'
                      }`}
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-4 flex gap-2">
                    <button className="flex-1 py-3 bg-white/90 backdrop-blur-xl rounded-full font-semibold text-gray-900 hover:bg-white transition-all flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button className="p-3 bg-white/90 backdrop-blur-xl rounded-full hover:bg-white transition-all">
                      <Eye className="w-5 h-5 text-gray-900" />
                    </button>
                    <button className="p-3 bg-white/90 backdrop-blur-xl rounded-full hover:bg-white transition-all">
                      <ArrowLeftRight className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                    <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      ({product.rating})
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className={`text-lg line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      ${product.originalPrice}
                    </span>
                    <span className="ml-auto px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 ${
            theme === 'dark'
              ? 'border-gray-700 text-white hover:border-purple-500 hover:bg-purple-500/10'
              : 'border-gray-300 text-gray-900 hover:border-purple-500 hover:bg-purple-50'
          }`}>
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
}
