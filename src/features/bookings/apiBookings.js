import { supabase } from "../../services/supabase";

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    throw error;
  }

  return data;
}
