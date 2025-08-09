# 📁 Optimized Folder Structure Guide

## 📊 Overview

Modern React folder structure following Feature-Slice Design (FSD) principles, optimized for scalability, maintainability, and team collaboration.

## 🏗️ Root Structure

```
vlmproject/
├── 📁 public/                 # Static assets
│   ├── 📄 favicon.ico
│   ├── 📄 manifest.json
│   └── 📁 images/
├── 📁 src/                    # Source code
├── 📁 docs/                   # Documentation
├── 📁 tests/                  # Test utilities and setup
│   ├── 📄 setup.js
│   ├── 📄 test-utils.jsx
│   └── 📁 __mocks__/
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 tailwind.config.js
├── 📄 tsconfig.json          # TypeScript config
├── 📄 eslint.config.js
├── 📄 prettier.config.js     # Prettier config
└── 📄 README.md
```

## 📦 Optimized Source Structure (`src/`)

### **🎯 Feature-Slice Design Architecture**
```
📁 src/
├── 📁 app/                    # App configuration layer
├── 📁 pages/                  # Pages layer
├── 📁 widgets/                # Widgets layer  
├── 📁 features/               # Features layer
├── 📁 entities/               # Entities layer
└── 📁 shared/                 # Shared layer
```

### **📱 App Layer (`src/app/`)**
```
📁 src/app/
├── 📄 index.jsx               # App root component
├── 📄 app.jsx                 # App component
├── 📁 providers/              # App-level providers
│   ├── 📄 index.js
│   ├── 📄 query-provider.jsx  # TanStack Query
│   ├── 📄 theme-provider.jsx  # Theme management
│   └── 📄 auth-provider.jsx   # Authentication
├── 📁 router/                 # Routing configuration
│   ├── 📄 index.js
│   ├── 📄 router.jsx
│   ├── 📄 routes.jsx
│   └── 📄 guards.jsx          # Route guards
├── 📁 store/                  # Global state (if needed)
│   ├── 📄 index.js
│   └── 📄 auth-store.js
└── 📁 styles/                 # Global styles
    ├── 📄 globals.css
    ├── 📄 components.css      # Component base styles
    └── 📄 utilities.css       # Custom utilities
```

### **🌐 Pages Layer (`src/pages/`)**
```
📁 src/pages/
├── 📄 index.js                # All page exports
├── 📁 login/
│   ├── 📄 index.jsx           # LoginPage component
│   ├── 📄 login.lazy.jsx      # Lazy wrapper
│   └── 📄 __tests__/
├── 📁 usuarios/
│   ├── 📄 index.jsx           # UsersPage
│   ├── 📄 usuarios.lazy.jsx
│   ├── 📄 create.jsx          # UserCreatePage  
│   ├── 📄 [id].jsx            # UserDetailPage
│   └── 📄 __tests__/
├── 📁 registros/
│   ├── 📄 index.jsx           # RecordsPage
│   ├── 📄 registros.lazy.jsx
│   ├── 📄 create.jsx
│   ├── 📄 [id].jsx
│   └── 📄 __tests__/
└── 📁 reportes/