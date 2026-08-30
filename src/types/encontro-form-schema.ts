import { z } from "zod";

import { MateriaEnum } from "@/types/materia";

export const meetingFormSchema = z.object({
  beneficiado: z
    .string()
    .trim()
    .min(1, "O aluno é obrigatório.")
    .regex(
      /^[A-Za-zÀ-ÿ\s']+$/,
      "O nome do aluno deve conter apenas letras, espaços e apóstrofos.",
    ),

  materia: MateriaEnum,

  assunto: z.string(),

  telefone: z.string(),

  date: z.date({
    error: "Selecione uma data.",
  }),

  time: z.string().min(1, "Selecione um horário."),

  observations: z.string(),
});

export type MeetingFormValues = z.infer<typeof meetingFormSchema>;