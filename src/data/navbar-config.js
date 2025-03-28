import {
  BarChart,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  CheckSquare,
  Globe,
  ShoppingCart,
  Users,
  Settings,
  
} from "lucide-react"

export const menuItems = [
  { title: "Tareas", to: "/tareas" },
  { title: "Clientes", to: "/clientes" },
  { title: "Órdenes", to: "/ordenes" },
]

export const dropdownMenus = [
  {
    title: "Reportes",
    items: [
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        description: "Consulta las ventas individuales de cada agente.",
        icon: BarChart,
      },
      {
        title: "Registros",
        to: "/reportes/registros",
        description: "Lista detallada de registros generados.",
        icon: FileText,
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        description: "Reporte de ventas totales por mes.",
        icon: ShoppingCart,
      },
      {
        title: "Auditoría de registros",
        to: "/reportes/auditoria-registros",
        description: "Revisión y validación de registros previos.",
        icon: ShieldCheck,
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        description: "Seguimiento de tareas y órdenes finalizadas.",
        icon: CheckSquare,
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        description: "Resumen total de todas las ventas.",
        icon: Globe,
      },
      {
        title: "Ventas por Canal",
        to: "/reportes/ventas-por-canal",
        description: "Reporte de ventas divididas por canal de venta.",
        icon: BarChart,
      },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-por-agente",
        description: "Registro de cortes y cierres de ventas por agente.",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Ajustes",
    items: [
      {
        title: "Ajustes de sistema",
        to: "/ajustes/sistema",
        description: "Configuraciones generales del sistema.",
        icon: Settings,
      },
      {
        title: "Usuario",
        to: "/ajustes/usuario",
        description: "Gestión y configuración de perfiles de usuario.",
        icon: Users,
      },
      {
        title: "Cuentas",
        to: "/ajustes/cuentas",
        description: "Administración de cuentas y permisos.",
        icon: FileText,
      },
      {
        title: "Vacantes",
        to: "/ajustes/vacantes",
        description: "Gestión y publicación de nuevas vacantes.",
        icon: ClipboardCheck,
      },
    ],
  },
]
