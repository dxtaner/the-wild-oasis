import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./apiUsers";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
