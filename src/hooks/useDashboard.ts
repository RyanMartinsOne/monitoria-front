import {
  getEncontroById,
  getEncontroWithFilters,
  getUsuarioById,
  getUsuariosByMateria,
} from "@/services/dashboard";
import type { EncontroFilter, EncontroResponse } from "@/types/encontro";
import type { Materia } from "@/types/materia";
import type { UsuarioResponse } from "@/types/usuarios";
import { useQuery } from "@tanstack/react-query";

export function useEncontroById(id: string) {
  return useQuery<EncontroResponse[]>({
    queryKey: ["encontro", id],
    queryFn: () => getEncontroById(id),
    select: (data) => {
      // Ordena do mais recente ao mais antigo
      return [...data].sort((a, b) => {
        return new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime();
      });
    },
  });
}

export function useEncontroWithFilters(filter: EncontroFilter) {
  return useQuery<EncontroResponse[]>({
    queryKey: ["encontros", filter],
    queryFn: () => getEncontroWithFilters(filter),
  });
}

export function useUsuarioById(id: string) {
  return useQuery<UsuarioResponse>({
    queryKey: ["usuarios", id],
    queryFn: () => getUsuarioById(id),
  });
}

export function useUsuarios(materia?: Materia) {
  return useQuery<UsuarioResponse[]>({
    queryKey: ["usuarios", materia],
    queryFn: () => getUsuariosByMateria(materia),
  });
}
