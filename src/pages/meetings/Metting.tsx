import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleQuestionMark, Pencil } from "lucide-react";
import { DialogMeeting } from "../../components/DialogMeeting";

function Meeting() {
  return (
    <div>
      <div className="p-6">
        <DialogMeeting>
          <Button className="absolute right-0">
            <Pencil></Pencil>
            Agendar
          </Button>
        </DialogMeeting>
        <h1 className="text-2xl font-bold">Monitoria</h1>
      </div>
      <div className="p-6">
        <Empty className="md:max-w-md justify-self-center border border-dashed border-gray-300">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleQuestionMark></CircleQuestionMark>
            </EmptyMedia>
            <EmptyTitle>Nenhuma monitoria encontrada!</EmptyTitle>
            <EmptyDescription>
              Você não tem nenhuma Monitoria marcada. Agende um Monitoria e ele
              aparecerá aqui.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <DialogMeeting>
              <Button variant="outline" size="sm">
                Agendar Monitoria
              </Button>
            </DialogMeeting>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}

export default Meeting;
