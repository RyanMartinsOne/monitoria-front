import { z } from "zod";

// Valores válidos de matéria
const MATERIA_VALUES = [
  "MATEMATICA",
  "PORTUGUES",
  "INGLES",
  "ESPANHOL",
  "FISICA",
  "QUIMICA",
  "BIOLOGIA",
  "HISTORIA",
  "GEOGRAFIA",
  "FILOSOFIA",
  "SOCIOLOGIA",
  "ARTES",
] as const;

// Dicionário para ligar o value a label
const MATERIA_LABELS = {
  MATEMATICA: "Matemática",
  PORTUGUES: "Português",
  INGLES: "Inglês",
  ESPANHOL: "Espanhol",
  FISICA: "Física",
  QUIMICA: "Química",
  BIOLOGIA: "Biologia",
  HISTORIA: "História",
  GEOGRAFIA: "Geografia",
  FILOSOFIA: "Filosofia",
  SOCIOLOGIA: "Sociologia",
  ARTES: "Artes",
};

// Para o Select
export const MATERIAS = MATERIA_VALUES.map((value) => ({
  value,
  label: MATERIA_LABELS[value],
}));

// Para o zod, passando o values
export const MateriaEnum = z.enum(MATERIA_VALUES, {
  error: "A matéria é obrigatória.",
});

export type Materia = z.infer<typeof MateriaEnum>;