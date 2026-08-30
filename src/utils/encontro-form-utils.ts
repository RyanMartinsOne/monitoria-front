import { format, isValid } from "date-fns";

import type { EncontroRequest, EncontroResponse } from "@/types/encontro";
import type { Materia } from "@/types/materia";
import { toLocalDateTime } from "@/utils/local-date-time";

import type { MeetingFormValues } from "../types/encontro-form-schema";

const PREPOSICOES_NOME = new Set(["de", "da", "do", "dos", "das", "e"]);

export function normalizeStudentName(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("pt-BR")
    .split(/\s+/)
    .map((word, index) => {
      if (index > 0 && PREPOSICOES_NOME.has(word)) {
        return word;
      }

      return word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1);
    })
    .join(" ");
}

function toOptionalValue(value: string): string | undefined {
  const normalizedValue = value.trim();

  return normalizedValue || undefined;
}

function normalizePhone(value: string): string | undefined {
  const phone = value.replace(/\D/g, "");

  return phone || undefined;
}

function emptyFormValues(defaultMateria?: Materia): Partial<MeetingFormValues> {
  return {
    beneficiado: "",
    materia: defaultMateria,
    assunto: "",
    telefone: "",
    date: undefined,
    time: "12:00",
    observations: "",
  };
}

export function getMeetingFormValues(
  encontro?: EncontroResponse,
  defaultMateria?: Materia,
): Partial<MeetingFormValues> {
  if (!encontro?.dataHora) {
    return emptyFormValues(defaultMateria);
  }

  const dataHora = new Date(encontro.dataHora);

  if (!isValid(dataHora)) {
    return emptyFormValues(defaultMateria);
  }

  return {
    beneficiado: encontro.beneficiado,
    materia: encontro.materia,
    assunto: encontro.assunto ?? "",
    telefone: encontro.telefone ?? "",
    date: dataHora,
    time: format(dataHora, "HH:mm"),
    observations: encontro.observacoes ?? "",
  };
}

export function toEncontroRequest(values: MeetingFormValues): EncontroRequest {
  return {
    beneficiado: normalizeStudentName(values.beneficiado),
    materia: values.materia,
    assunto: toOptionalValue(values.assunto),
    telefone: normalizePhone(values.telefone),
    dataHora: toLocalDateTime(values.date, values.time),
    observacoes: toOptionalValue(values.observations),
  };
}
