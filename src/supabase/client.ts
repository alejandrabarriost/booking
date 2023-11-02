import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
