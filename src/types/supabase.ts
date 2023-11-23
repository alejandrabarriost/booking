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
      booking: {
        Row: {
          car_id: string
          created_at: string
          end_date: string
          id: string
          start_date: string
          total_cost: number
          user_id: string | null
        }
        Insert: {
          car_id: string
          created_at?: string
          end_date: string
          id?: string
          start_date: string
          total_cost: number
          user_id?: string | null
        }
        Update: {
          car_id?: string
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
          total_cost?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      cars: {
        Row: {
          brand: string | null
          category: Database["public"]["Enums"]["car_category"] | null
          created_at: string
          displacement: string | null
          id: string
          image: string | null
          model: string | null
          price_per_day: number | null
          year: number | null
        }
        Insert: {
          brand?: string | null
          category?: Database["public"]["Enums"]["car_category"] | null
          created_at?: string
          displacement?: string | null
          id?: string
          image?: string | null
          model?: string | null
          price_per_day?: number | null
          year?: number | null
        }
        Update: {
          brand?: string | null
          category?: Database["public"]["Enums"]["car_category"] | null
          created_at?: string
          displacement?: string | null
          id?: string
          image?: string | null
          model?: string | null
          price_per_day?: number | null
          year?: number | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          id: string
          password: string
          role: Database["public"]["Enums"]["user_role"]
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password: string
          role: Database["public"]["Enums"]["user_role"]
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password?: string
          role?: Database["public"]["Enums"]["user_role"]
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      car_category: "supersport" | "domestic" | "offroad" | "sport"
      user_role: "admin" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
