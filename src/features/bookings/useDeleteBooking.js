import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "./apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,

    onSuccess: () => {
      toast.success("Booking deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("Booking could not be deleted");
    },
  });
}
