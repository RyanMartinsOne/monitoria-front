import type { Materia } from "./materia";

export type LoginRequest = {
  nome: string;
  senha: string;
};

export type RegisterRequest = {
  nome: string;
  materia: Materia;
  senha: string;
};

export type LoginResponse = {
  token: string;
}