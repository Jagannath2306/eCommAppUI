export interface PaymentResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface PaymentList {
    _id: string;
}

export interface Payment {
  name: string;
  code: string;
  isActive: boolean;
}
export interface PaymentInfo {
    _id: string;
}
