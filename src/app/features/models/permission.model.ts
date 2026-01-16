export interface ModuleList {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}
export interface SubModuleList {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}
export interface PageList {
  success: boolean;
  data: [];
  message: string;
  meta?: {};
}
export interface PermissionList {
  success: boolean;
  data?: [];
  message: string;
  meta?: {};
}

export interface Modules {
  _id: string;
  name: string;
}
export interface SubModules {
  _id: string;
  name: string;
}
export interface Pages {
  _id: string;
  name: string;
  pageCode:string,
  actions:object
}

export interface ActionPermissions {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  reject: boolean;
  block: boolean;
  unblock: boolean;
}

export interface PagePermission {
  pageId: string;
  name: string;
  pageCode: string;
  actions: ActionPermissions;
}