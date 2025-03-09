"use client";

import { useState, useEffect } from "react";

type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
  slug: string;
};

type CartItem = CartProduct & {
  quantity: number;
};

type AddToCartProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    variants?: {
      name: string;
      options: string[];
    }[];
    slug: string;
  };
};

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }));
  };

  const addToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedVariants,
    };

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.selectedVariants) ===
            JSON.stringify(selectedVariants)
      );

      if (existingItemIndex >= 0) {
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, cartItem];
    });

    setQuantity(1);
  };

  return (
    <div className="space-y-4">
      {product.variants &&
        product.variants.map((variant) => (
          <div key={variant.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {variant.name}
            </label>
            <select
              value={selectedVariants[variant.name] || ""}
              onChange={(e) =>
                handleVariantChange(variant.name, e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Select {variant.name}</option>
              {variant.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-gray-600 hover:text-gray-700"
          >
            -
          </button>
          <span className="px-3 py-2">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-gray-600 hover:text-gray-700"
          >
            +
          </button>
        </div>
        <button
          onClick={addToCart}
          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
