"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toLocalDateTime } from "@/utils/local-date-time";

interface DialogMeetingProps {
  children: React.ReactNode;
}

interface MeetingRequest {
  beneficiado: string;
  materia: string;
  assunto?: string;
  telefone?: string;
  meetingDate: string;
  observations?: string;
}

const meetingDataSchema = z.object({
  beneficiado: z
    .string()
    .min(1, "O aluno é obrigatório.")
    .regex(
      /^[A-Za-zÀ-ÿ\s']+$/, // Só aceita letras (maiúsculas e minúsculas), espaços e apóstrofos
      "O nome do aluno deve conter apenas letras e espaços.",
    )
    .transform((val) => {
      const excecoes = ["de", "da", "do", "dos", "das", "e"];
      
      return val
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((palavra, index) => {
          // A primeira letra fica maiúscula, mesmo se for exceção
          if (index !== 0 && excecoes.includes(palavra)) {
            return palavra;
          }
          return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        })
        .join(" ");
    }),
  materia: z.string().trim().min(1, "A matéria é obrigatória."),
  assunto: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
telefone: z
  .string()
  .transform((val) => val.replace(/\D/g, ""))
  .transform((val) => (val === "" ? undefined : val))
  .optional(),

  date: z
    .date({
      error: "Selecione uma data.",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "A data não pode ser anterior a hoje.",
      }
    ),

  time: z.string().min(1, "Selecione um horário."),

observations: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

type MeetingData = z.infer<typeof meetingDataSchema>;

export function DialogMeeting({ children }: DialogMeetingProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MeetingData>({
    resolver: zodResolver(meetingDataSchema),
    defaultValues: {
      time: "12:00",
    },
  });

  function onSubmit(data: MeetingData) {
    const payload: MeetingRequest = {
      beneficiado: data.beneficiado,
      materia: data.materia,
      assunto: data.assunto,
      telefone: data.telefone,
      meetingDate: toLocalDateTime(data.date, data.time),
      observations: data.observations,
    };

    console.log(payload);
  }

  return (
    <Dialog>
      <DialogTrigger render={children as React.ReactElement} />

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Agende a monitoria</DialogTitle>

            <DialogDescription>
              Adicione as informações da monitoria. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 -mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
            <Field>
              <FieldLabel>
                Aluno <span className="text-destructive">*</span>
              </FieldLabel>

              <Input {...register("beneficiado")} />

              {errors.beneficiado && (
                <p className="text-sm text-destructive">
                  {errors.beneficiado.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Matéria <span className="text-destructive">*</span>
              </FieldLabel>

              <Input {...register("materia")} />

              {errors.materia && (
                <p className="text-sm text-destructive">
                  {errors.materia.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Assunto</FieldLabel>

              <Input {...register("assunto")} />

              {errors.assunto && (
                <p className="text-sm text-destructive">
                  {errors.assunto.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Telefone</FieldLabel>

              <Input {...register("telefone")} />

              {errors.telefone && (
                <p className="text-sm text-destructive">
                  {errors.telefone.message}
                </p>
              )}
            </Field>

            <FieldGroup className="flex gap-4 flex-row justify-end-safe">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Field className="flex-1">
                    <FieldLabel>
                      Data <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="outline"
                            className="justify-between font-normal"
                          >
                            {field.value
                              ? format(field.value, "dd/MM/yyyy")
                              : "Selecione"}

                            <ChevronDownIcon />
                          </Button>
                        }
                      />

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ptBR}
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (!date) return;

                            field.onChange(date);
                            setOpenCalendar(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>

                    {errors.date && (
                      <p className="text-sm text-destructive">
                        {errors.date.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Field className="w-36">
                <FieldLabel>
                  Horário <span className="text-destructive">*</span>
                </FieldLabel>

                <Input type="time" {...register("time")} />

                {errors.time && (
                  <p className="text-sm text-destructive">
                    {errors.time.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel>Observações</FieldLabel>

              <Textarea className="resize-none" {...register("observations")} />

              {errors.observations && (
                <p className="text-sm text-destructive">
                  {errors.observations.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="flex-row justify-end-safe">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancelar
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
