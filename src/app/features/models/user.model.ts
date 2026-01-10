export interface UserList {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  createdOn: string;
  updatedBy: string;
}

export interface UsersResponse {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}
