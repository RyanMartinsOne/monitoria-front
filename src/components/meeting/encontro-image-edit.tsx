import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useDeleteImage, useMonitoriaImage } from "@/hooks/useImage";
import { MeetingImageField } from "./encontro-image-field";
import { MeetingImageView } from "./encontro-image-view";

interface MeetingImageEditProps {
  encontroId: number;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function MeetingImageEdit({
  encontroId,
  file,
  onFileChange,
}: MeetingImageEditProps) {
  const { data: blob, isLoading, isError } = useMonitoriaImage(encontroId);
  const deleteMutation = useDeleteImage();

  function handleDelete() {
    deleteMutation.mutate(encontroId, {
      onSuccess: () => {
        toast.add({
          title: "Imagem removida",
          description: "A imagem da monitoria foi removida.",
          type: "success",
        });
      },
      onError: () => {
        toast.add({
          title: "Erro ao remover imagem",
          description: "Não foi possível remover a imagem.",
          type: "error",
        });
      },
    });
  }

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Carregando imagem...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Não foi possível carregar a imagem.
      </p>
    );
  }

  // Já existe imagem: mostra e permite remover
  if (blob) {
    return (
      <div className="space-y-2">
        <MeetingImageView encontroId={encontroId} />

        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={deleteMutation.isPending}
          onClick={handleDelete}
        >
          {deleteMutation.isPending ? "Removendo..." : "Remover imagem"}
        </Button>
      </div>
    );
  }

  // Não existe imagem: seletor para adicionar
  return (
    <MeetingImageField file={file} onFileChange={onFileChange} hideLabel />
  );
}
