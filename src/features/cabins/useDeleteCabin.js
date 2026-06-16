import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "./apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });
}
