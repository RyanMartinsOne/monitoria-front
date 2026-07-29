import type { Materia } from "./materia";

export type StatusEncontro = "AGENDADO" | "CANCELADO" | "CONCLUIDO";

export type EncontroRequest = {
  beneficiado: string;
  materia: Materia;
  assunto?: string;
  telefone?: string;
  dataHora: string;
  observations?: string;
};

export type EncontroResponse = {
  id: number;
  monitor: string;
  beneficiado: string;
  materia: Materia;
  status: StatusEncontro;
  dataHora: string;
  observations?: string;
};
