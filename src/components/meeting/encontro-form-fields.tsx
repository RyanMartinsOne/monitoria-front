import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";
import { format, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MATERIAS } from "@/types/materia";

import type { MeetingFormValues } from "../../types/encontro-form-schema";

interface MeetingFormFieldsProps {
  control: Control<MeetingFormValues>;
  register: UseFormRegister<MeetingFormValues>;
  errors: FieldErrors<MeetingFormValues>;
  disabled: boolean;
  isCalendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
}

function FormError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}

function RequiredMark({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }

  return <span className="text-destructive">*</span>;
}

export function MeetingFormFields({
  control,
  register,
  errors,
  disabled,
  isCalendarOpen,
  onCalendarOpenChange,
}: MeetingFormFieldsProps) {
  return (
    <FieldGroup className="no-scrollbar -mx-4 max-h-[70vh] overflow-y-auto px-4 py-4">
      <Field>
        <FieldLabel>
          Aluno <RequiredMark visible={!disabled} />
        </FieldLabel>

        <Input disabled={disabled} {...register("beneficiado")} />

        <FormError message={errors.beneficiado?.message} />
      </Field>

      <Field>
        <FieldLabel>
          Matéria <RequiredMark visible={!disabled} />
        </FieldLabel>

        <Controller
          name="materia"
          control={control}
          render={({ field }) => {
            const selectedMateria = MATERIAS.find(
              (item) => item.value === field.value,
            );

            return (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {selectedMateria?.label ?? "Selecione uma matéria"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent
                  side="bottom"
                  align="start"
                  alignItemWithTrigger={false}
                  sideOffset={4}
                >
                  <SelectGroup>
                    <SelectLabel>Matérias</SelectLabel>

                    {MATERIAS.map((item) => (
                      <SelectItem
                        className="cursor-pointer text-md"
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
        <FormError message={errors.materia?.message} />
      </Field>

      <Field>
        <FieldLabel>Assunto</FieldLabel>

        <Input disabled={disabled} {...register("assunto")} />

        <FormError message={errors.assunto?.message} />
      </Field>

      <Field>
        <FieldLabel>Telefone</FieldLabel>

        <Input
          disabled={disabled}
          inputMode="tel"
          autoComplete="tel"
          {...register("telefone")}
        />

        <FormError message={errors.telefone?.message} />
      </Field>

      <FieldGroup className="flex flex-row gap-4">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Field className="flex-1">
              <FieldLabel>
                Data <RequiredMark visible={!disabled} />
              </FieldLabel>

              <Popover
                open={isCalendarOpen}
                onOpenChange={onCalendarOpenChange}
              >
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      disabled={disabled}
                      className="w-full justify-between font-normal"
                    >
                      {field.value
                        ? format(field.value, "dd/MM/yyyy")
                        : "Selecione"}

                      <ChevronDownIcon className="size-4" />
                    </Button>
                  }
                />

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    disabled={{ before: startOfToday() }}
                    onSelect={(date) => {
                      if (!date) {
                        return;
                      }

                      field.onChange(date);
                      // Fecha o calendário após selecionar uma data
                      onCalendarOpenChange(false);
                    }}
                  />
                </PopoverContent>
              </Popover>

              <FormError message={errors.date?.message} />
            </Field>
          )}
        />

        <Field className="w-36">
          <FieldLabel>
            Horário <RequiredMark visible={!disabled} />
          </FieldLabel>

          <Input type="time" disabled={disabled} {...register("time")} />

          <FormError message={errors.time?.message} />
        </Field>
      </FieldGroup>

      <Field>
        <FieldLabel>Observações</FieldLabel>

        <Textarea
          disabled={disabled}
          className="resize-none"
          {...register("observations")}
        />

        <FormError message={errors.observations?.message} />
      </Field>
    </FieldGroup>
  );
}
