import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { STATUS_OPTIONS } from "@/types/badge";
import type { ViewMode } from "@/types/dashboard";
import { MATERIAS } from "@/types/materia";

type DashboardMenubarProps = {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
};

export default function DashboardMenubar({
  mode,
  onModeChange,
}: DashboardMenubarProps) {
  return (
    <Menubar className="w-fit">
      <MenubarMenu>
        <MenubarTrigger>Monitor</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem onClick={() => onModeChange({ type: "usuario" })}>
              Todos
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Por Matéria</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  {MATERIAS.map((item) => (
                    <MenubarCheckboxItem
                      key={item.value}
                      checked={
                        mode.type === "usuario" && mode.materia === item.value
                      }
                      onCheckedChange={(checked) =>
                        onModeChange({
                          type: "usuario",
                          materia: checked ? item.value : undefined,
                        })
                      }
                    >
                      {item.label}
                    </MenubarCheckboxItem>
                  ))}
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Monitoria</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem
              onClick={() => onModeChange({ type: "encontro", filter: {} })}
            >
              Todas
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Por Matéria</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  {MATERIAS.map((item) => (
                    <MenubarCheckboxItem
                      key={item.value}
                      checked={
                        mode.type === "encontro" &&
                        mode.filter.materia === item.value
                      }
                      onCheckedChange={(checked) => {
                        onModeChange({
                          type: "encontro",
                          filter: {
                            ...(mode.type === "encontro" ? mode.filter : {}),
                            materia: checked ? item.value : undefined,
                          },
                        });
                      }}
                    >
                      {item.label}
                    </MenubarCheckboxItem>
                  ))}
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Por Status</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  {STATUS_OPTIONS.filter(
                    (status) => status.value !== "TODAS",
                  ).map((status) => (
                    <MenubarCheckboxItem
                      key={status.value}
                      checked={
                        mode.type === "encontro" &&
                        mode.filter.status === status.value
                      }
                      onCheckedChange={(checked) => {
                        onModeChange({
                          type: "encontro",
                          filter: {
                            ...(mode.type === "encontro" ? mode.filter : {}),
                            status: checked ? status.value : undefined,
                          },
                        });
                      }}
                    >
                      <status.icon className="h-4 w-4" />
                      <span>{status.label}</span>
                    </MenubarCheckboxItem>
                  ))}
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Estatísticas</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
