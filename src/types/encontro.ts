import type { Materia } from "./materia";
import type { UsuarioResponse } from "./usuarios";

export type StatusEncontro = "AGENDADO" | "CANCELADO" | "CONCLUIDO";

export type EncontroRequest = {
  beneficiado: string;
  materia: Materia;
  assunto?: string;
  telefone?: string;
  dataHora: string;
  observacoes?: string;
};

export type EncontroResponse = {
  id: string;
  monitor: UsuarioResponse;
  beneficiado: string;
  materia: Materia;
  assunto?: string;
  telefone?: string;
  status: StatusEncontro;
  dataHora: string;
  observacoes?: string;
};
