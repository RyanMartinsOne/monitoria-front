import { Link, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function App() {
  return (
    <div className="w-full flex flex-col">
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

            <NavigationMenuItem>
              <Link
                to="/login"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Login
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/meetings"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Encontros
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/dashboard"
                className={`${navigationMenuTriggerStyle()} text-white bg-transparent hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white`}
              >
                Dashboard
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="flex-1 bg-main">
        <Outlet />
      </main>
    </div>
  );
}
