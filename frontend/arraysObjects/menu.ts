import { Routes } from '@/types/menu';

export const RoutesMenu: Routes[] = [
  {
    name: 'Inicio',
    path: '/dashboard/inicio',
  },
  {
    name: 'Inventario',
    path: '/dashboard/inventario',
    subMenu: [
      {
        name: 'Inventario de Bodega',
        path: '/dashboard/inventario/inventario_bodega',
      },
      {
        name: 'Inventario En Camiones',
        path: '/dashboard/inventario/inventario_camiones',
      },
      {
        name: 'Registro de camiones',
        path: '/dashboard/inventario/registro_camiones',
      },
      {
        name: 'Registro de conductores',
        path: '/dashboard/inventario/registro_conductores',
      },
    ],
  },
  {
    name: 'Operaciones diarias',
    path: '/dashboard/operaciones_diarias',
  },
  {
    name: 'Reportes',
    path: '/dashboard/reportes',
  },
  {
    name: 'Abastecimiento',
    path: '/dashboard/abastecimiento',
  },
  {
    name: 'Usuarios y permisos',
    path: '/dashboard/usuarios_permisos',
    subMenu: [
      {
        name: 'Invitar usuarios',
        path: '/dashboard/usuarios_permisos/invitar_usuarios',
      },
      {
        name: 'Gestión de usuarios',
        path: '/dashboard/usuarios_permisos/gestion_usuarios',
      },
      {
        name: 'Configuracion de usuarios',
        path: '/dashboard/usuarios_permisos/configuracion_usuarios',
      },
    ],
  },
];
// {
//   name: 'Historial y auditoria',
//   path: '/dashboard/historial_auditoria',
// },
// {
//   name: 'Observaciones',
//   path: '/dashboard/observaciones',
// },
