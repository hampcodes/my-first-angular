export interface User {
  id: number;
  userName: string;
  age: number;
  email: string;
  isActive: boolean;
  role?: string; // Opcional
}
