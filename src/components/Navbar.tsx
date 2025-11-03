import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Bell, User, Menu, X, Mic, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [listening, setListening] = useState(false);
  const [cartCount] = useState(3);
  const [notificationCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const suggestions = ['Sneakers', 'Wireless Headphones', 'Smart Watch', 'Laptop Backpack'];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-purple-500/10'
            : 'bg-white/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
                LUXE
              </div>

              <div className="hidden lg:flex items-center gap-8">
                {['New', 'Men', 'Women', 'Kids', 'Sale'].map((item) => (
                  <button
                    key={item}
                    className={`relative group font-medium transition-colors ${
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`hidden md:flex items-center flex-1 max-w-xl mx-8 relative transition-all duration-300 ${
              searchFocused ? 'scale-105' : ''
            }`}>
              <Search className={`absolute left-4 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="AI-powered search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className={`w-full pl-12 pr-12 py-3 rounded-full border-2 transition-all duration-300 ${
                  searchFocused
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800/50 text-white'
                    : 'border-gray-200 bg-white'
                } focus:outline-none`}
              />
              <button
                onClick={() => setListening(!listening)}
                className={`absolute right-4 p-1 rounded-full transition-all ${
                  listening ? 'bg-red-500 animate-pulse' : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              {searchFocused && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="p-4">
                    <p className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Trending Now
                    </p>
                    {suggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        className={`px-4 py-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${
                          theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              {[
                { Icon: Heart, count: 0 },
                { Icon: ShoppingCart, count: cartCount },
                { Icon: Bell, count: notificationCount },
                { Icon: User, count: 0 },
              ].map(({ Icon, count }, i) => (
                <button
                  key={i}
                  className={`relative p-2 rounded-full transition-all hover:scale-110 hover:rotate-6 ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                      {count}
                    </span>
                  )}
                </button>
              ))}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-80 h-full shadow-2xl transform transition-transform duration-500 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="p-8 pt-24">
            {['New', 'Men', 'Women', 'Kids', 'Sale'].map((item, i) => (
              <div
                key={item}
                className={`py-4 border-b transition-all hover:translate-x-2 ${
                  theme === 'dark' ? 'border-gray-800 text-gray-300' : 'border-gray-100 text-gray-700'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
