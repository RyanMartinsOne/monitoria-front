import {
  CheckCircle2Icon,
  CircleXIcon,
  Clock3Icon,
  GalleryVerticalEnd,
  type LucideIcon,
} from "lucide-react";
import type { StatusEncontro } from "./encontro";

export const STATUS_OPTIONS: {
  value: StatusEncontro;
  label: string;
  badgeVariant: "secondary" | "default" | "outline" | "destructive";
  icon: LucideIcon;
  style: string;
}[] = [
  {
    value: "TODAS",
    label: "Todas",
    badgeVariant: "secondary",
    icon: GalleryVerticalEnd,
    style: "text-gray-700"
  },
  {
    value: "AGENDADO",
    label: "Agendado",
    badgeVariant: "default",
    icon: Clock3Icon,
    style: "text-blue-500",
  },
  {
    value: "CONCLUIDO",
    label: "Concluído",
    badgeVariant: "outline",
    icon: CheckCircle2Icon,
    style: "text-green-500",
  },
  {
    value: "CANCELADO",
    label: "Cancelado",
    badgeVariant: "destructive",
    icon: CircleXIcon,
    style: "text-red-700",
  },
];
