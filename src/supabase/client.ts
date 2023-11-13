import type { Database } from "@booking/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
