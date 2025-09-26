# Troubleshooting

> Common issues, solutions, debugging tips, and problem resolution strategies

## Translation Issues

### Translation Not Showing

**Problem**: Translations display as keys (e.g., "nav.home" instead of "HOME")

**Possible Causes & Solutions**:

1. **Missing translation key in locale file**
   ```bash
   # Check if key exists in translation files
   grep -r "nav.home" public/locales/
   ```
   **Solution**: Add the missing key to both `en.json` and `es.json`

2. **Incorrect dot notation syntax**
   ```typescript
   // Incorrect
   t('nav-home')
   t('nav/home') 
   
   // Correct
   t('nav.home')
   ```

3. **Translation files not loading**
   ```bash
   # Check if files exist and are accessible
   ls -la public/locales/
   # Should show: en.json, es.json
   
   # Check browser network tab for 404 errors
   # Files should load from: /locales/en.json
   ```

4. **Translation context not provided**
   ```typescript
   // Missing provider wrapper
   function App() {
     return (
       <TranslationProvider> {/* Add this wrapper */}
         <YourComponent />
       </TranslationProvider>
     )
   }
   ```

### Translation Loading Issues

**Problem**: Loading states persist indefinitely

**Debug Steps**:
```typescript
// Add debug logging to translation context
useEffect(() => {
  console.log('Loading translations for language:', language)
  loadTranslations(language).then(() => {
    console.log('Translations loaded successfully')
  }).catch(error => {
    console.error('Translation loading failed:', error)
  })
}, [language])
```

**Solutions**:
- Check network requests in browser dev tools
- Verify JSON file syntax with online validator
- Ensure files are served correctly from `/public/locales/`

### Fallback Translation Issues

**Problem**: Fallback to English not working

**Solution**:
```typescript
// Implement proper fallback in translation function
const t = (key: string): string => {
  if (isLoading) return key
  
  const keys = key.split('.')
  let value: any = translations
  
  // Navigate through nested object
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      value = undefined
      break
    }
  }
  
  // If value found and is string, return it
  if (typeof value === 'string') {
    return value
  }
  
  // Fallback: try English translations
  if (language !== 'en') {
    // Load English fallback (implementation depends on your setup)
    return getFallbackTranslation(key) || key
  }
  
  // Final fallback: return the key itself
  return key
}
```

## TypeScript Issues

### Compilation Errors

**Problem**: TypeScript compilation fails

**Common Solutions**:

1. **Path alias not working**
   ```bash
   # Check tsconfig.json paths configuration
   cat tsconfig.json | grep -A 5 "paths"
   
   # Should include:
   # "@/*": ["./*"]
   ```

2. **Missing type definitions**
   ```bash
   # Install missing @types packages
   pnpm add -D @types/node @types/react @types/react-dom
   ```

3. **Import errors**
   ```bash
   # Run type checking
   pnpm run lint
   
   # Check for common import issues:
   # - Missing file extensions in imports
   # - Incorrect relative paths
   # - Missing default exports
   ```

### Type Checking Commands
```bash
# Full type check
npx tsc --noEmit

# Check specific file
npx tsc --noEmit --skipLibCheck components/my-component.tsx

# Watch mode for continuous checking
npx tsc --noEmit --watch
```

### Common TypeScript Errors

**Error**: `Cannot find module '@/components/ui/button'`
```typescript
// Check tsconfig.json has correct baseUrl and paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}

// Restart TypeScript server in VS Code
// Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

**Error**: `Type 'ReactNode' is not assignable to type 'string'`
```typescript
// Ensure proper typing for component props
interface ComponentProps {
  title: string           // Not ReactNode
  children?: ReactNode    // Use ReactNode for component children
}
```

**Error**: `Property does not exist on type`
```typescript
// Add proper interface definitions
interface Post {
  title: string
  slug: string
  // Add all required properties
}

