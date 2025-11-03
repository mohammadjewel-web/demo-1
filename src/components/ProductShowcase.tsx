import { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface ProductShowcaseProps {
  theme: 'light' | 'dark';
}

export default function ProductShowcase({ theme }: ProductShowcaseProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isSpinning, setIsSpinning] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSpinning) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 30;

    setRotation({ x, y });
  };

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
    if (!isSpinning) {
      setRotation({ x: 0, y: 0 });
    }
  };

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Interactive 3D Showcase
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Move your cursor or spin the product for a closer look
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative h-[600px] flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => !isSpinning && setRotation({ x: 0, y: 0 })}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />

            <div
              className="relative transition-transform duration-500 ease-out"
              style={{
                transform: isSpinning
                  ? 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
                  : `perspective(1000px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
                animation: isSpinning ? 'spin3d 8s linear infinite' : 'none',
              }}
            >
              <div className={`relative w-[400px] h-[400px] rounded-3xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-2xl overflow-hidden`}>
                <img
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="3D Product"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${50 + rotation.y}% ${50 - rotation.x}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                  }}
                />
              </div>

              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: `${-rotation.y * 2}px ${rotation.x * 2}px 40px rgba(0,0,0,0.3)`,
                }}
              />
            </div>

            <button
              onClick={toggleSpin}
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-110 flex items-center gap-2 ${
                isSpinning
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              } shadow-2xl`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              {isSpinning ? 'Stop Spinning' : 'Spin Product'}
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full mb-4">
                Featured Product
              </div>
              <h3 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Premium Wireless Speaker
              </h3>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience unparalleled sound quality with our flagship wireless speaker.
                Featuring advanced noise cancellation, 360° audio, and 24-hour battery life.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Premium Sound Quality', value: '360° Audio' },
                { label: 'Battery Life', value: '24 Hours' },
                { label: 'Connectivity', value: 'Bluetooth 5.3' },
                { label: 'Water Resistance', value: 'IPX7 Rated' },
              ].map((spec, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {spec.label}
                  </span>
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-end gap-4">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                $499
              </span>
              <span className={`text-2xl line-through mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                $699
              </span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all hover:shadow-2xl hover:shadow-purple-500/50">
                Add to Cart
              </button>
              <button className={`px-6 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'border-gray-700 text-white hover:border-purple-500'
                  : 'border-gray-300 text-gray-900 hover:border-purple-500'
              }`}>
                View Details
              </button>
            </div>

            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Free shipping on orders over $100
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                30-day money-back guarantee • 2-year warranty included
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin3d {
          0% { transform: perspective(1000px) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}
