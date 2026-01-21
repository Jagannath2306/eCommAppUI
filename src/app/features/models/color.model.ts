export interface ColorResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface ColorList {
  _id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export interface Color {
  name: string;
  code: string;
  isActive: boolean;
}
export interface ColorInfo {
  name: string;
  code: string;
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
