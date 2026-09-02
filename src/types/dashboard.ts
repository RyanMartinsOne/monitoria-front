import type { EncontroFilter } from "./encontro";
import type { Materia } from "./materia";

export type ViewMode =
  | { type: "usuario"; materia?: Materia }
  | { type: "encontro"; filter: EncontroFilter };
