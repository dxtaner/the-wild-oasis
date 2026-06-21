import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin as createCabinApi } from "./apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCabinApi,

    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => {
      toast.error(err.message || "Cabin could not be created");
    },
  });
}
