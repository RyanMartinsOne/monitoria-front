import { api } from "@/lib/api";
import type { EncontroResponse } from "@/types/encontro";
import type { UsuarioResponse } from "@/types/usuarios";

export async function getEncontroById(id: string): Promise<EncontroResponse[]> {
  const response = await api.get(`/dashboard/encontros/${id}`);
  return response.data;
}

export async function getUsuarios(): Promise<UsuarioResponse[]> {
  const response = await api.get("/dashboard/usuarios");
  return response.data;
}