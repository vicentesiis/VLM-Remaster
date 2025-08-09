# 🔧 Tech Stack Documentation

## 📊 Overview

VLM Project is built with modern web technologies focused on performance, maintainability, and developer experience.

## 🎯 Core Technologies

### **Frontend Framework**
- **React 18.3.1** - Modern React with concurrent features
- **Vite 6.3.5** - Fast build tool and dev server
- **JavaScript/JSX** - Primary development language

### **Routing & Navigation**
- **React Router DOM 7.4.0** - Client-side routing
- **Protected Routes** - Role-based access control

### **State Management**
- **Zustand 5.0.6** - Lightweight state management
- **TanStack Query 5.71.5** - Server state management
- **React Context** - Authentication and theme state

### **UI & Styling**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React 0.483.0** - Icon library
- **next-themes 0.4.6** - Dark/light theme support

## 🧩 Component Architecture

### **Design System**
```
📁 src/components/
├── 📁 ui/ (Base components)
│   ├── button.jsx
│   ├── input.jsx
│   ├── card.jsx
│   └── ...
├── 📁 customs/ (Business components)
│   ├── forms/
│   ├── dialogs/
│   ├── tables/
│   └── ...
└── 📁 admin-panel/ (Layout components)
    ├── sidebar.jsx
    ├── navbar.jsx
    └── ...
```

### **Component Libraries**
- **@radix-ui/react-*** - Accessible primitives
- **@tanstack/react-table 8.21.3** - Table management
- **recharts 2.15.1** - Chart components
- **react-day-picker 9.8.0** - Date picker

## 📡 Data Management

### **HTTP Client**
- **Axios 1.9.0** - HTTP requests
- **Custom API Client** - Centralized API management
- **Interceptors** - Request/response handling

### **Query Management**
- **TanStack Query** - Caching, synchronization
- **Custom Hooks** - Business logic encapsulation
- **Optimistic Updates** - Better UX

### **Form Management**
- **React Hook Form 7.54.2** - Form state management
- **Zod 3.24.2** - Schema validation
- **@hookform/resolvers 4.1.3** - Validation integration

## 🎨 Styling Architecture

### **CSS Framework**
```css
/* Tailwind CSS Configuration */
- Utility-first approach
- Custom design tokens
- Responsive design
- Dark mode support
```

### **Component Styling**
- **CSS-in-JS** with Tailwind classes
- **Variant-based styling** with class-variance-authority
- **Consistent spacing** and typography
- **Accessible color schemes**

## 🔧 Development Tools

### **Build & Development**
- **Vite** - Fast HMR and building
- **ESLint 9.23.0** - Code linting
- **Prettier 3.5.3** - Code formatting
- **PostCSS 8.5.3** - CSS processing

### **Code Quality**
```json
{
  "eslint": "Code linting and standards",
  "prettier": "Code formatting",
  "typescript-eslint": "TypeScript support",
  "eslint-plugin-react": "React-specific rules"
}
```

## 📦 Package Management

### **Dependencies Strategy**
- **Minimal dependencies** - Only what's needed
- **Regular updates** - Security and features
- **Peer dependencies** - Avoid conflicts
- **Bundle analysis** - Optimize size

### **Key Dependencies**
```json
{
  "react": "^18.3.1",
  "@tanstack/react-query": "^5.71.5",
  "tailwindcss": "^3.4.17",
  "axios": "^1.9.0",
  "react-hook-form": "^7.54.2",
  "zod": "^3.24.2"
}
```

## 🏗️ Architecture Patterns

### **Component Patterns**
- **Composition over Inheritance**
- **Render Props** for flexibility
- **Custom Hooks** for logic reuse
- **Provider Pattern** for context

### **Data Flow**
```
UI Components → Custom Hooks → API Services → Backend
     ↓              ↓              ↓
State Updates ← Query Cache ← HTTP Response
```

### **Error Handling**
- **Error Boundaries** for component errors
- **Query Error States** for API errors
- **Form Validation** for user input
- **Toast Notifications** for user feedback

## 🚀 Performance Optimizations

### **React Optimizations**
- **React.memo** for expensive components
- **useMemo/useCallback** for computations
- **Code Splitting** with React.lazy
- **Suspense** for loading states

### **Bundle Optimizations**
- **Tree Shaking** - Remove unused code
- **Dynamic Imports** - Load on demand
- **Asset Optimization** - Images and fonts
- **Caching Strategies** - Browser and CDN

## 🔒 Security Considerations

### **Authentication**
- **JWT Tokens** - Secure authentication
- **Token Refresh** - Automatic renewal
- **Role-based Access** - Permission control
- **Secure Storage** - localStorage with encryption

### **Data Protection**
- **Input Validation** - Client and server
- **XSS Prevention** - Sanitized outputs
- **CSRF Protection** - Token validation
- **HTTPS Only** - Secure communication

## 📱 Browser Support

### **Target Browsers**
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### **Progressive Enhancement**
- **Core functionality** works everywhere
- **Enhanced features** for modern browsers
- **Graceful degradation** for older browsers

## 🔗 Related Documentation

- [📊 Project Overview](./project-overview.md)
- [📁 Folder Structure](./folder-structure.md)
- [🎨 Design Patterns](./design-patterns.md)
- [💻 Development Guide](../development/coding-standards.md)