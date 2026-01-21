export interface SizeResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface SizeList {
  _id: string;
  name: string;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export interface Size {
  name: string;
  isActive: boolean;
}
export interface SizeInfo {
  name: string;
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
