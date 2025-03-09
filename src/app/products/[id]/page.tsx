"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/products";
import { ImageGallery } from "@/components/ImageGallery";
import { AddToCart } from "@/components/AddToCart";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { PiPinterestLogo } from "react-icons/pi";

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative rounded-lg bg-white p-4 shadow-sm">
            <ImageGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-gray-700">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-purple-600">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              {product.description}
            </div>

            <div className="flex items-center space-x-4 py-4">
              <button className="bg-[#3b5998] text-white p-2 rounded hover:opacity-90 transition-opacity">
                <FaFacebookF size={20} />
              </button>
              <button className="bg-[#1da1f2] text-white p-2 rounded hover:opacity-90 transition-opacity">
                <FaTwitter size={20} />
              </button>
              <button className="bg-[#e60023] text-white p-2 rounded hover:opacity-90 transition-opacity">
                <PiPinterestLogo size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-gray-500">Stock</span>
                  <p className="font-medium">{product.stock} units</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <AddToCart product={product} />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-500 space-y-2">
                  <p>🚚 Free shipping for orders over $50</p>
                  <p>⏱️ Estimated delivery: 3-5 business days</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Secure Payment Methods
                </p>
                <div className="grid grid-cols-6 gap-2">
                  <img
                    src="/visa.png"
                    alt="Visa"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/mastercard.png"
                    alt="Mastercard"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/amex.png"
                    alt="American Express"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/paypal.png"
                    alt="PayPal"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/discover.png"
                    alt="Discover"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/applepay.png"
                    alt="Apple Pay"
                    className="h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
