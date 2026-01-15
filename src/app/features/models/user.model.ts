export interface UserList {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  createdOn: string;
  createdBy: string;
}

export interface UsersResponse {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}
export interface UserTypesResponse {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}
export interface UserTypeList {
  _id: string;
  name: string;
}

export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdOn: string;
  updatedOn: string;
  createdBy: {
    _id:string,
    firstName:string,
    lastName:string,
    email:string
  };
  userTypeId:{
    _id:string,
    name:string
  }
}
export interface UserInfoResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: {};
}

export interface UserDeleteResponse {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}