// Use type guards for runtime checks
function isPost(obj: unknown): obj is Post {
  return typeof obj === 'object' && 
         obj !== null && 
         'title' in obj && 
         'slug' in obj
}
```

## Styling Issues

### Tailwind CSS Not Working

**Problem**: Tailwind classes not applying

**Debug Steps**:
1. **Check Tailwind configuration**
   ```bash
   # Verify tailwind.config.js exists and is configured
   cat tailwind.config.js
   
   # Check PostCSS configuration
   cat postcss.config.js
   ```

2. **Verify CSS import**
   ```typescript
   // Ensure globals.css is imported in app/layout.tsx
   import './globals.css'
   ```

3. **Check CSS file**
   ```css
   /* app/globals.css should include Tailwind directives */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Clear cache and restart**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Restart development server
   pnpm run dev
   ```

### Design Token Issues

**Problem**: CSS custom properties not working

**Solutions**:
1. **Check CSS variable definitions**
   ```css
   /* Ensure variables are defined in :root and .dark */
   :root {
     --background: oklch(1 0 0);
     --foreground: oklch(0.145 0 0);
   }
   
   .dark {
     --background: oklch(0.145 0 0);
     --foreground: oklch(0.985 0 0);
   }
   ```

2. **Verify Tailwind CSS integration**
   ```css
   /* Check @theme inline configuration */
   @theme inline {
     --color-background: var(--background);
     --color-foreground: var(--foreground);
   }
   ```

3. **Test CSS variables in browser**
   ```javascript
   // Check in browser console
   getComputedStyle(document.documentElement).getPropertyValue('--background')
   ```

### Dark Mode Issues

**Problem**: Dark mode not switching correctly

**Debug & Solutions**:
```typescript
// Check theme context implementation
useEffect(() => {
  console.log('Current theme:', theme)
  console.log('System theme:', systemTheme)
  console.log('Document classes:', document.documentElement.classList)
}, [theme, systemTheme])

// Ensure proper class application
useEffect(() => {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')
  
  const effectiveTheme = theme === 'system' ? systemTheme : theme
  root.classList.add(effectiveTheme)
  
  console.log('Applied theme class:', effectiveTheme)
}, [theme, systemTheme])
```

## Build Issues

### Next.js Build Errors

**Problem**: Production build fails

**Common Issues & Solutions**:

1. **TypeScript errors in build**
   ```bash
   # Check for type errors
   pnpm run lint
   
   # Fix all TypeScript errors before building
   # Build will fail with any type errors
   ```

2. **Missing environment variables**
   ```bash
   # Check if required environment variables are set
   echo $NODE_ENV
   
   # Create .env.local for local development
   # Create .env.production for production
   ```

3. **Import/export issues**
   ```bash
   # Check for:
   # - Circular imports
   # - Missing default exports
   # - Incorrect import paths
   
   # Use dependency graph tools if needed
   npx madge --circular --extensions ts,tsx ./
   ```

4. **Memory issues during build**
   ```bash
   # Increase Node.js memory limit
   export NODE_OPTIONS="--max-old-space-size=4096"
   pnpm run build
   ```

### Static Export Issues

**Problem**: Static export fails

**Solutions**:
```javascript
// next.config.mjs - Ensure correct configuration
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

**Common static export problems**:
- Server-side functions in client components
- Dynamic routes without `generateStaticParams`
- Images not optimized for static export

## Performance Issues

### Bundle Size Problems

**Problem**: JavaScript bundle too large

**Debug & Solutions**:
```bash
# Analyze bundle size
pnpm add -D @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true pnpm run build
```

**Optimization strategies**:
- Use dynamic imports for large components
- Remove unused dependencies
- Enable tree shaking
- Use React Server Components when possible

### Slow Development Server

**Problem**: `pnpm run dev` is slow

**Solutions**:
1. **Clear Next.js cache**
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   ```

2. **Update dependencies**
   ```bash
   pnpm update
   ```

3. **Check for large node_modules**
   ```bash
   du -sh node_modules
   # If too large, remove and reinstall
   rm -rf node_modules
   pnpm install
   ```

4. **Disable unused features**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     experimental: {
       optimizeCss: false, // Disable if causing issues
     }
   }
   ```

### Runtime Performance Issues

**Problem**: App feels slow or unresponsive

**Debug Tools**:
```typescript
// Add performance monitoring
useEffect(() => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Performance entry:', entry)
      }
    })
    observer.observe({ entryTypes: ['navigation', 'resource'] })
  }
}, [])
```

**Solutions**:
- Use `React.memo()` for expensive components
- Implement proper `useMemo()` and `useCallback()`
- Avoid unnecessary re-renders
- Use React DevTools Profiler

## Development Environment Issues

### pnpm Issues

**Problem**: pnpm commands fail

**Solutions**:
1. **Update pnpm**
   ```bash
   npm install -g pnpm@latest
   pnpm --version
   ```

2. **Clear pnpm cache**
   ```bash
   pnpm store prune
   ```

3. **Delete node_modules and reinstall**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

### VS Code Issues

**Problem**: TypeScript/ESLint not working in editor

**Solutions**:
1. **Restart TypeScript server**
   - `Cmd/Ctrl + Shift + P`
   - Type: "TypeScript: Restart TS Server"

2. **Check workspace settings**
   ```json
   // .vscode/settings.json
   {
     "typescript.preferences.importModuleSpecifier": "relative",
     "typescript.suggest.autoImports": true
   }
   ```

