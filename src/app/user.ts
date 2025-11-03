export interface User {
  id: number;
  userName: string;
  age: number;
  email: string;
  phone: string;
  isActive: boolean;
  role?: string;//?opcional
}
