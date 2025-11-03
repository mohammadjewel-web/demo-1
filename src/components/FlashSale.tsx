import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface FlashSaleProps {
  theme: 'light' | 'dark';
}

export default function FlashSale({ theme }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });
  const [stockPercentage] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-3xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-900 via-pink-900 to-red-900'
            : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600'
        } p-8 md:p-12`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold mb-4 animate-bounce">
                  <Zap className="w-5 h-5 animate-pulse" />
                  Flash Sale
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Limited Time Offer!
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  Up to 70% off on selected items
                </p>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-semibold">Hurry! Only {stockPercentage}% left in stock</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 relative overflow-hidden"
                      style={{ width: `${stockPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {[
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 min-w-[100px] border border-white/20">
                      <div className="text-5xl font-bold text-white mb-2 tabular-nums">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-sm text-white/80 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-all" />
                  </div>
                ))}
              </div>

              <button className="group relative px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl animate-pulse hover:animate-none">
                <span className="relative z-10 flex items-center gap-2">
                  Grab Now
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
