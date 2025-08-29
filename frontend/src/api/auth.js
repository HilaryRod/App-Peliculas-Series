import { api } from "../services/api";

// Endpoints auth
export const registerRequest = (user) => api.post("/register", user);
export const loginRequest = (user) => api.post("/login", user);
//export const logoutRequest = () => api.post("/logout");
export const profileRequest = () => api.get("/profile");
