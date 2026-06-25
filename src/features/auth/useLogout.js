import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "./apiAuth";
import { toast } from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Successfully logged out");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(`Logout failed: ${err.message}`);
    },
  });

  return { logout, isLoading };
}
