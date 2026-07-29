import type { Materia } from "./materia";

export type LoginRequest = {
  name: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  materia: Materia;
  password: string;
};