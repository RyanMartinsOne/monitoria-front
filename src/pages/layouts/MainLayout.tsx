import { Link, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Toaster } from "@/components/ui/toast";
import { useCurrentUser } from "@/hooks/useUsuarios";

export default function App() {
  const { data: usuario } = useCurrentUser();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />
      <header className="p-4 flex justify-between items-center bg-header">
        <NavigationMenu className="text-white">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link
                to="/"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Início
              </Link>
            </NavigationMenuItem>
            
            {usuario?.tipo === "COORDENADOR" && (
            <NavigationMenuItem>
              <Link
                to="/dashboard"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Dashboard
              </Link>
            </NavigationMenuItem>
            )}

            {usuario?.tipo === "COORDENADOR" && (
            <NavigationMenuItem>
              <Link
                to="/statistics"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Estatísticas
              </Link>
            </NavigationMenuItem>
            )}

            <NavigationMenuItem>
              <Link
                to="/meetings"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Encontros
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="flex flex-1 bg-main">
        <Outlet />
      </main>
    </div>
  );
}
