"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ImageGallery } from "./ImageGallery";

interface Product {
  images: never[];
  id: number;
  name: string;
  price: number;
  image_urls: string[];
  category: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
  console.log(products);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to PI Store</h2>
          <p className="text-xl mb-8">
            Discover amazing products at great prices
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
            Explore Products
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <h2 className="text-xl font-semibold mb-6 text-purple-800">
              Categories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-100 text-purple-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white rounded-lg shadow-md p-4"
                  >
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <a
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <ImageGallery images={product.images || []} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-purple-600 font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
