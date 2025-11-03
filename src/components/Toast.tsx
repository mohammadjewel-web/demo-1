import { useEffect } from 'react';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export default function Toast({ message, isVisible, onClose, theme }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slideUp">
      <div
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border-2 ${
          theme === 'dark'
            ? 'bg-gray-800/90 border-green-500/50'
            : 'bg-white/90 border-green-500/50'
        }`}
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-green-500 animate-bounce" />
          <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 fill-current" />
        </div>

        <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {message}
        </span>

        <button
          onClick={onClose}
          className={`p-1 rounded-full transition-all hover:scale-110 ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
