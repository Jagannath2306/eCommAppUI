export interface ProductResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface ProductList {
  _id: string;
  name: string;
  code: string;
  title: string;
  price: number;
  salePrice: number;
  shortDetails: string;
  description: string;
  quantity: number;
  discount: number;
  isNewItem: boolean;
  isSale: boolean;
  categoryId: string;
  tagId: string;
  colorId: string;
  sizeId: string;
  imagePaths: string[];
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}
export interface ProductDeleteResponse {
  success: boolean;
  data?: [];
  message: string;
}

export interface CategoryResponse {
  success: boolean;
  data: [];
  message: string;
}
export interface TagsResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface Product {
  name: string;
  code: string;
  title: string;
  price: number;
  salePrice: number;
  shortDetails: string;
  description: string;
  categoryIds: string[];
  tagIds: string[];
  imagePaths: string[];
}
export interface ProductInfo {
  _id: string;
  name: string;
  code: string;
  title: string;
  price: number;
  salePrice: number;
  shortDetails: string;
  description: string;
  categoryIds: string[];
  tagIds: string[];
  imagePaths: string[];
  discount: number;
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
