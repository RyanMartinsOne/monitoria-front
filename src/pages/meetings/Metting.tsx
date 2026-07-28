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
import { DialogMeeting } from "../../components/dialog-meeting";

function Meeting() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold">Monitoria</h1>

        <DialogMeeting>
          <Button>
            <Pencil />
            Agendar
          </Button>
        </DialogMeeting>
      </div>
      <div className="p-6 flex justify-center">
        <Empty className="md:max-w-md lg:max-w-lg justify-self-center border border-dashed border-gray-300">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleQuestionMark></CircleQuestionMark>
            </EmptyMedia>
            <EmptyTitle>Nenhuma monitoria encontrada!</EmptyTitle>
            <EmptyDescription>
              Você não tem nenhuma Monitoria marcada. Agende uma monitoria e ela
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
