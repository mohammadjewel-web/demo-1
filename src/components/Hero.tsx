import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  theme: 'light' | 'dark';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Hero({ theme }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTagline, setCurrentTagline] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const taglines = [
    'Discover. Desire. Deliver.',
    'Where Style Meets Innovation',
    'Elevate Your Everyday',
    'Curated For You, Powered By AI'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({
        x: (x / rect.width - 0.5) * 40,
        y: (y / rect.height - 0.5) * 40,
      });

      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const distX = e.clientX - buttonCenterX;
        const distY = e.clientY - buttonCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 150) {
          const angle = Math.atan2(distY, distX);
          const displacement = (150 - distance) / 150;
          setButtonPosition({
            x: Math.cos(angle + Math.PI) * displacement * 30,
            y: Math.sin(angle + Math.PI) * displacement * 30,
          });

          if (Math.random() < 0.3) {
            setParticles((prev) => [
              ...prev.slice(-49),
              {
                id: particleIdRef.current++,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 2,
              },
            ]);
          }
        } else {
          setButtonPosition({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${
        theme === 'dark'
          ? 'from-gray-900 via-purple-900/20 to-blue-900/20'
          : 'from-blue-50 via-purple-50 to-pink-50'
      }`}>
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                theme === 'dark' ? 'bg-purple-400' : 'bg-blue-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 rounded-full pointer-events-none ${
              theme === 'dark' ? 'bg-purple-300' : 'bg-purple-500'
            }`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: 0.8,
              animation: `particle-fade 1s ease-out forwards`,
              transform: `translate(${particle.vx * 20}px, ${particle.vy * 20}px)`,
            }}
          />
        ))}
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                AI-Powered Shopping Experience
              </span>
            </div>

            <h1 className={`text-6xl lg:text-7xl font-bold leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Fashion That
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Speaks To You
              </span>
            </h1>

            <div className="h-12 overflow-hidden">
              {taglines.map((tagline, i) => (
                <p
                  key={i}
                  className={`text-xl transition-all duration-500 ${
                    i === currentTagline ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full absolute'
                  } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {tagline}
                </p>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                ref={buttonRef}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/50"
                style={{
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px))`,
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity pointer-events-none" />

                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                    animation: 'lens-flare 2s ease-in-out infinite',
                  }}
                />
              </button>

              <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'border-gray-700 text-white hover:border-purple-500'
                  : 'border-gray-300 text-gray-900 hover:border-purple-500'
              }`}>
                Explore Collections
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              {[
                { label: 'Products', value: '10K+' },
                { label: 'Happy Customers', value: '50K+' },
                { label: 'Reviews', value: '4.9★' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              }}
            >
              <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <img
                  src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Hero Product"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePosition.x}% ${30 - mousePosition.y}%, rgba(255,255,255,0.6) 0%, transparent 40%)`,
                    animation: 'lens-reflection 3s ease-in-out infinite',
                  }}
                />

                <div
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                    animation: 'glass-glare 4s ease-in-out infinite',
                  }}
                />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-2">Premium Sneakers</h3>
                    <p className="text-white/80 mb-4">Limited Edition Collection</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-white">$299</span>
                      <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:scale-105 transition-transform">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-40 animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

              <div
                className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  animation: 'float-lens 4s ease-in-out infinite',
                  opacity: 0.3,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes particle-fade {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }

        @keyframes lens-flare {
          0%, 100% { opacity: 0; transform: translate(-20px, -20px) scale(0.8); }
          50% { opacity: 0.8; transform: translate(10px, 10px) scale(1.2); }
        }

        @keyframes lens-reflection {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }

        @keyframes glass-glare {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }

        @keyframes float-lens {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.2); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
      `}</style>
    </section>
  );
}
