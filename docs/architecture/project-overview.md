# VLM Project - Sistema de Gestión de Registros y Ventas

## 📋 Descripción General

VLM Project es una aplicación web desarrollada en React que funciona como un sistema de gestión integral para registros, ventas, usuarios y reportes. La aplicación está diseñada con un sistema de roles jerárquico que permite diferentes niveles de acceso y funcionalidades según el tipo de usuario.

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: React 18.3.1 con Vite
- **Routing**: React Router DOM v7.4.0
- **Estado Global**: Zustand v5.0.6
- **Consultas de Datos**: TanStack Query v5.71.5
- **Formularios**: React Hook Form v7.54.2 + Zod v3.24.2
- **UI Components**: Radix UI + Tailwind CSS
- **HTTP Client**: Axios v1.9.0
- **Gráficos**: Recharts v2.15.1
- **Notificaciones**: Sonner v2.0.5

### Estructura del Proyecto
```
src/
├── api/                    # Servicios de API
├── components/             # Componentes reutilizables
│   ├── admin-panel/       # Layout de administración
│   ├── customs/           # Componentes personalizados
│   ├── data-table/        # Componentes de tablas
│   ├── providers/         # Providers de contexto
│   └── ui/                # Componentes base de UI
├── config/                # Configuraciones
├── constants/             # Constantes de la aplicación
├── context/               # Contextos de React
├── data/                  # Configuraciones de datos
├── forms/                 # Configuraciones de formularios
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilidades y helpers
├── pages/                 # Páginas de la aplicación
├── routes/                # Configuración de rutas
├── services/              # Servicios de negocio
├── styles/                # Estilos personalizados
└── utils/                 # Funciones utilitarias
```

## 👥 Sistema de Roles

La aplicación maneja 4 tipos de roles con diferentes niveles de acceso:

### 1. **SUPER_ADMIN**
- Acceso completo a todas las funcionalidades
- Puede gestionar todos los registros
- Puede crear órdenes
- Puede eliminar usuarios
- Acceso a todos los reportes incluyendo "Ventas Globales"

### 2. **ADMIN**
- Puede gestionar registros
- No puede crear órdenes ni eliminar usuarios
- Acceso a la mayoría de reportes
- Gestión de usuarios y configuraciones

### 3. **LEADER**
- Acceso a registros limitado (sus equipos)
- Acceso a reportes específicos
- Gestión de su equipo

### 4. **AGENT**
- Acceso limitado a sus propios registros
- Puede ver sus ventas y reportes personales
- Gestión de leads, prospectos y clientes asignados

## 🔄 Estados de Registros

El sistema maneja un flujo complejo de estados para los registros:

1. **CREATED** → Creado
2. **ASSIGNED** → Asignado
3. **PENDING_INFO** → Pendiente de información
4. **GENERATE_JOBS** → Generar trabajos
5. **JOBS_GENERATED** → Trabajos generados
6. **REGENERATE_JOBS** → Regenerar trabajos
7. **GENERATE_CONTRACT** → Generar contrato
8. **CONTRACT_GENERATED** → Contrato generado
9. **FIX_CONTRACT** → Corregir contrato
10. **PENDING_APPROVAL** → Pendiente de aprobación
11. **APPROVED** → Aprobado
12. **SELECTING_LEAVE_DATE** → Seleccionando fecha de salida
13. **LEAVE_DATE_SELECTED** → Fecha de salida seleccionada
14. **LEAVE_DATE_CONFIRMED** → Fecha de salida confirmada
15. **FINALIZED** → Finalizado
16. **INACTIVE** → Inactivo

## 📊 Módulos Principales

### 1. **Registros**
- Gestión de leads, prospectos y clientes
- Seguimiento del estado de cada registro
- Asignación de registros a agentes
- Historial de cambios y actualizaciones

### 2. **Ventas y Órdenes**
- Creación y gestión de órdenes
- Seguimiento de pagos
- Estados de pago: CREATED, PENDING, PAID, CANCELLED, FAILED, EXPIRED

