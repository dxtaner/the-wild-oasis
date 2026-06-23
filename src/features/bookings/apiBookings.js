import { supabase } from "../../services/supabase";

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateBookingStatus(id, status, total_price) {
  const { data, error } = await supabase
    .from("bookings")
    .update({
      status,
      total_price,
    })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
