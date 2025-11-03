import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryUniverse from './components/CategoryUniverse';
import ProductGrid from './components/ProductGrid';
import FlashSale from './components/FlashSale';
import AIRecommendations from './components/AIRecommendations';
import ProductShowcase from './components/ProductShowcase';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero theme={theme} />
      <CategoryUniverse theme={theme} />
      <FlashSale theme={theme} />
      <ProductGrid theme={theme} />
      <AIRecommendations theme={theme} />
      <ProductShowcase theme={theme} />
    </div>
  );
}

export default App;
