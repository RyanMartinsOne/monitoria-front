import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao painel de controle!
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Próximas Reuniões</h2>
        <Button variant="link" className="text-blue-500 hover:underline">
          <Link to="/meetings">Ir para Encontros</Link>
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
