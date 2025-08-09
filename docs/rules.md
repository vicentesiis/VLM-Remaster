# rules.md - Agent Context & Project Guidelines

## 📚 Core Project Documentation

**All agents should reference these existing files for technical context:**

- **📊 [Project Overview](./architecture/project-overview.md)** - System purpose, business domain, and high-level architecture
- **🔧 [Tech Stack](./architecture/tech-stack.md)** - Complete technology breakdown and versions
- **📁 [Folder Structure](./architecture/folder-structure.md)** - Code organization and module boundaries
- **🎨 [Design Patterns](./architecture/design-patterns.md)** - Established code patterns and conventions

## 🔧 Development Standards

### Code Quality Requirements

- **Linting**: ESLint + Prettier (follow existing config)
- **Type Safety**: TypeScript strict mode
- **Testing**: Jest/Vitest + Testing Library
- **Documentation**: JSDoc for all public functions
- **Performance**: Bundle size monitoring

### UI/UX Standards

- **Component Library**: shadcn/ui components only
- **Styling**: Tailwind utility classes
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Icons**: Lucide React icon set

### Workflow Preferences

- **Development Approach**: [Agile/Scrum/Kanban]
- **Code Reviews**: Required before merge
- **Documentation**: Update docs with each feature
- **Deployment**: [Your deployment process]

## 💡 Agent-Specific Guidelines

### 🏗️ For Architect Agent

- Always reference existing architecture docs before proposing changes
- Consider impact on all three modules (Usuarios/Registros/Reportes)
- Maintain consistency with established design patterns
- Document architectural decisions with rationale

### 👨‍💻 For Developer Agent

- Follow patterns established in design-patterns.md
- Respect folder structure defined in folder-structure.md
- Use tech stack components listed in tech-stack.md
- Implement comprehensive error handling and logging

### 🧪 For QA Agent

- Test cross-module interactions and data flow
- Validate against business rules in each module
- Ensure backward compatibility with existing APIs
- Focus on edge cases in complex business workflows

### 🎨 For UI/UX Agent

- Use only shadcn/ui components for consistency
- Design within existing brand guidelines
- Consider mobile-first responsive approach
- Ensure accessibility compliance in all interfaces

## 🚀 Quick Reference

### When Starting a Task

1. **Check existing architecture docs** for current implementation
2. **Identify affected modules**
3. **Consider constraints** (what cannot change)
4. **Document decisions** and rationale

### For Multi-Module Tasks

- Consider data flow between modules
- Ensure consistent user experience
- Plan for deployment coordination
- Test integration points thoroughly

## 📝 Change Documentation Rules

When starting a new change:

1. **Duplicate** `/docs/changes/_TEMPLATE/` into  
   `/docs/changes/<feature-name>`
3. **Update** `details.md` when the change is implemented.
5. **Attach** any relevant diagrams, screenshots, or API diffs in the same folder.