import {
  BarChart,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  CheckSquare,
  Globe,
  ShoppingCart,
  Users,
} from "lucide-react"

export const menuItems = [
  // {
  //   title: "Registros",
  //   to: "/",
  //   allowedRoutes: ["super_admin", "admin", "agent"],
  // },
  // {
  //   title: "Clientes",
  //   to: "/clientes",
  //   allowedRoutes: ["super_admin", "admin", "agent"],
  // },
  {
    title: "Vacantes",
    to: "/vacantes",
    allowedRoutes: ["super_admin", "admin", "agent"],
  },
]

export const dropdownMenus = [
  {
    title: "Registros",
    allowedRoutes: ["super_admin", "admin", "agent"],
    items: [
      {
        title: "Registros",
        to: "/registros/registros",
        description: "Consulta y gestiona los registros generados.",
        icon: FileText,
        allowedRoutes: ["super_admin", "admin", "agent"],
      },
      {
        title: "Mis Registros",
        to: "/registros/mis-registros",
        description: "Consulta y gestiona tus registros generados.",
        icon: BarChart,
        allowedRoutes: ["super_admin", "admin", "agent"],
      },
      {
        title: "Clientes",
        to: "/registros/clientes",
        description: "Consulta y gestiona los clientes registrados.",
        icon: FileText,
        allowedRoutes: ["super_admin", "admin", "agent"],
      },
      {
        title: "Mis Clientes",
        to: "/registros/mis-clientes",
        description: "Consulta y gestiona tus clientes registrados.",
        icon: ShoppingCart,
        allowedRoutes: ["super_admin", "admin", "agent"],
      },
      {
        title: "Mis Tareas",
        to: "/registros/mis-tareas",
        description: "Consulta y gestiona tus tareas pendientes.",
        icon: ClipboardCheck,
        allowedRoutes: ["super_admin", "admin", "agent"],
      },
    ],
  },
  {
    title: "Reportes",
    allowedRoutes: ["super_admin", "admin", "agent"],
    items: [
      {
        title: "Reporte Personal",
        to: "/reportes/reporte-personal",
        description: "Consulta las ventas individuales de cada agente.",
        icon: BarChart,
        allowedRoutes: ["agent"],
      },
      {
        title: "Ventas por agente",
        to: "/reportes/ventas-por-agente",
        description: "Lista detallada de registros generados.",
        icon: BarChart,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Registros por agente",
        to: "/reportes/registros",
        description: "Lista detallada de registros generados.",
        icon: FileText,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Ventas mensuales",
        to: "/reportes/ventas-mensuales",
        description: "Reporte de ventas totales por mes.",
        icon: ShoppingCart,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Auditoría de registros",
        to: "/reportes/auditoria-registros",
        description: "Revisión y validación de registros previos.",
        icon: ShieldCheck,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Control de finalizados",
        to: "/reportes/control-finalizados",
        description: "Seguimiento de registros y órdenes finalizadas.",
        icon: CheckSquare,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Ventas globales",
        to: "/reportes/ventas-globales",
        description: "Resumen total de todas las ventas.",
        icon: Globe,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Ventas por Canal",
        to: "/reportes/ventas-canal",
        description: "Reporte de ventas divididas por canal de venta.",
        icon: BarChart,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Cortes por Agente",
        to: "/reportes/cortes-agente",
        description: "Registro de cortes y cierres de ventas por agente.",
        icon: ClipboardCheck,
        allowedRoutes: ["super_admin", "admin"],
      },
    ],
  },
  {
    title: "Ajustes",
    allowedRoutes: ["super_admin", "admin"],
    items: [
      {
        title: "Usuarios",
        to: "/ajustes/usuarios",
        description: "Gestión y configuración de perfiles de usuario.",
        icon: Users,
        allowedRoutes: ["super_admin", "admin"],
      },
      {
        title: "Cuentas",
        to: "/ajustes/cuentas",
        description: "Administración de cuentas y permisos.",
        icon: FileText,
        allowedRoutes: ["super_admin", "admin"],
      },
    ],
  },
  {
    title: "Info",
    allowedRoutes: ["agent"],
    items: [
      {
        title: "Datos del proyecto",
        to: "/info/datos-del-proyecto",
        description: "Información general sobre el proyecto.",
        icon: Globe,
        allowedRoutes: ["agent"],
      },
      {
        title: "Usuarios",
        to: "/info/usuarios",
        description: "Gestión y configuración de usuarios.",
        icon: Users,
        allowedRoutes: ["agent"],
      },
    ],
  },
]
