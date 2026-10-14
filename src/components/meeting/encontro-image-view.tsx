import { useEffect, useState } from "react";
import { ImageOffIcon } from "lucide-react";
import { useMonitoriaImage } from "@/hooks/useImage";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

export function MeetingImageView({ encontroId }: { encontroId: number }) {
  const { data: blob, isLoading, isError } = useMonitoriaImage(encontroId);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Cria a URL temporária e revoga quando o blob muda ou o componente desmonta
  useEffect(() => {
    if (!blob) {
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(blob);
    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [blob]);

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

  if (!blob || !imageUrl) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ImageOffIcon className="size-4" />
        Esta monitoria não possui imagem.
      </div>
    );
  }

  return (
  <Dialog>
    <DialogTrigger
      render={
        <button
          type="button"
          className="block w-full cursor-zoom-in"
          aria-label="Ampliar imagem da monitoria"
        />
      }
    >
      <img
        src={imageUrl}
        alt="Imagem da monitoria"
        className="max-h-60 w-full rounded-md border object-contain"
      />
    </DialogTrigger>

    <DialogContent className="sm:max-w-3xl">
      <DialogTitle className="sr-only">Imagem da monitoria</DialogTitle>
      <img
        src={imageUrl}
        alt="Imagem da monitoria"
        className="max-h-[80vh] w-full object-contain"
      />
    </DialogContent>
  </Dialog>
);
}
