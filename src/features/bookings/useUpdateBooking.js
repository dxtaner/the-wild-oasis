import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBookingStatus } from "./apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateBookingStatus(id, status),

    onSuccess: (_, variables) => {
      toast.success(`Booking marked as ${variables.status}`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("Status could not be updated");
    },
  });
}
