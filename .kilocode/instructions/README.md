# Development Instructions

> Comprehensive development guide for Iván Olivares Rojas' personal website

## Project Overview

This is a modern personal website built as a showcase for professional work, thoughts, talks, and personal interests. The site features a clean, minimalist design with internationalization support and focuses on performance, accessibility, and developer experience.

**Key Features:**
- Personal portfolio and blog
- Multilingual support (English/Spanish)
- Dark/light theme switching
- Command palette navigation
- Markdown-based content management
- Responsive design with modern aesthetics

## Quick Start

```bash
# Install dependencies (pnpm required)
pnpm install

# Start development server
pnpm run dev

# Type checking
pnpm run lint

# Production build
pnpm run build
```

## Documentation Structure

This documentation is organized into focused, domain-specific guides to help you navigate and contribute to the project efficiently.

### Core Architecture
- **[Technology Stack](./technology-stack.md)** - Frameworks, dependencies, versions, and configurations
- **[Architecture Guidelines](./architecture-guidelines.md)** - File structure, app organization, and routing patterns
- **[Development Patterns](./development-patterns.md)** - TypeScript patterns, imports, and error handling

### Component Development
- **[Component System](./component-system.md)** - shadcn/ui components, patterns, variants, and accessibility
- **[Styling Guidelines](./styling-guidelines.md)** - Tailwind CSS, design tokens, theming, and responsive design

### Content & Internationalization
- **[Content Management](./content-management.md)** - Blog system, markdown processing, and content organization
- **[Internationalization](./internationalization.md)** - Translation system, locale handling, and implementation

### Development Workflow
- **[Common Tasks](./common-tasks.md)** - Step-by-step guides for frequent development tasks
- **[Troubleshooting](./troubleshooting.md)** - Common issues, solutions, and debugging tips
- **[Best Practices](./best-practices.md)** - Do's and don'ts, code quality guidelines

## Getting Started

1. **Set up your development environment:**
   - Ensure you have Node.js 18+ installed
   - Install pnpm globally: `npm install -g pnpm`
   - Clone the repository and run `pnpm install`

2. **Understand the architecture:**
   - Start with [Technology Stack](./technology-stack.md) to understand the tools
   - Review [Architecture Guidelines](./architecture-guidelines.md) for project structure
   - Learn [Development Patterns](./development-patterns.md) for coding standards

3. **Start developing:**
   - Check [Common Tasks](./common-tasks.md) for typical development workflows
   - Reference [Component System](./component-system.md) when building UI components
   - Follow [Styling Guidelines](./styling-guidelines.md) for consistent design implementation

## Key Principles

- **Performance First**: React Server Components, code splitting, and optimized bundles
- **Accessibility Focused**: Radix UI primitives with proper ARIA labeling
- **Type Safety**: Strict TypeScript with comprehensive type definitions
- **Developer Experience**: Clear patterns, helpful tooling, and comprehensive documentation
- **Internationalization**: Built-in support for English and Spanish with extensible architecture

## Need Help?

- **Common Issues**: Check [Troubleshooting](./troubleshooting.md) for solutions to frequent problems
- **Development Workflow**: Review [Common Tasks](./common-tasks.md) for step-by-step guides
- **Code Standards**: Follow [Best Practices](./best-practices.md) for quality guidelines

## Contributing

This project follows strict development patterns and code quality standards. Please:

1. Read the relevant documentation sections before making changes
2. Follow the established patterns and conventions
3. Ensure TypeScript type safety is maintained
4. Test changes in both English and Spanish locales
5. Verify responsive design across different screen sizes

---

*This documentation is designed to be comprehensive yet focused. Each section contains complete, actionable information while cross-referencing related topics for deeper understanding.*