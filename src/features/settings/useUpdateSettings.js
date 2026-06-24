import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings } from "./apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,

    onSuccess: () => {
      toast.success("Settings updated");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: () => {
      toast.error("Settings update failed");
    },
  });
}
