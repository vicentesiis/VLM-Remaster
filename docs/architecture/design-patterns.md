# 🎨 Design Patterns & Conventions

## 📊 Overview

Refined design patterns for modern React web development, focusing on maintainability, performance, and developer experience.

## 🏗️ Architectural Patterns

### **1. Feature-Slice Design (FSD) Architecture**
```
📁 src/
├── 📁 app/                    # App-level configuration
├── 📁 pages/                  # Page-level components (routing)
├── 📁 features/               # Business features
├── 📁 entities/               # Business entities
├── 📁 shared/                 # Shared resources
└── 📁 widgets/                # Complex UI blocks
```

**Benefits over simple feature-based**:
- ✅ **Clear hierarchy**: App > Pages > Features > Entities > Shared
- ✅ **Dependency rules**: Higher layers can use lower, not vice versa  
- ✅ **Scalability**: Works for small and large applications
- ✅ **Team boundaries**: Clear ownership of code sections

### **2. Improved Layered Architecture**
```
📁 pages/                      # Route components
├── 📁 usuarios/
│   ├── 📄 index.jsx           # Page component
│   └── 📄 usuarios.lazy.jsx   # Lazy-loaded component
└── 📁 reportes/

📁 features/                   # Business features  
├── 📁 user-management/
│   ├── 📁 api/               # Feature API calls
│   ├── 📁 model/             # State management
│   ├── 📁 ui/                # Feature UI components
│   └── 📄 index.js           # Public API
└── 📁 reporting/

📁 entities/                   # Business entities
├── 📁 user/
│   ├── 📁 api/               # Entity API
│   ├── 📁 model/             # Entity state
│   ├── 📁 ui/                # Entity components
│   └── 📄 index.js
└── 📁 report/

📁 shared/                     # Shared resources
├── 📁 api/                   # Base API setup
├── 📁 ui/                    # UI kit components
├── 📁 lib/                   # Utilities
└── 📁 config/                # Configuration
```

## 🧩 Component Structure

### **1. Basic Component Structure**
```jsx
// ❌ Unorganized component
const UserCard = ({ user, onEdit, onDelete, permissions }) => {
  // Mixed concerns and no clear structure
  const [isEditing, setIsEditing] = useState(false)
  const { data } = useQuery(...)
  
  return (
    <div>
      {/* Everything mixed together */}
    </div>
  )
}

// ✅ Well-structured component
const UserCard = ({ user, onEdit, onDelete }) => {
  // 1. Hooks
  const [isEditing, setIsEditing] = useState(false)
  const { canEdit, canDelete } = usePermissions()
  
  // 2. Derived state
  const displayName = useMemo(() => 
    `${user.firstName} ${user.lastName}`, 
    [user.firstName, user.lastName]
  )
  
  // 3. Event handlers
  const handleEdit = useCallback(() => {
    setIsEditing(true)
    onEdit?.(user.id)
  }, [user.id, onEdit])
  
  const handleDelete = useCallback(() => {
    if (confirm('Are you sure?')) {
      onDelete?.(user.id)
    }
  }, [user.id, onDelete])
  
  // 4. Render logic
  if (isEditing) {
    return <UserEditForm user={user} onCancel={() => setIsEditing(false)} />
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{displayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <UserDetails user={user} />
      </CardContent>
      <CardFooter>
        {canEdit && <Button onClick={handleEdit}>Edit</Button>}
        {canDelete && <Button onClick={handleDelete} variant="destructive">Delete</Button>}
      </CardFooter>
    </Card>
  )
}
```

### **2. Component File Organization**
```jsx
// 📁 components/UserCard/
// ├── 📄 UserCard.jsx         # Main component
// ├── 📄 UserCard.styles.js   # Styled components/styles
// ├── 📄 UserCard.hooks.js    # Custom hooks
// ├── 📄 UserCard.utils.js    # Utility functions
// ├── 📄 UserCard.test.jsx    # Tests
// └── 📄 index.js             # Public API

// UserCard.jsx
import { useUserCardLogic } from './UserCard.hooks'
import { formatUserData } from './UserCard.utils'
import * as S from './UserCard.styles'

export const UserCard = ({ user, ...props }) => {
  const { 
    isEditing, 
    handleEdit, 
    handleDelete 
  } = useUserCardLogic(user, props)
  
  const formattedUser = formatUserData(user)
  
  return (
    <S.CardContainer>
      <S.CardHeader>
        {formattedUser.displayName}
      </S.CardHeader>
      {/* ... */}
    </S.CardContainer>
  )
}

```

## 📐 Page Layout

