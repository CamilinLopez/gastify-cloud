import { MouseEvent } from 'react';

export interface TypeRoutes {
  name: string;
  path: string;
}

export interface Routes {
  name: string;
  path: string;
  subMenu?: TypeRoutes[];
}

export interface CustomButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  // children: React.ReactNode;
  className?: string;
  name: string;
}
