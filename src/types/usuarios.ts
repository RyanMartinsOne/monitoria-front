import type { Materia } from "./materia";

export type UsuarioRequest = {
  nome: string;
  materia: Materia;
};

export type UsuarioResponse = {
  id: string;
  nome: string;
  materia: Materia;
  tipo: "COORDENADOR" | "MONITOR";
};
