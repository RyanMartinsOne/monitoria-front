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
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerTime } from "./DatePickerTime";
import { Textarea } from "@/components/ui/textarea";

interface DialogMeetingProps {
  children: React.ReactNode;
}

export function DialogMeeting({ children }: DialogMeetingProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form>
          <DialogHeader>
            <DialogTitle>Agende a monitoria</DialogTitle>
            <DialogDescription>
              Adicione as informações da monitoria. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 -mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
            <Field>
              <Label htmlFor="beneficiado">Aluno</Label>
              <Input id="beneficiado" name="beneficiado" />
            </Field>
            <Field>
              <Label htmlFor="materia">Matéria</Label>
              <Input id="materia" name="materia" />
            </Field>
            <Field>
              <Label htmlFor="assunto">Assunto</Label>
              <Input id="assunto" name="assunto" />
            </Field>
            <DatePickerTime />
            <Field>
            <FieldLabel htmlFor="observations">Observações</FieldLabel>
            <Textarea
              id="observations"
              name="observations"
              className="resize-none"
            />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex-row justify-end-safe">
            <DialogClose>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar Monitoria</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
