import { useState, useEffect } from 'react';
import { ShoppingBag, Watch, Smartphone, Shirt, Zap, Coffee } from 'lucide-react';

interface CategoryUniverseProps {
  theme: 'light' | 'dark';
}

export default function CategoryUniverse({ theme }: CategoryUniverseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(0);

  const categories = [
    { icon: ShoppingBag, name: 'Bags & Accessories', color: 'from-pink-500 to-rose-500' },
    { icon: Watch, name: 'Watches', color: 'from-blue-500 to-cyan-500' },
    { icon: Smartphone, name: 'Electronics', color: 'from-purple-500 to-indigo-500' },
    { icon: Shirt, name: 'Fashion', color: 'from-orange-500 to-amber-500' },
    { icon: Zap, name: 'Sports & Fitness', color: 'from-green-500 to-emerald-500' },
    { icon: Coffee, name: 'Morning Essentials', color: 'from-yellow-500 to-orange-500', badge: 'Suggested' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotate((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Explore Our Universe
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover categories tailored for your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredIndex === index;
            const isAutoHighlighted = autoRotate === index && hoveredIndex === null;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isHovered || isAutoHighlighted ? 'scale-110 z-10' : 'scale-100'
                }`}
              >
                <div className={`relative rounded-3xl p-8 h-48 flex flex-col items-center justify-center transition-all duration-500 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                } ${isHovered || isAutoHighlighted ? 'shadow-2xl' : 'shadow-lg'}`}>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-500 ${
                    isHovered || isAutoHighlighted ? 'opacity-100' : ''
                  }`} />

                  {category.badge && (
                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg animate-bounce">
                      {category.badge}
                    </div>
                  )}

                  <div className={`relative mb-4 transition-all duration-500 ${
                    isHovered || isAutoHighlighted ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                  }`}>
                    <Icon className={`w-12 h-12 transition-colors duration-500 ${
                      isHovered || isAutoHighlighted ? 'text-white' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </div>

                  <h3 className={`relative text-center font-semibold transition-colors duration-500 ${
                    isHovered || isAutoHighlighted ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>

                  <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 ${
                    isHovered || isAutoHighlighted
                      ? 'border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                      : 'border-transparent'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 ${
            theme === 'dark'
              ? 'border-gray-700 text-white hover:border-purple-500 hover:bg-purple-500/10'
              : 'border-gray-300 text-gray-900 hover:border-purple-500 hover:bg-purple-50'
          }`}>
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
