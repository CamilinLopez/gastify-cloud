import { Routes } from '@/types/menu';

export const RoutesMenu: Routes[] = [
  {
    name: 'Inicio',
    path: '/dashboard/inicio',
    subMenu: [
      {
        name: 'Resumen de Inventario',
        path: '/#resumen_inventario',
      },
      {
        name: 'Resumen de Ventas',
        path: '/#resumen_ventas',
      },
      {
        name: 'Actividades Recientes',
        path: '/#actividades_recientes',
      },
      {
        name: 'Rendimiento de conductores',
        path: '/#rendimiento_conductores',
      },
    ],
  },
  {
    name: 'Inventario',
    path: '/dashboard/inventario',
    subMenu: [
      {
        name: 'Inventario de Bodega',
        path: '/#inventario_bodega',
      },
      {
        name: 'Inventario En Camiones',
        path: '/#inventario_camiones',
      },
    ],
  },
  {
    name: 'Operaciones diarias',
    path: '/dashboard/operaciones_diarias',
    subMenu: [
      {
        name: 'Tabla de Carga',
        path: '/#tabla_carga',
      },
      {
        name: 'Tabla de Descarga',
        path: '/#tabla_descarga',
      },
    ],
  },
  {
    name: 'Reportes',
    path: '/dashboard/reportes',
    subMenu: [
      {
        name: 'Filtro de Reportes Diarios',
        path: '/#filtro_reportes_diarios',
      },
      {
        name: 'Resumen de Reportes Diarios',
        path: '/#resumen_reportes_diarios',
      },
    ],
  },
  {
    name: 'Abastecimiento',
    path: '/dashboard/abastecimiento',
    subMenu: [
      {
        name: 'Registro de abastecimiento',
        path: '/#registro_abastecimiento',
      },
      {
        name: 'Alertas de stock',
        path: '/#alertas_stock',
      },
    ],
  },
  {
    name: 'Usuarios y permisos',
    path: '/dashboard/usuarion_permisos',
    subMenu: [
      {
        name: 'Invitar usuarios',
        path: '/#invitar_usuarios',
      },
      {
        name: 'Gestión de usuarios',
        path: '/#gestion_usuarios',
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
