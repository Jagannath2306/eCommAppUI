export interface CategoryResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface CategoryList {
  _id: string;
  name: string;
  title: string;
  imagePath: string;
  isActive: boolean;
  slug: string;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export interface Category {
  name: string;
  title: string;
  imagePath: string;
  isActive: boolean;
  slug: string;
}
export interface CategoryInfo {
  _id: string;
  name: string;
  title: string;
  imagePath: string;
  isActive: boolean;
  slug: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdOn: string;
  updatedOn: string;
}
