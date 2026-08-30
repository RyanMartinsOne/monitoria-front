import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { StatusEncontro } from "@/types/encontro";
import { STATUS_OPTIONS } from "@/types/badge";

interface StatusBadgeDropdownProps {
  status: StatusEncontro;
  onStatusChange: (novoStatus: StatusEncontro) => void;
  disabled?: boolean;
}

const statusInfo = STATUS_OPTIONS;

export function StatusBadgeDropdown({
  status,
  onStatusChange,
  disabled,
}: StatusBadgeDropdownProps) {
  const current = statusInfo.find((opt) => opt.value === status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} className="cursor-pointer">
        <Badge variant={current?.badgeVariant} className="hover:opacity-80">
          {current?.label}
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {STATUS_OPTIONS.filter(
          (option) => option.value !== status && option.value !== "TODAS",
        ).map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onStatusChange(option.value)}
          >
            <option.icon className={option.style} />

            {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
