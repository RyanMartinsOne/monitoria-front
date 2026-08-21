import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/usuarios";
import type { UsuarioResponse } from "@/types/usuarios";

export function useCurrentUser() {
  return useQuery<UsuarioResponse>({
    queryKey: ["usuario", "eu"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
}
