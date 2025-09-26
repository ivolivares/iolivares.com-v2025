# Development Patterns

> TypeScript patterns, imports, error handling, and coding conventions

## TypeScript Configuration

### Strict Type Checking
```typescript
// tsconfig.json - Strict configuration enabled
{
  "compilerOptions": {
    "strict": true,              // Enable all strict type checking
    "noEmit": true,             // Type checking only, no compilation
    "esModuleInterop": true,    // Better module interoperability
    "moduleResolution": "bundler", // Modern module resolution
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "incremental": true,
    "resolveJsonModule": true,
    
    // Path aliases for clean imports
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Interface Definition Patterns
```typescript
// Prefer interfaces over types for object shapes
interface ComponentProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

// Use generic interfaces for reusable patterns
interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// Extend built-in types appropriately
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}
```

### Type Guards and Validation
```typescript
// Type guard functions for runtime type checking
function isString(value: unknown): value is string {
  return typeof value === "string"
}

function isPost(obj: unknown): obj is Post {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "slug" in obj &&
    "title" in obj &&
    isString((obj as any).slug) &&
    isString((obj as any).title)
  )
}

// Use type guards in data handling
function processPostData(data: unknown): Post | null {
  if (isPost(data)) {
    return data
  }
  console.error("Invalid post data received")
  return null
}
```

## Import Patterns

### Path Aliases
```typescript
// Use path aliases consistently throughout the project
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { getAllPosts } from "@/lib/markdown"
import { TranslationProvider } from "@/contexts/translation-context"
```

### Import Organization
```typescript
// 1. React and Next.js imports first
import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// 2. Third-party library imports
import { Command } from 'cmdk'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// 3. Internal imports (using path aliases)
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { cn, formatDate } from "@/lib/utils"

// 4. Type-only imports at the end
import type { Post } from "@/lib/markdown"
import type { TranslationKey } from "@/contexts/translation-context"
```

### Dynamic Imports for Performance
```typescript
// Code splitting with dynamic imports
const CommandPalette = dynamic(() => import("@/components/command-palette"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-10 w-10 rounded" />
})

// Conditional loading
const AdminPanel = dynamic(() => import("@/components/admin-panel"), {
  ssr: false,
  loading: () => <div>Loading admin panel...</div>
})

// Component-level code splitting
function HomePage() {
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  
  return (
    <div>
      <BasicContent />
      {showAdvanced && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <AdvancedFeatures />
        </React.Suspense>
      )}
    </div>
  )
}
```

## Error Handling Patterns

### Graceful Degradation
```typescript
// Handle loading states gracefully
const { t, isLoading } = useTranslation()
if (isLoading) return <Skeleton className="h-6 w-32" />

// Fallback patterns in translation system
function getTranslation(key: string, translations: Record<string, any>): string {
  const value = translations[key]
  return typeof value === "string" ? value : key
}

// Component error boundaries
"use client"
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-4">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Async Error Handling
```typescript
// Proper error handling in async functions
async function fetchPosts(): Promise<Post[] | null> {
  try {
    const response = await fetch('/api/posts')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.posts || []
    
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    
    // Return null or empty array, don't throw
    return null
  }
}

// Hook with error state
function usePosts() {
  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchPosts()
        if (data) {
          setPosts(data)
        } else {
          throw new Error('Failed to load posts')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setPosts([]) // Provide fallback data
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return { posts, loading, error }
}
```

### Form Validation Patterns
```typescript
// Type-safe form handling
interface ContactForm {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validateForm(data: ContactForm): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = "Name is required"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email format is invalid"
  }

  if (!data.message.trim()) {
    errors.message = "Message is required"
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  return errors
}
```

## Performance Patterns

### React Server Components
```typescript
// Default to Server Components
async function BlogPage() {
  // Data fetching happens on the server
  const posts = await getAllPosts()
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1>Blog Posts</h1>
      <PostsList posts={posts} />
    </div>
  )
}

// Use Client Components sparingly
"use client"
function InteractiveSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState(posts)

  React.useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [query, posts])

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <PostsList posts={filteredPosts} />
    </div>
  )
}
```

### Memoization Patterns
```typescript
// Memoize expensive calculations
const ExpensiveComponent = React.memo(function ExpensiveComponent({ 
  posts 
}: { 
  posts: Post[] 
}) {
  const processedPosts = React.useMemo(() => {
    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => ({
        ...post,
        readTimeMinutes: Math.ceil(post.content.split(' ').length / 200)
      }))
  }, [posts])

  return (
    <div>
      {processedPosts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
})

// Memoize callbacks to prevent re-renders
function ParentComponent() {
  const [filter, setFilter] = React.useState('')

  const handleFilterChange = React.useCallback((newFilter: string) => {
    setFilter(newFilter)
  }, [])

  return (
    <div>
      <SearchInput onFilterChange={handleFilterChange} />
      <FilteredList filter={filter} />
    </div>
  )
}
```

### Image Optimization Patterns
```typescript
// Note: Images currently unoptimized for static export
// Standard Next.js Image component usage would be:
import Image from 'next/image'

function OptimizedImage({ src, alt, className }: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={className}
      // Currently: unoptimized={true} in next.config.mjs
    />
  )
}

// For static export, use regular img tags with manual optimization
function StaticImage({ src, alt, className }: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("max-w-full h-auto", className)}
      loading="lazy"
    />
  )
}
```

## Code Organization Patterns

### Custom Hooks Pattern
```typescript
// Extract reusable logic into custom hooks
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = React.useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}
```

### Utility Function Patterns
```typescript
// lib/utils.ts - Common utility patterns
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
) {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }
}

// Type-safe object key checking
export function hasOwnProperty<T extends Record<string, any>, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, any> {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
```

### Context Pattern Implementation
```typescript
// Comprehensive context pattern
interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ 
  children,
  defaultTheme = 'light'
}: {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark'
}) {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', defaultTheme)

  const toggleTheme = React.useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }, [setTheme])

  // Apply theme to document
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const value = React.useMemo(() => ({
    theme,
    setTheme,
    toggleTheme
  }), [theme, setTheme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## See Also

- [Technology Stack](./technology-stack.md) - TypeScript and tooling configuration
- [Architecture Guidelines](./architecture-guidelines.md) - How patterns fit into the overall architecture
- [Component System](./component-system.md) - Component-specific patterns and conventions
- [Best Practices](./best-practices.md) - Quality guidelines and code standards
- [Troubleshooting](./troubleshooting.md) - Common TypeScript and pattern-related issues

---

*These patterns ensure consistency, maintainability, and performance across the entire codebase. Follow these conventions to maintain code quality and developer experience.*