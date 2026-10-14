import { useEffect, useRef, useState } from "react";
import { CameraIcon, ImageIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  IMAGE_ACCEPTED_TYPES,
  validateImageFile,
} from "@/utils/image-validation";

interface MeetingImageFieldProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
  hideLabel?: boolean;
}

export function MeetingImageField({
  file,
  onFileChange,
  disabled,
  hideLabel,
}: MeetingImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    const validationError = validateImageFile(selected);

    if (validationError) {
      setError(validationError);
      onFileChange(null);
      event.target.value = "";
      return;
    }

    setError(null);
    onFileChange(selected);
  }

  function handleRemove() {
    setError(null);
    onFileChange(null);

    if (inputRef.current) inputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  }

  return (
    <Field>
      {!hideLabel && <FieldLabel>Imagem (opcional)</FieldLabel>}

      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPTED_TYPES.join(",")}
        className="hidden"
        disabled={disabled}
        onChange={handleSelect}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept={IMAGE_ACCEPTED_TYPES.join(",")}
        className="hidden"
        disabled={disabled}
        onChange={handleSelect}
      />

      {previewUrl ? (
        <div className="relative w-full overflow-hidden rounded-md border">
          <img
            src={previewUrl}
            alt="Pré-visualização da imagem selecionada"
            className="max-h-48 w-full object-contain"
          />

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="absolute top-2 right-2"
            aria-label="Remover imagem selecionada"
            onClick={handleRemove}
            disabled={disabled}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 justify-center font-normal"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon className="size-4" />
            Selecionar
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1 justify-center font-normal"
            disabled={disabled}
            onClick={() => cameraInputRef.current?.click()}
          >
            <CameraIcon className="size-4" />
            Tirar foto
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </Field>
  );
}
