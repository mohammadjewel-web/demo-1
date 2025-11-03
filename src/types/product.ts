export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  badge?: 'Hot' | 'New' | 'Limited' | 'Sale';
  rating: number;
  reviews: number;
  description: string;
  colors: { name: string; hex: string; image: string }[];
  sizes: string[];
  stock: number;
  totalStock: number;
  viewingNow: number;
  deliveryDays: string;
  freeShipping: boolean;
  offerEndsIn?: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
