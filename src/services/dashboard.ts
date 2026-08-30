import { api } from "@/lib/api";
import type { EncontroFilter, EncontroResponse } from "@/types/encontro";
import type { Materia } from "@/types/materia";
import type { UsuarioResponse } from "@/types/usuarios";

export async function getEncontroById(id: string): Promise<EncontroResponse[]> {
  const response = await api.get(`/dashboard/encontros/${id}`);
  return response.data;
}

export async function getEncontroWithFilters(
  filter: EncontroFilter,
): Promise<EncontroResponse[]> {
  const params = new URLSearchParams();

  if (filter.status) {
    params.set("status", filter.status);
  }

  if (filter.materia) {
    params.set("materia", filter.materia);
  }

  const queryString = params.toString();

  const response = await api.get(
    queryString
      ? `/dashboard/encontros?${queryString}`
      : "/dashboard/encontros",
  );

  return response.data;
}

export async function getUsuarioById(id: string): Promise<UsuarioResponse> {
  const response = await api.get(`/dashboard/usuarios/${id}`);
  return response.data;
}

export async function getUsuariosByMateria(
  materia?: Materia,
): Promise<UsuarioResponse[]> {
  const params = new URLSearchParams();
  if (materia) {
    params.set("materia", materia);
  }

  const queryString = params.toString();

  const response = await api.get(
    queryString ? `/dashboard/usuarios?${queryString}` : "/dashboard/usuarios",
  );

  return response.data;
}
