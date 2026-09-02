import { CircleQuestionMark } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { DialogMeeting } from "./meeting/encontro-form";
import { Button } from "./ui/button";

export default function EmptyMeetings() {
  return (
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
  );
}
