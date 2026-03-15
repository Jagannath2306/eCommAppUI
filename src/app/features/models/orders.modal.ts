export interface OrderResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface OrderList {
  _id: string;
  billingAddress: string;
  customerId: string;
  invoiceNo: boolean;
  items: [];
  subTotalAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatusId: string;
  paymentStatusId: string;
  paymentTypeId: string;
  createdOn: string;
}

export interface Order {
  name: string;
  code: string;
  isActive: boolean;
}
export interface OrderInfo {
  _id: string;
  billingAddress: string;
  customerId: string;
  invoiceNo: boolean;
  items: [];
  subTotalAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatusId: string;
  paymentStatusId: string;
  paymentTypeId: string;
  createdOn: string;
}
