import { getEncontroById, getUsuarios } from "@/services/dashboard";
import type { EncontroResponse } from "@/types/encontro";
import type { UsuarioResponse } from "@/types/usuarios";
import { useQuery } from "@tanstack/react-query";

export function useEncontroById(id: string) {
  return useQuery<EncontroResponse[]>({
    queryKey: ["encontro", id],
    queryFn: () => getEncontroById(id),
  });
}

export function useUsuarios() {
  return useQuery<UsuarioResponse[]>({
    queryKey: ["usuarios"],
    queryFn: () => getUsuarios(),
  });
}