export interface VariantResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface VariantList {
  _id: string;
  name: string;
  code: string;
  color: string;
  description: string;
  isCustomerVisible: boolean;
  isSellable: boolean;
  sortOrder: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export interface Variant {
  name: string;
  code: string;
  isActive: boolean;
}
export interface VariantInfo {
   name: string;
  code: string;
  color: string;
  description: string;
  isCustomerVisible: boolean;
  isSellable: boolean;
  sortOrder: number;
  isActive: boolean;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdOn: string;
  updatedOn: string;
}
