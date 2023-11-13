import { Database } from "./supabase";

export type Booking = Database["public"]["Tables"]["booking"]["Row"];
export type Car = Database["public"]["Tables"]["cars"]["Row"];
export type User = Database["public"]["Tables"]["user"]["Row"];
