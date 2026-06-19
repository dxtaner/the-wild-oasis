import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "./apiUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedUser }) => updateUser(id, updatedUser),

    onSuccess: () => {
      toast.success("User updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: () => {
      toast.error("User could not be updated");
    },
  });
}
