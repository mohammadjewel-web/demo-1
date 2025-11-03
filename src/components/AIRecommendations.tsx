import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Info } from 'lucide-react';

interface AIRecommendationsProps {
  theme: 'light' | 'dark';
}

export default function AIRecommendations({ theme }: AIRecommendationsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);

  const recommendations = [
    {
      id: 1,
      name: 'Leather Messenger Bag',
      price: 249,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
      reason: 'Based on your recent searches for professional accessories',
      confidence: 95,
    },
    {
      id: 2,
      name: 'Wireless Earbuds Pro',
      price: 199,
      image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600',
      reason: 'Frequently bought with items in your cart',
      confidence: 89,
    },
    {
      id: 3,
      name: 'Minimalist Watch',
      price: 329,
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
      reason: 'Matches your style preferences and wishlist items',
      confidence: 92,
    },
    {
      id: 4,
      name: 'Premium Notebook Set',
      price: 49,
      image: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=600',
      reason: 'Popular among users with similar interests',
      confidence: 87,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-4">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
              AI-Powered Recommendations
            </span>
          </div>
          <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Recommended Just for You
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Curated based on your unique preferences and behavior
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {recommendations.map((product, index) => (
                <div
                  key={product.id}
                  className="min-w-full px-4"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`grid md:grid-cols-2 gap-12 items-center rounded-3xl p-12 ${
                    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
                      <div className="relative rounded-3xl overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                        theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                      }`}>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                          {product.confidence}% Match
                        </span>
                      </div>

                      <h3 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>

                      <div className="relative">
                        <div className={`flex items-start gap-3 p-4 rounded-2xl ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        }`}>
                          <Info
                            className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5 cursor-pointer"
                            onMouseEnter={() => setShowTooltip(product.id)}
                            onMouseLeave={() => setShowTooltip(null)}
                          />
                          <div>
                            <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              Why we recommend this:
                            </p>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                              {product.reason}
                            </p>
                          </div>
                        </div>

                        {showTooltip === product.id && (
                          <div className={`absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl shadow-xl z-10 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                          }`}>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              Our AI analyzed your browsing history, purchase patterns, and preferences to find the perfect match for you.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-end gap-4">
                        <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-all hover:shadow-2xl hover:shadow-purple-500/50">
                          Add to Cart
                        </button>
                        <button className={`px-6 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 ${
                          theme === 'dark'
                            ? 'border-gray-700 text-white hover:border-purple-500'
                            : 'border-gray-300 text-gray-900 hover:border-purple-500'
                        }`}>
                          Learn More
                        </button>
                      </div>

                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            AI Confidence Score
                          </span>
                          <span className="text-sm font-bold text-purple-500">{product.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                            style={{ width: `${product.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full transition-all hover:scale-110 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } shadow-xl`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full transition-all hover:scale-110 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } shadow-xl`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' : 'w-2 bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
