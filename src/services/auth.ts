import { api } from "../lib/api";
import type { LoginRequest, RegisterRequest } from "../types/auth";

export async function loginRequest(data: LoginRequest) {
    const response = await api.post("/auth/login", data);
    return response.data;
}

export async function registerRequest(data: RegisterRequest) {
    const response = await api.post("/auth/register", data);
    return response.data;
}