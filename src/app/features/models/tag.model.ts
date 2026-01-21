export interface TagResponse {
  success: boolean;
  data: [];
  message: string;
}

export interface TagList {
  _id: string;
  name: string;
  isActive: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export interface Tag {
  name: string;
  isActive: boolean;
}
export interface TagInfo {
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
