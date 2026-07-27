"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerTime() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  return (
    <FieldGroup className="flex flex-row gap-4">
      <Field className="flex-1">
        <FieldLabel htmlFor="date">Data</FieldLabel>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                id="date"
                variant="outline"
                className="w-full justify-between font-normal"
              >
                {date ? format(date, "dd/MM/yyyy") : "Selecione"}
                <ChevronDownIcon />
              </Button>
            }
          />

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              locale={ptBR}
              mode="single"
              selected={date}
              onSelect={(value) => {
                setDate(value);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>

      <Field className="w-32">
        <FieldLabel htmlFor="time">Horário</FieldLabel>

        <Input id="time" name="horario" type="time" defaultValue="12:00" />
      </Field>
    </FieldGroup>
  );
}