### 3. **Usuarios**
- Gestión de usuarios por roles
- Asignación a grupos
- Control de permisos y accesos

### 4. **Reportes**
- **Ventas por Agente**: Análisis de rendimiento individual
- **Registros por Agente**: Seguimiento de actividad
- **Ventas Mensuales**: Análisis temporal
- **Ventas Potenciales**: Proyecciones
- **Ventas Activas por Cobrar**: Control de cuentas pendientes
- **Control de Finalizados**: Seguimiento de completados
- **Ventas Globales**: Vista general (solo SUPER_ADMIN)
- **Cortes por Agente**: Análisis de cortes

### 5. **Vacantes**
- Gestión de posiciones disponibles
- Seguimiento de candidatos
- Proceso de selección

### 6. **Ajustes**
- Configuración de cuentas
- Gestión de usuarios (admin)
- Configuraciones del sistema

## 🔌 API Endpoints

### Registros (`/records`)
- `GET /records/record` - Obtener registro por ID
- `GET /records/search` - Buscar registros
- `PUT /records/record` - Actualizar registro
- `GET /records/records` - Obtener registros por criterios
- `POST /records/record/lead` - Crear lead
- `POST /records/record/prospect` - Crear prospecto
- `PATCH /records/record/status` - Actualizar estado

### Usuarios (`/users`)
- `GET /users/me` - Usuario actual
- `GET /users/user/:id` - Usuario por ID
- `POST /users/user` - Crear usuario
- `PUT /users/user` - Actualizar usuario
- `GET /users/users` - Obtener usuarios por criterios

### Órdenes (`/orders`)
- `GET /orders/order/id` - Orden por ID
- `GET /orders/by-user` - Órdenes por usuario
- `GET /orders/by-record` - Órdenes por registro
- `POST /orders/order` - Crear orden

## 🎨 Componentes UI Destacados

### Tablas de Datos
- Componente `DataTable` con paginación, filtros y ordenamiento
- Soporte para filtros facetados y por fecha
- Skeleton loading states

### Formularios
- Integración con React Hook Form y Zod
- Validación en tiempo real
- Componentes de campo reutilizables

### Gráficos
- Componentes de gráficos de barras para ventas y registros
- Integración con Recharts

### Calendarios
- Componente de calendario personalizado
- Selector de rangos de fechas
- Integración con react-day-picker

## 🔐 Autenticación y Autorización

- Sistema de autenticación basado en tokens JWT
- Context API para manejo del estado de autenticación
- Rutas protegidas por roles
- Persistencia de sesión en localStorage

## 📱 Características de UX/UI

- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Dark/Light Theme**: Soporte para temas usando next-themes
- **Loading States**: Estados de carga en toda la aplicación
- **Error Handling**: Manejo robusto de errores
- **Notifications**: Sistema de notificaciones con Sonner
- **Accessibility**: Componentes accesibles con Radix UI

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting con ESLint
npm start        # Servir build de producción
```

## 📦 Dependencias Clave

- **@tanstack/react-query**: Gestión de estado del servidor
- **@radix-ui/***: Componentes UI primitivos
- **tailwindcss**: Framework CSS utilitario
- **react-hook-form**: Gestión de formularios
- **zod**: Validación de esquemas
- **axios**: Cliente HTTP
- **recharts**: Librería de gráficos
- **date-fns**: Manipulación de fechas

## 🔧 Configuración

- **Vite**: Configurado para desarrollo rápido
- **Tailwind CSS**: Configuración personalizada con animaciones
- **ESLint**: Configuración con reglas para React
- **Prettier**: Formateo de código automático
- **PostCSS**: Procesamiento de CSS

---

Este proyecto representa un sistema completo de gestión empresarial con enfoque en ventas, registros de clientes y reportes analíticos, diseñado para escalar y adaptarse a diferentes necesidades organizacionales.