// import React from "react"
// import { Link } from "react-router-dom"
// import { cn } from "@/lib/utils"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"

// const menuItems = [
//   { title: "Tareas", to: "/tareas" },
//   { title: "Clientes", to: "/clientes" },
//   { title: "Órdenes", to: "/ordenes" },
// ]

// const dropdownMenus = [
//   {
//     title: "Reportes",
//     items: [
//       {
//         title: "Ventas por agente",
//         to: "/reportes/ventas-por-agente",
//         description: "Consulta las ventas individuales de cada agente.",
//       },
//       {
//         title: "Registros",
//         to: "/reportes/registros",
//         description: "Lista detallada de registros generados.",
//       },
//       {
//         title: "Ventas mensuales",
//         to: "/reportes/ventas-mensuales",
//         description: "Reporte de ventas totales por mes.",
//       },
//       {
//         title: "Auditoría de registros",
//         to: "/reportes/auditoria-registros",
//         description: "Revisión y validación de registros previos.",
//       },
//       {
//         title: "Control de finalizados",
//         to: "/reportes/control-finalizados",
//         description: "Seguimiento de tareas y órdenes finalizadas.",
//       },
//       {
//         title: "Ventas globales",
//         to: "/reportes/ventas-globales",
//         description: "Resumen total de todas las ventas.",
//       },
//       {
//         title: "Ventas por Canal",
//         to: "/reportes/ventas-por-canal",
//         description: "Reporte de ventas divididas por canal de venta.",
//       },
//       {
//         title: "Cortes por Agente",
//         to: "/reportes/cortes-por-agente",
//         description: "Registro de cortes y cierres de ventas por agente.",
//       },
//     ],
//   },
//   {
//     title: "Ajustes",
//     items: [
//       {
//         title: "Ajustes de sistema",
//         to: "/ajustes/sistema",
//         description: "Configuraciones generales del sistema.",
//       },
//       {
//         title: "Usuario",
//         to: "/ajustes/usuario",
//         description: "Gestión y configuración de perfiles de usuario.",
//       },
//       {
//         title: "Cuentas",
//         to: "/ajustes/cuentas",
//         description: "Administración de cuentas y permisos.",
//       },
//       {
//         title: "Vacantes",
//         to: "/ajustes/vacantes",
//         description: "Gestión y publicación de nuevas vacantes.",
//       },
//     ],
//   },
// ]

// export function NavigationMenuDemo() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         {/* Plain Menu Items */}
//         {menuItems.map((item) => (
//           <NavigationMenuItem key={item.title}>
//             <Link to={item.to} className={navigationMenuTriggerStyle()}>
//               {item.title}
//             </Link>
//           </NavigationMenuItem>
//         ))}

//         {/* Dropdown Menus */}
//         {dropdownMenus.map((menu) => (
//           <NavigationMenuItem key={menu.title}>
//             <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="grid w-[250px] gap-3 p-4 md:w-[300px] md:grid-cols-1">
//                 {menu.items.map((subItem) => (
//                   <ListItem
//                     key={subItem.title}
//                     title={subItem.title}
//                     to={subItem.to}
//                     description={subItem.description}
//                   />
//                 ))}
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// const ListItem = React.forwardRef(
//   ({ className, title, to, description, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <Link
//             ref={ref}
//             to={to}
//             className={cn(
//               "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="text-xs text-muted-foreground">{description}</p>
//           </Link>
//         </NavigationMenuLink>
//       </li>
//     )
//   }
// )
// ListItem.displayName = "ListItem"
