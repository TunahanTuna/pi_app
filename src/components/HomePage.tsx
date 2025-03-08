"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ["All", "Electronics", "Clothing", "Books", "Home"];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let query = supabase.from("products").select("*");

      if (selectedCategory && selectedCategory !== "All") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">PI Store</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-purple-600 hover:text-purple-800 font-medium">
              Masuk
            </button>
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-purple-600 hover:text-purple-800"
                onClick={() => setCartCount((prev) => prev + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Summer Sale is Live!</h2>
          <p className="text-xl mb-8">Get up to 50% off on trending items</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Category Filters */}
      <main className="container mx-auto px-4 pt-20 pb-8 flex">
        <div className="w-64 flex-shrink-0 pr-8">
          <h2 className="text-xl font-semibold mb-6 text-purple-800">
            Kategori
          </h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-purple-100 text-purple-800 font-medium"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                Tidak ada produk ditemukan.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-purple-50 transition-colors">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-purple-600 font-medium text-lg mb-4">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => setCartCount((prev) => prev + 1)}
                      className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
