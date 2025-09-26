# Technology Stack

> Complete overview of frameworks, dependencies, versions, and configurations

## Core Framework

### Next.js 15.2.4
- **App Router** with React Server Components
- File-based routing system
- Automatic code splitting
- Built-in performance optimizations
- Static export ready for deployment

### React 19
- Latest React with concurrent features
- Server Components by default
- Enhanced performance with concurrent rendering
- Improved developer experience

### TypeScript 5
- Strict type checking enabled
- Path aliases for clean imports
- Enhanced developer experience with IntelliSense
- Build-time error catching

## Styling & UI Framework

### Tailwind CSS 4.1.9
- **Utility-first CSS framework**
- OKLCH color space for better color consistency
- Custom design token system
- Responsive design utilities
- Dark mode support built-in

### shadcn/ui Component Library
- **Variant**: New York style
- **Base Components**: Radix UI primitives
- **Accessibility-first** approach
- **TypeScript support** with proper interfaces
- **CSS Variables** for theming

### Radix UI
- Unstyled, accessible component primitives
- WAI-ARIA compliant
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Lucide React
- Modern icon library
- Consistent design language
- Tree-shakable icons
- TypeScript support
- Lightweight and performant

### CSS Custom Properties
- Design token system
- Theme switching support
- OKLCH color space
- Semantic color naming
- Runtime theme updates

## Content & Data Management

### react-markdown
- GitHub Flavored Markdown support
- Custom component rendering
- Plugin system with remark
- Code syntax highlighting ready
- Safe HTML rendering

### Custom Content System
- Type-safe blog post management
- Static content compilation
- Metadata extraction
- SEO-friendly structure
- Performance optimized

### JSON Translations
- File-based internationalization
- Hierarchical key structure
- Dot notation support
- Async loading capability
- Fallback language support

## Development Tools

### pnpm 10.16.1
- **Required package manager**
- Fast, disk space efficient
- Strict dependency resolution
- Monorepo support
- Better security with content-addressable storage

### ESLint & TypeScript
- Code quality enforcement
- Type checking at build time
- Consistent code formatting
- Import organization
- Error prevention

### Geist Font
- Modern, clean typography
- Variable font technology
- Optimized for screen reading
- Multiple weights and styles
- Performance optimized loading

## Deployment & Analytics

### Vercel Analytics
- Performance monitoring
- Core Web Vitals tracking
- User experience insights
- Real-time metrics
- Privacy-focused analytics

### Static Export Configuration
- Images unoptimized for static hosting
- Build-time optimization
- CDN-friendly output
- Fast loading times
- SEO optimized

## Configuration Details

### Next.js Configuration
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true // Required for static export
  },
  experimental: {
    typedRoutes: true // Type-safe routing
  }
}

export default nextConfig
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "target": "ES2017",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### shadcn/ui Configuration
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Package.json Dependencies
```json
{
  "dependencies": {
    "next": "15.2.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@radix-ui/react-*": "latest",
    "lucide-react": "latest",
    "tailwindcss": "^4.1.9",
    "react-markdown": "latest",
    "remark-gfm": "latest"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.2.4"
  }
}
```

## Version Requirements

### Node.js
- **Minimum**: Node.js 18+
- **Recommended**: Node.js 20+
- **Features Used**: ES modules, async/await, optional chaining

### Package Manager
- **Required**: pnpm 10.16.1+
- **Not supported**: npm, yarn
- **Reason**: Project is configured specifically for pnpm's workspace and dependency resolution

### Browser Support
- **Modern browsers** with ES2017+ support
- **Chrome**: 88+
- **Firefox**: 78+
- **Safari**: 14+
- **Edge**: 88+

## Build System

### Development Server
```bash
pnpm run dev
# Starts Next.js development server
# Hot reloading enabled
# TypeScript checking in real-time
```

### Production Build
```bash
pnpm run build
# Static export generation
# Image optimization
# Bundle optimization
# Type checking
```

### Type Checking
```bash
pnpm run lint
# ESLint code quality checks
# TypeScript type validation
# Import statement verification
```

## Performance Characteristics

### Bundle Size Targets
- **First Load JS**: < 130kb
- **Page-specific JS**: < 50kb per route
- **CSS**: Utility-based, minimal runtime

### Loading Performance
- **React Server Components** reduce client-side JavaScript
- **Code splitting** at route level
- **Dynamic imports** for heavy components
- **Image optimization** (disabled for static export)

### Runtime Performance
- **Concurrent rendering** with React 19
- **Automatic batching** for state updates
- **Optimized re-rendering** with proper memoization
- **CSS-in-JS avoided** for better performance

## Security Considerations

### Dependencies
- Regular security updates
- Minimal dependency tree with pnpm
- Type-safe dependencies preferred
- No deprecated packages

### Content Security
- Sanitized markdown rendering
- XSS protection in user content
- Type-safe API boundaries
- Secure translation loading

## See Also

- [Architecture Guidelines](./architecture-guidelines.md) - How these technologies are organized
- [Development Patterns](./development-patterns.md) - TypeScript and import patterns
- [Component System](./component-system.md) - shadcn/ui implementation details
- [Styling Guidelines](./styling-guidelines.md) - Tailwind CSS configuration
- [Troubleshooting](./troubleshooting.md) - Common technology-related issues

---

*This technology stack is carefully curated for performance, developer experience, and maintainability. All versions are tested together and dependencies are kept minimal.*