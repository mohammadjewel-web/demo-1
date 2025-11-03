import { X } from 'lucide-react';
import { Product } from '../types/product';

interface CompareModalProps {
  products: Product[];
  theme: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
  onRemove: (productId: number) => void;
}

export default function CompareModal({ products, theme, isOpen, onClose, onRemove }: CompareModalProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div
        className={`relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Compare Products
          </h2>
          <button
            onClick={onClose}
            className={`p-3 rounded-full transition-all hover:scale-110 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${products.length}, minmax(0, 1fr))` }}>
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative rounded-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <button
                onClick={() => onRemove(product.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-3">
                <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Price</span>
                    <span className="font-bold text-blue-500">${product.price}</span>
                  </div>

                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Rating</span>
                    <span className="font-semibold">{product.rating} ★</span>
                  </div>

                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Reviews</span>
                    <span className="font-semibold">{product.reviews}</span>
                  </div>

                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Stock</span>
                    <span className="font-semibold">{product.stock} left</span>
                  </div>

                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Delivery</span>
                    <span className="font-semibold">{product.deliveryDays} days</span>
                  </div>

                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Shipping</span>
                    <span className={`font-semibold ${product.freeShipping ? 'text-green-500' : ''}`}>
                      {product.freeShipping ? 'Free' : 'Paid'}
                    </span>
                  </div>

                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    <span className="block mb-1">Colors</span>
                    <div className="flex gap-1">
                      {product.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    <span className="block mb-1">Sizes</span>
                    <span className="font-semibold">{product.sizes.join(', ')}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:scale-105 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length < 4 && (
          <div className={`mt-6 p-6 rounded-2xl text-center ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
            You can compare up to 4 products at once. Add more products to compare.
          </div>
        )}
      </div>
    </div>
  );
}
