import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "./apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });
}
