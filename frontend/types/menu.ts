export interface TypeRoutes {
  name: string;
  path: string;
}

export interface Routes {
  name: string;
  path: string;
  subMenu?: TypeRoutes[];
}
