export interface RegisterResponse {
  success: boolean;
  data: string;
  message:string
}
export interface LoginResponse {
  success: boolean;
  data: string;
  message:string
  userId?: string; // optional
  email?: string; // optional
  expiresIn?: number; // optional
}
export interface ForgotPasswordResponse {
  success: boolean;
  resetToken: string;
  message:string
}
export interface ResetPasswordResponse {
  success: boolean;
  message:string
}
export interface OtpResponse {
  success: boolean;
  message:string
}
