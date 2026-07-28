import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface LoginRequest {
  name: string;
  password: string;
}

const loginSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100, "O nome não pode ter mais de 100 caracteres."),

  password: z
    .string()
    .min(4, "A senha deve ter pelo menos 4 caracteres.")
    .max(100, "A senha não pode ter mais de 100 caracteres."),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginData) {
    try {
      const payload: LoginRequest = {
        name: data.name,
        password: data.password,
      };
      reset();
      console.log(payload);
    } catch (error) {
      console.error("Erro ao enviar os dados de login: ", error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login na sua conta</CardTitle>

        <CardDescription>
          Digite seu nome e senha para acessar sua conta.
        </CardDescription>

        <CardAction>
          <Link to="/register">
            <Button variant="link" className="underline">
              Não tenho conta
            </Button>
          </Link>
        </CardAction>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>

              <Input className="text-sm" id="name" placeholder="Seu nome" {...register("name")} />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>

              <Input
                className="text-sm"
                id="password"
                type="password"
                placeholder="Sua senha"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-4">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
