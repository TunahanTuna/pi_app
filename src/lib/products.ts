import { supabase } from './supabase';
import { Database } from './database.types';

export type Product = Database['public']['Tables']['products']['Row'];

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Sample products data for initialization
export const sampleProducts = [
  {
    name: 'Raspberry Pi 4 Model B',
    description: 'Latest generation Raspberry Pi with 4GB RAM',
    price: 55.99,
    image_url: 'https://example.com/raspberry-pi-4.jpg',
    category: 'Single Board Computers',
    stock: 50,
    is_featured: true
  },
  {
    name: 'Arduino Uno Rev3',
    description: 'Classic Arduino board for beginners and professionals',
    price: 23.00,
    image_url: 'https://example.com/arduino-uno.jpg',
    category: 'Microcontrollers',
    stock: 100,
    is_featured: true
  },
  {
    name: 'Sensor Kit V2.0',
    description: '37 sensors and modules kit for Arduino',
    price: 29.99,
    image_url: 'https://example.com/sensor-kit.jpg',
    category: 'Sensors',
    stock: 30,
    is_featured: false
  }
];