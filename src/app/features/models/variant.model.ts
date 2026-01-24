export interface VariantResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface VariantList {
  _id: string;
  productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export interface Variant {
 productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  stock: number;
  isActive: boolean;
}
export interface VariantInfo {
  _id: string;
  productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  stock: number;
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
