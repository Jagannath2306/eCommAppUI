export interface MenuPage {
  id: string;
  name: string;
  url: string;
  icon: string;
  menuRank: number;
}

export interface SubModuleMenu {
  id: string;
  name: string;
  icon: string;
  menuRank: number;
  pages: MenuPage[];
}

export interface ModuleMenu {
  id: string;
  name: string;
  icon: string;
  menuRank: number;
  subModules: SubModuleMenu[];
}

export interface MenuList {
  success: boolean;
  data: [];
  message: string;
}
