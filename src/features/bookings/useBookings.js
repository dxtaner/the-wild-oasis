import { useQuery } from "@tanstack/react-query";
import { getBookings } from "./apiBookings";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
}
