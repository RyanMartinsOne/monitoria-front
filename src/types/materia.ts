export const MATERIAS = [
  { value: "MATEMATICA", label: "Matemática" },
  { value: "PORTUGUES", label: "Português" },
  { value: "INGLES", label: "Inglês" },
  { value: "ESPANHOL", label: "Espanhol" },
  { value: "FISICA", label: "Física" },
  { value: "QUIMICA", label: "Química" },
  { value: "BIOLOGIA", label: "Biologia" },
  { value: "HISTORIA", label: "História" },
  { value: "GEOGRAFIA", label: "Geografia" },
  { value: "FILOSOFIA", label: "Filosofia" },
  { value: "SOCIOLOGIA", label: "Sociologia" },
  { value: "ARTES", label: "Artes" },
] as const;

export type Materia = (typeof MATERIAS)[number]["value"];