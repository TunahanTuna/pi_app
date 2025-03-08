/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "placeholdit.co",
      "placehold.co",
      "images.unsplash.com",
      "picsum.photos",
      "cloudinary.com",
      "res.cloudinary.com",
      "fastly.picsum.photos",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 600, 800, 1200],
    imageSizes: [400, 600],
  },
};

module.exports = nextConfig;
