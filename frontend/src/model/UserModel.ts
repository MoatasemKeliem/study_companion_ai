export interface RegisterUser {
    name: string,
    email: string,
    password: string,
    role: "USER" | "ADMIN";
}

export interface User {
    id: number,
    name: string,
    email: string,
    role: "USER" | "ADMIN";
}

export interface UserUpdate {
    role: "USER" | "ADMIN";
}