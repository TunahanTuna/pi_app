export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          stock: number
          is_featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          stock: number
          is_featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category?: string
          stock?: number
          is_featured?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}