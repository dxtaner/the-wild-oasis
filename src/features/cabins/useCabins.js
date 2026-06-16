import { useQuery } from "@tanstack/react-query";
import { getCabins } from "./apiCabins";

export function useCabins() {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
}