### **1. Standard Page Layout Structure**
```jsx
// ❌ Inconsistent page layouts
const UsersPage = () => {
  return (
    <div>
      <h1>Users</h1>
      <UsersList />
    </div>
  )
}

// ✅ Consistent page layout pattern
const UsersPage = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Users"
        actions={<CreateUserButton />}
      />
      
      <PageContent>
        <PageFilters>
          <SearchInput />
          <RoleFilter />
        </PageFilters>
        
        <PageMain>
          <UsersTable />
        </PageMain>
        
        <PageFooter>
          <Pagination />
        </PageFooter>
      </PageContent>
    </PageLayout>
  )
}
```

### **2. Layout Components**
```jsx
// Reusable layout components
export const PageLayout = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export const PageHeader = ({ 
  title, 
  description, 
  breadcrumbs, 
  actions 
}) => {
  return (
    <header className="border-b">
      <div className="container py-6">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
          
          {actions && (
            <div className="flex gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export const PageContent = ({ children, className }) => {
  return (
    <div className={cn("container py-6", className)}>
      {children}
    </div>
  )
}
```

## 🧩 Enhanced Component Patterns

### **1. Smart Composition Pattern**
```jsx
// ❌ Your current approach - too nested
const UserPage = () => {
  return (
    <PageLayout title="Users">
      <UserFilters />
      <UserTable />
      <UserActions />
    </PageLayout>
  )
}

// ✅ Improved - with error boundaries and loading states
const UsersPage = () => {
  return (
    <PageLayout 
      title="Users"
      breadcrumbs={[{ label: "Users", href: "/usuarios" }]}
    >
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<PageSkeleton />}>
          <UsersPageContent />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  )
}

const UsersPageContent = () => {
  return (
    <>
      <UsersFilters />
      <UsersTable />
      <UsersActions />
    </>
  )
}
```

### **2. Compound Component Pattern (Improved)**
```jsx
// Better compound pattern with context
const DataTable = ({ children, data, ...props }) => {
  const tableState = useDataTable(data, props)
  
  return (
    <DataTableContext.Provider value={tableState}>
      <div className="data-table">
        {children}
      </div>
    </DataTableContext.Provider>
  )
}

// Auto-connected sub-components
DataTable.Toolbar = () => {
  const { filters, setFilters } = useDataTableContext()
  return <TableToolbar filters={filters} onChange={setFilters} />
}

DataTable.Content = () => {
  const { data, loading } = useDataTableContext()
  if (loading) return <TableSkeleton />
  return <TableContent data={data} />
}

DataTable.Pagination = () => {
  const { pagination } = useDataTableContext()
  return <TablePagination {...pagination} />
}

// Usage - self-configuring
<DataTable data={users} onFilter={handleFilter}>
  <DataTable.Toolbar />
  <DataTable.Content />
  <DataTable.Pagination />
</DataTable>
```

### **3. Server-Component Pattern (for data fetching)**
```jsx
// ❌ Your current pattern - client-side heavy
const UsersContainer = () => {
  const { users, loading, error } = useUsers()
  const { handleEdit, handleDelete } = useUserActions()
  
  return (
    <UsersList 
      users={users}
      loading={loading}
      error={error}
      onEdit={handleEdit}
      onDelete={onDelete}
    />
  )
}

// ✅ Improved - with proper data boundaries
const UsersPage = () => {
  return (
    <QueryErrorBoundary>
      <UsersPageContent />
    </QueryErrorBoundary>
  )
}

const UsersPageContent = () => {
  // Single source of truth for data
  const {
    data: users,
    isLoading,
    error,
    refetch
  } = useUsersQuery()
  
  // Actions as separate concern
  const userActions = useUserActions({ 
    onSuccess: refetch 
  })
  
  if (isLoading) return <UsersPageSkeleton />
  if (error) return <ErrorPage error={error} retry={refetch} />
  
  return (
    <UsersView 
      users={users} 
      actions={userActions}
    />
  )
}
```

## 🎣 Modern Hook Patterns

### **1. Query + Mutation Pattern (TanStack Query)**
```jsx
// ❌ Your current approach - mixed concerns
const useUserManagement = () => {
  const userData = useUserData()
  const userActions = useUserActions()
  const userFilters = useUserFilters()
  
  return {
    ...userData,
    ...userActions,
    ...userFilters
  }
}

// Mutations
export const useUserMutations = () => {
  const queryClient = useQueryClient()
  
  const createUser = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  
  const updateUser = useMutation({
    mutationFn: ({ id, data }) => userApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User updated successfully')
    }
  })
  
  return {
    createUser,
    updateUser,
    isLoading: createUser.isPending || updateUser.isPending
  }
}

// UI state (separate from server state)
export const useUsersFilters = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  
  const debouncedSearch = useDebounce(searchTerm, 300)
  
  const filters = useMemo(() => ({
    search: debouncedSearch,
    role: roleFilter === 'all' ? undefined : roleFilter,
    sortBy
  }), [debouncedSearch, roleFilter, sortBy])
  
  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    sortBy,
    setSortBy,
    filters
  }
}
```

