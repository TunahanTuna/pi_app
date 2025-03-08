export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';