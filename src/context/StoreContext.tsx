import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductSize } from '../types';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, size?: ProductSize, color?: string, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  formatUGX: (amount: number) => string;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  toast: { message: string; type: 'success' | 'info' | 'error'; visible: boolean } | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial cart items matching the cart screenshot (`IMG-20261108-WA0009_6d0f9295.jpg`):
// 1. Men's Denim Jacket (Size: L, Colour: Black) - UGX 180,000 x 1 = UGX 180,000
// 2. Classic Leather Handbag (Colour: Beige) - UGX 150,000 x 1 = UGX 150,000
// 3. Urban White Sneakers (Size: 42) - UGX 220,000 x 1 = UGX 220,000
// Total Subtotal (3 items) = UGX 550,000
const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'prod-4',
    name: "Men's Denim Jacket",
    price: 180000,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    quantity: 1,
    size: 'L',
    color: 'Black'
  },
  {
    id: 'cart-2',
    productId: 'prod-5',
    name: 'Classic Leather Handbag',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    quantity: 1,
    color: 'Beige'
  },
  {
    id: 'cart-3',
    productId: 'prod-3',
    name: 'Trendy Sneakers',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    quantity: 1,
    size: '42'
  }
];

// Initial wishlist matching Wishlist screenshot (`IMG-20261108-WA0001_75af83f8.jpg`):
// 2 Items in Wishlist:
// 1. Men's Casual Jacket (UGX 120,000)
// 2. Elegant Women's Dress (UGX 95,000)
const INITIAL_WISHLIST = ['prod-4', 'prod-2'];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('eec_cart_items');
      return stored ? JSON.parse(stored) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('eec_wishlist_items');
      return stored ? JSON.parse(stored) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error'; visible: boolean } | null>(null);

  useEffect(() => {
    localStorage.setItem('eec_cart_items', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eec_wishlist_items', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (product: Product, size?: ProductSize, color?: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }

      const newItem: CartItem = {
        id: `${product.id}-${size || 'default'}-${color || 'default'}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '',
        quantity,
        size: size || product.sizes[0],
        color: color || (product.colors[0] ? product.colors[0].name : undefined),
      };

      return [...prev, newItem];
    });

    showToast(`Added "${product.name}" to your cart!`, 'success');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Strictly sum of products, no hidden transport fees
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatUGX = (amount: number): string => {
    return `UGX ${Math.round(amount).toLocaleString('en-US')}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        formatUGX,
        showToast,
        toast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
