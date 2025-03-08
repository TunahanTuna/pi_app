import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProduct, getProductSlugs } from '@/lib/supabase';
import { ImageGallery } from '@/components/ImageGallery';
import { AddToCart } from '@/components/AddToCart';

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <ImageGallery images={product.images} />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          
          <div className="text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </div>
          
          <AddToCart 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              variants: product.variants,
              slug: product.slug
            }}
          />
        </div>
      </div>
    </div>
  );
}