### **2. Custom Hook Factories (Better)**
```jsx
// ❌ Your current approach - too generic
const createEntityHook = (entityName) => {
  return (params) => {
    return useQuery({
      queryKey: [entityName, params],
      queryFn: () => api.get(`/${entityName}`, { params })
    })
  }
}

// ✅ Improved - typed and specific
const createEntityQueries = (entityName, apiMethods) => {
  const useEntityQuery = (params) => {
    return useQuery({
      queryKey: [entityName, 'list', params],
      queryFn: () => apiMethods.getList(params),
      staleTime: 5 * 60 * 1000
    })
  }
  
  const useEntityByIdQuery = (id) => {
    return useQuery({
      queryKey: [entityName, 'detail', id],
      queryFn: () => apiMethods.getById(id),
      enabled: !!id
    })
  }
  
  const useEntityMutations = () => {
    const queryClient = useQueryClient()
    
    const invalidateEntity = useCallback(() => {
      queryClient.invalidateQueries({ queryKey: [entityName] })
    }, [queryClient])
    
    return {
      create: useMutation({
        mutationFn: apiMethods.create,
        onSuccess: invalidateEntity
      }),
      update: useMutation({
        mutationFn: ({ id, data }) => apiMethods.update(id, data),
        onSuccess: invalidateEntity
      }),
      delete: useMutation({
        mutationFn: apiMethods.delete,
        onSuccess: invalidateEntity
      })
    }
  }
  
  return {
    [`use${entityName}Query`]: useEntityQuery,
    [`use${entityName}ByIdQuery`]: useEntityByIdQuery,
    [`use${entityName}Mutations`]: useEntityMutations
  }
}

// Usage
const userQueries = createEntityQueries('Users', userApi)
export const { useUsersQuery, useUsersByIdQuery, useUsersMutations } = userQueries
```

## 📡 Improved API Patterns

### **1. Type-Safe API Client**
```jsx
// ❌ Your current approach - basic service layer
class UserService {
  static async getUsers(params) {
    return apiClient.get('/users', { params })
  }
}

// ✅ Improved - with proper error handling and types
class ApiClient {
  constructor(baseURL, defaultConfig = {}) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      ...defaultConfig
    })
    
    this.setupInterceptors()
  }
  
  setupInterceptors() {
    // Request interceptor - add auth
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    
    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // Handle auth errors
          authService.logout()
          window.location.href = '/login'
        }
        
        throw new ApiError({
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          code: error.response?.data?.code
        })
      }
    )
  }
  
  // Generic methods with better error handling
  async get(url, config) {
    return this.client.get(url, config)
  }
  
  async post(url, data, config) {
    return this.client.post(url, data, config)
  }
  
  async put(url, data, config) {
    return this.client.put(url, data, config)
  }
  
  async delete(url, config) {
    return this.client.delete(url, config)
  }
}

// Specific API services
export const userApi = {
  getUsers: (params) => apiClient.get('/users', { params }),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  createUser: (data) => apiClient.post('/users', data),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/users/${id}`)
}
```

### **2. Error Handling Pattern (Enhanced)**
```jsx
// ❌ Basic error handling
const apiClient = {
  async get(url, config) {
    try {
      const response = await axios.get(url, config)
      return response.data
    } catch (error) {
      throw new ApiError(error)
    }
  }
}

// ✅ Comprehensive error handling
class ApiError extends Error {
  constructor({ message, status, code, details }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
  
  get isNetworkError() {
    return !this.status
  }
  
  get isClientError() {
    return this.status >= 400 && this.status < 500
  }
  
  get isServerError() {
    return this.status >= 500
  }
}

// Global error boundary
export const QueryErrorBoundary = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback 
              error={error} 
              onRetry={resetErrorBoundary}
            />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
```

### **3. Design Tokens Pattern**
```jsx
// tailwind.config.js - Design system tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic color names
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        }
      },
      spacing: {
        // Consistent spacing scale
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        // Custom animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  }
}
```

## 🔗 Related Documentation

- [📁 Optimized Folder Structure](./folder-structure-optimized.md)
- [📊 Project Overview](./project-overview.md)
- [🔧 Tech Stack](./tech-stack.md)
- [💻 Coding Standards](../development/coding-standards.md)

---

*This structure provides better maintainability, performance, and developer experience for modern React applications.*