3. **Install recommended extensions**
   - TypeScript and JavaScript Language Features
   - ESLint
   - Tailwind CSS IntelliSense

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::3000`

**Solutions**:
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or use different port
pnpm run dev -- --port 3001
```

## Component Issues

### shadcn/ui Component Problems

**Problem**: shadcn/ui component not working as expected

**Debug Steps**:
1. **Check component installation**
   ```bash
   ls -la components/ui/
   # Verify component file exists
   ```

2. **Verify imports**
   ```typescript
   // Check correct import path
   import { Button } from '@/components/ui/button'
   
   // Not from '@/components/button'
   ```

3. **Check component configuration**
   ```bash
   cat components.json
   # Verify aliases and paths are correct
   ```

### Component Not Rendering

**Problem**: Custom component doesn't render

**Debug Checklist**:
- [ ] Component is exported correctly
- [ ] Import path is correct
- [ ] Props are passed correctly
- [ ] No TypeScript errors
- [ ] Component is used inside proper parent
- [ ] Check browser console for errors

```typescript
// Add debug logging
export function MyComponent(props: ComponentProps) {
  console.log('MyComponent props:', props)
  
  // Add error boundary for debugging
  if (!props.requiredProp) {
    console.error('Missing required prop')
    return <div>Error: Missing required prop</div>
  }
  
  return <div>Component content</div>
}
```

## Content Issues

### Markdown Not Rendering

**Problem**: Blog posts not displaying markdown correctly

**Solutions**:
1. **Check markdown processing**
   ```typescript
   // Verify ReactMarkdown configuration
   <ReactMarkdown
     remarkPlugins={[remarkGfm]}
     components={{
       // Custom component overrides
     }}
   >
     {content}
   </ReactMarkdown>
   ```

2. **Debug content loading**
   ```typescript
   // Add logging to content functions
   export function getPostBySlug(slug: string): Post | null {
     console.log('Loading post:', slug)
     const post = posts.find(p => p.slug === slug)
     console.log('Found post:', post)
     return post || null
   }
   ```

3. **Check markdown syntax**
   - Verify frontmatter format (for file-based content)
   - Check for special characters in content
   - Validate JSON syntax in metadata

### Post Not Found Issues

**Problem**: Individual blog post pages return 404

**Debug Steps**:
1. **Check slug generation**
   ```typescript
   // Verify slugs match URL params
   console.log('Available post slugs:', getAllPosts().map(p => p.slug))
   console.log('Requested slug:', params.slug)
   ```

2. **Verify `generateStaticParams`**
   ```typescript
   // Ensure function returns correct params
   export async function generateStaticParams() {
     const posts = await getAllPosts()
     console.log('Generated params:', posts.map(post => ({ slug: post.slug })))
     return posts.map(post => ({ slug: post.slug }))
   }
   ```

## Network and API Issues

### Fetch Errors

**Problem**: API calls failing

**Debug Steps**:
```typescript
// Add comprehensive error logging
async function fetchData(url: string) {
  try {
    console.log('Fetching:', url)
    const response = await fetch(url)
    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Response data:', data)
    return data
    
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

## Emergency Debugging

### When Everything Breaks

1. **Start fresh**
   ```bash
   # Clear all caches and restart
   rm -rf .next node_modules
   pnpm install
   pnpm run dev
   ```

2. **Check git status**
   ```bash
   # See what changed
   git status
   git diff
   
   # Revert if needed
   git checkout -- .
   ```

3. **Minimal reproduction**
   - Create simple page with basic components
   - Gradually add complexity
   - Identify breaking point

4. **Check browser console**
   - Open Developer Tools
   - Check Console, Network, and Sources tabs
   - Look for error messages and failed requests

5. **Enable verbose logging**
   ```typescript
   // Add to components temporarily
   console.log('Component render:', { props, state })
   ```

## Getting Help

### Resources
- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **shadcn/ui Documentation**: https://ui.shadcn.com

### Debugging Tools
- React Developer Tools browser extension
- Next.js built-in debugger
- VS Code debugging configuration
- Browser Performance profiler

### Community Support
- Next.js GitHub Discussions
- React Community Discord
- Stack Overflow with relevant tags
- Project-specific issue tracker

## See Also

- [Common Tasks](./common-tasks.md) - Step-by-step guides for development workflows
- [Development Patterns](./development-patterns.md) - Error handling patterns
- [Technology Stack](./technology-stack.md) - Tool-specific troubleshooting
- [Best Practices](./best-practices.md) - Prevention strategies
- [Architecture Guidelines](./architecture-guidelines.md) - Structural debugging

---

*When in doubt, start with the simplest solution first. Most issues are caused by common problems like missing imports, incorrect paths, or configuration errors.*