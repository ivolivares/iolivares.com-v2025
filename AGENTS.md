# Development Instructions

> **📚 [Complete Documentation Hub](./.kilocode/README.md)**

This file provides quick reference to the project's comprehensive development documentation, now organized into focused, domain-specific guides.

## Project Overview

Modern personal website for Iván Olivares Rojas built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features multilingual support, dark/light themes, command palette navigation, and markdown-based content management.

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

### 📖 [Complete Guide](./.kilocode/instructions/README.md)
**Main documentation hub** with navigation to all specialized guides

### 🏗️ Core Architecture
- **[Technology Stack](./.kilocode/technology-stack.md)** - Frameworks, dependencies, versions, configurations
- **[Architecture Guidelines](./.kilocode/architecture-guidelines.md)** - File structure, app organization, routing patterns
- **[Development Patterns](./.kilocode/development-patterns.md)** - TypeScript patterns, imports, error handling

### 🎨 Component Development
- **[Component System](./.kilocode/component-system.md)** - shadcn/ui components, patterns, variants, accessibility
- **[Styling Guidelines](./.kilocode/styling-guidelines.md)** - Tailwind CSS, design tokens, theming, responsive design

### 📝 Content & Internationalization
- **[Content Management](./.kilocode/content-management.md)** - Blog system, markdown processing, content organization
- **[Internationalization](./.kilocode/internationalization.md)** - Translation system, locale handling, implementation

### 🛠️ Development Workflow
- **[Common Tasks](./.kilocode/common-tasks.md)** - Step-by-step guides for frequent development tasks
- **[Troubleshooting](./.kilocode/troubleshooting.md)** - Common issues, solutions, debugging tips
- **[Best Practices](./.kilocode/best-practices.md)** - Do's and don'ts, code quality guidelines

## Essential Quick Reference

### Technology Stack
- **Next.js 15.2.4** with App Router & React Server Components
- **React 19** with concurrent features
- **TypeScript 5** with strict mode
- **Tailwind CSS 4.1.9** with OKLCH color space
- **shadcn/ui** (New York variant) + Radix UI primitives
- **pnpm 10.16.1** (required package manager)

### Key Principles
- **Performance First** - React Server Components, code splitting, optimized bundles
- **Accessibility Focused** - Radix UI primitives with proper ARIA labeling
- **Type Safety** - Strict TypeScript with comprehensive type definitions
- **Developer Experience** - Clear patterns, helpful tooling, comprehensive documentation
- **Internationalization** - Built-in English/Spanish support with extensible architecture

### Project Structure
```
/
├── app/                     # Next.js App Router (pages & layouts)
├── components/              # React components
│   ├── ui/                 # shadcn/ui components (don't modify)
│   └── [custom-components] # Application-specific components
├── contexts/               # React Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configurations
└── public/                 # Static assets
    └── locales/           # Translation files (en.json, es.json)
```

### Essential Commands
```bash
# Development
pnpm run dev              # Start development server
pnpm run build            # Production build
pnpm run lint             # Type checking

# Components
pnpm dlx shadcn-ui add [component]  # Add UI component

# File naming
app/page-name/page.tsx              # Pages (kebab-case)
components/component-name.tsx       # Components (kebab-case files)
hooks/use-hook-name.tsx            # Hooks (use- prefix)
```

### Core Imports
```typescript
// Essential imports for most components
import React from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

## Need Help?

### 🆘 Quick Solutions
1. **Translation not showing?** → [Troubleshooting Guide](./.kilocode/troubleshooting.md#translation-issues)
2. **TypeScript errors?** → [Development Patterns](./.kilocode/development-patterns.md#typescript-configuration)
3. **Styling issues?** → [Styling Guidelines](./.kilocode/styling-guidelines.md#troubleshooting)
4. **Component not working?** → [Component System](./.kilocode/component-system.md#troubleshooting)

### 📋 Development Workflow
1. **New to the project?** Start with [Technology Stack](./.kilocode/technology-stack.md)
2. **Adding features?** Check [Common Tasks](./.kilocode/common-tasks.md)
3. **Code quality questions?** Review [Best Practices](./.kilocode/best-practices.md)
4. **Stuck on something?** Search [Troubleshooting](./.kilocode/troubleshooting.md)

### 🏃‍♂️ Quick Tasks
- [Adding a New Page](./.kilocode/common-tasks.md#adding-a-new-page)
- [Adding a Component](./.kilocode/common-tasks.md#adding-a-new-component)
- [Adding Translations](./.kilocode/common-tasks.md#adding-translations)
- [Styling Components](./.kilocode/common-tasks.md#styling-components)
- [Managing Content](./.kilocode/common-tasks.md#managing-content)

---

> **💡 Pro Tip:** For comprehensive guidance on any topic, navigate to the specific instruction files linked above. Each guide contains complete, actionable information while cross-referencing related topics.

*This documentation is designed to scale with the project. Each section contains complete information while maintaining clear navigation between related concepts.*