import { useMutation } from "@tanstack/react-query";
import { loginRequest, registerRequest } from "@/services/auth";

export function useRegister() {
  return useMutation({
    mutationFn: registerRequest,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    }
  });
}
