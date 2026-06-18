import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser } from "./apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: () => {
      toast.error("User could not be deleted");
    },
  });
}
