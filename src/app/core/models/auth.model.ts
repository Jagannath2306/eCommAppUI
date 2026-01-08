export interface LoginResponse {
  success: boolean;
  data: string;
  message:string
  userId?: string; // optional
  email?: string; // optional
  expiresIn?: number; // optional
}
