import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Appointments {
    id: string; 
    created_at: string;
    service_id: number;
    client_id: string;
    employee_id: string; 
    appointment_date: string;
    appointment_time: string;
    status: string;
}

export interface Services {
    id: string; 
    title: string;
    description: string; 
}

export interface Profiles {
    id: string; 
    full_name: string; 
    role: string; 
    email: string;
}

export interface User {
  id: string;
  email: string;
}