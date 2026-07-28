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
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Materia = [
  { value: "MATEMATICA", label: "Matemática" },
  { value: "PORTUGUES", label: "Português" },
  { value: "INGLES", label: "Inglês" },
  { value: "ESPANHOL", label: "Espanhol" },
  { value: "FISICA", label: "Física" },
  { value: "QUIMICA", label: "Química" },
  { value: "BIOLOGIA", label: "Biologia" },
  { value: "HISTORIA", label: "História" },
  { value: "GEOGRAFIA", label: "Geografia" },
  { value: "FILOSOFIA", label: "Filosofia" },
  { value: "SOCIOLOGIA", label: "Sociologia" },
  { value: "ARTES", label: "Artes" },
] as const;

const MateriaEnum = z.enum(Materia.map((item) => item.value));

interface RegisterRequest {
  name: string;
  materia: (typeof Materia)[number]["value"];
  password: string;
}

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres.")
      .max(100, "O nome não pode ter mais de 100 caracteres."),

    materia: MateriaEnum.optional().refine((value) => value !== undefined, {
      message: "A matéria é obrigatória.",
    }),

    password: z
      .string()
      .min(4, "A senha deve ter pelo menos 4 caracteres.")
      .max(100, "A senha não pode ter mais de 100 caracteres."),

    confirmPassword: z
      .string()
      .min(4, "A confirmação de senha deve ter pelo menos 4 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof RegisterSchema>;

export default function Register() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  function onSubmit(data: RegisterData) {
    try {
      const payload: RegisterRequest = {
        name: data.name,
        materia: data.materia as (typeof Materia)[number]["value"],
        password: data.password,
      };
      reset();
      console.log(payload);
    } catch (error) {
      console.error("Erro ao enviar os dados de registro: ", error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Registre sua conta</CardTitle>

        <CardDescription>
          Preencha os dados abaixo para criar sua conta.
        </CardDescription>

        <CardAction>
          <Link to="/login">
            <Button variant="link" className="underline">
              Já tenho conta
            </Button>
          </Link>
        </CardAction>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>

              <Input
                id="name"
                placeholder="Seu nome"
                className="text-sm"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="materia">Matéria</Label>

              <Controller
                name="materia"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {Materia.find((item) => item.value === field.value)
                          ?.label ?? "Selecione uma matéria"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Matérias</SelectLabel>

                        {Materia.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.materia && (
                <p className="text-sm text-destructive">
                  {errors.materia.message}
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

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>

              <Input
                className="text-sm"
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-4">
          <Button type="submit" className="w-full">
            Registre-se
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
