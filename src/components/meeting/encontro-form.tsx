"use client";

import { useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  useCreateEncontro,
  useDeleteEncontro,
  useUpdateEncontro,
} from "@/hooks/useEncontro";
import { useCurrentUser } from "@/hooks/useUsuarios";
import type { EncontroResponse } from "@/types/encontro";

import { MeetingFormFields } from "./encontro-form-fields";
import {
  meetingFormSchema,
  type MeetingFormValues,
} from "../../types/encontro-form-schema";
import {
  getMeetingFormValues,
  toEncontroRequest,
} from "../../utils/encontro-form-utils";
import { MeetingImageView } from "./encontro-image-view";
import { toast } from "../ui/toast";
import { useUploadImage } from "@/hooks/useImage";
import { MeetingImageEdit } from "./encontro-image-edit";
import { MeetingImageField } from "./encontro-image-field";
import { Field, FieldLabel } from "../ui/field";

type DialogMeetingMode = "create" | "view" | "edit";

function MutationErrorMessage({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) {
  if (!show) return null;
  return <p className="px-1 text-sm text-destructive">{message}</p>;
}

interface DialogMeetingProps {
  children: React.ReactNode;
  encontro?: EncontroResponse;
  mode?: DialogMeetingMode;
}

const DIALOG_CONTENT: Record<
  DialogMeetingMode,
  {
    title: string;
    description: string;
  }
> = {
  create: {
    title: "Agende a monitoria",
    description:
      "Adicione as informações da monitoria. Clique em salvar quando terminar.",
  },
  edit: {
    title: "Editar monitoria",
    description:
      "Atualize as informações da monitoria. Clique em salvar quando terminar.",
  },
  view: {
    title: "Detalhes da monitoria",
    description: "Confira as informações da monitoria.",
  },
};

export function DialogMeeting({
  children,
  encontro,
  mode: initialMode = "create",
}: DialogMeetingProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<DialogMeetingMode>(initialMode);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createdEncontroId, setCreatedEncontroId] = useState<number | null>(
    null,
  );
  const uploadImageMutation = useUploadImage();

  const { data: usuario } = useCurrentUser();

  const createEncontroMutation = useCreateEncontro();
  const updateEncontroMutation = useUpdateEncontro();
  const deleteEncontroMutation = useDeleteEncontro();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isViewing = mode === "view";
  const isEditing = mode === "edit";

  // Matéria padrão quando modo for "create"
  const defaultMateria =
    initialMode === "create" ? usuario?.materia : undefined;

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: getMeetingFormValues(encontro, defaultMateria),
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    setIsCalendarOpen(false);
    setIsDeleteConfirmationOpen(false);

    if (nextOpen) {
      setMode(initialMode);
      setImageFile(null);
      setCreatedEncontroId(null);
      uploadImageMutation.reset();
      reset(getMeetingFormValues(encontro, defaultMateria));
    }
  }

  async function handleSave(values: MeetingFormValues) {
    if (isSubmitting) return; // ignora cliques repetidos

    setIsSubmitting(true);

    try {
      const payload = toEncontroRequest(values);

      if (isEditing && encontro) {
        await updateEncontroMutation.mutateAsync({
          id: encontro.id,
          data: payload,
        });

        if (imageFile) {
          try {
            await uploadImageMutation.mutateAsync({
              encontroId: Number(encontro.id),
              file: imageFile,
            });
            setImageFile(null);
          } catch (uploadError) {
            console.error("Erro ao enviar imagem:", uploadError);
            toast.add({
              title: "Dados salvos, mas a imagem não foi enviada",
              description:
                "Clique em Salvar para tentar enviar a imagem novamente.",
              type: "warning",
            });
            return;
          }
        }

        setMode("view");
        return;
      }

      let encontroId = createdEncontroId;

      if (encontroId === null) {
        const encontroCriado =
          await createEncontroMutation.mutateAsync(payload);
        encontroId = Number(encontroCriado.id);
        setCreatedEncontroId(encontroId);
      }

      if (imageFile) {
        try {
          await uploadImageMutation.mutateAsync({
            encontroId,
            file: imageFile,
          });
        } catch (uploadError) {
          console.error("Erro ao enviar imagem:", uploadError);
          toast.add({
            title: "Monitoria criada, mas a imagem não foi enviada",
            description:
              "Clique em Salvar para tentar enviar a imagem novamente.",
            type: "warning",
          });
          return;
        }
      }

      toast.add({
        title: "Monitoria criada",
        description: imageFile
          ? "A monitoria e a imagem foram salvas."
          : "A monitoria foi salva.",
        type: "success",
      });
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar monitoria:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!encontro) return;

    try {
      await deleteEncontroMutation.mutateAsync(encontro.id);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao apagar monitoria:", error);
    }
  }

  function handleCancelEdit() {
    setImageFile(null);
    reset(getMeetingFormValues(encontro));
    setMode("view");
  }

  const isSaving =
    isSubmitting ||
    createEncontroMutation.isPending ||
    updateEncontroMutation.isPending ||
    uploadImageMutation.isPending;
  const hasSaveError =
    createEncontroMutation.isError || updateEncontroMutation.isError;

  const dialogContent = DIALOG_CONTENT[mode];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={children as React.ReactElement} />

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(handleSave)}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-2 pr-8">
              <div>
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogDescription>
                  {dialogContent.description}
                </DialogDescription>
              </div>

              {isViewing && (
                <div className="-mt-2 flex shrink-0 gap-1">
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Editar monitoria"
                    onClick={() => setMode("edit")}
                  >
                    <PencilIcon className="size-4" />
                  </Button>

                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Apagar monitoria"
                    onClick={() => setIsDeleteConfirmationOpen(true)}
                  >
                    <Trash2Icon className="size-4 text-destructive" />
                  </Button>
                </div>
              )}
            </div>
          </DialogHeader>

          <MeetingFormFields
            control={control}
            register={register}
            errors={errors}
            disabled={isViewing}
            isCalendarOpen={isCalendarOpen}
            onCalendarOpenChange={setIsCalendarOpen}
            imageSlot={
              <>
                {initialMode === "create" && (
                  <MeetingImageField
                    file={imageFile}
                    onFileChange={setImageFile}
                  />
                )}

                {isViewing && encontro && (
                  <Field>
                    <FieldLabel>Imagem</FieldLabel>
                    <MeetingImageView encontroId={Number(encontro.id)} />
                  </Field>
                )}

                {isEditing && encontro && (
                  <Field>
                    <FieldLabel>Imagem</FieldLabel>
                    <MeetingImageEdit
                      encontroId={Number(encontro.id)}
                      file={imageFile}
                      onFileChange={setImageFile}
                    />
                  </Field>
                )}
              </>
            }
          />

          <MutationErrorMessage
            show={hasSaveError}
            message="Não foi possível salvar a monitoria. Tente novamente."
          />

          <MutationErrorMessage
            show={deleteEncontroMutation.isError}
            message="Não foi possível apagar a monitoria. Tente novamente."
          />

          {isDeleteConfirmationOpen ? (
            <DialogFooter className="flex-row items-center gap-2">
              <p className="mr-auto text-sm text-muted-foreground">
                Apagar esta monitoria?
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteConfirmationOpen(false)}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="destructive"
                disabled={deleteEncontroMutation.isPending}
                onClick={handleDelete}
              >
                {deleteEncontroMutation.isPending ? "Apagando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          ) : (
            <DialogFooter className="flex-row">
              <DialogClose render={<Button type="button" variant="outline" />}>
                {isViewing ? "Fechar" : "Cancelar"}
              </DialogClose>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancelar edição
                </Button>
              )}

              {!isViewing && (
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Salvando..." : "Salvar"}
                </Button>
              )}
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
