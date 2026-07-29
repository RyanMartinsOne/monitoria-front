import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { DialogMeeting } from "../../components/dialog-meeting";
import { EmptyMeetings } from "@/components/empty-meetings";

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
        <EmptyMeetings />
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-lg font-semibold">Monitorias Agendadas</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Nenhuma monitoria agendada no momento.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
