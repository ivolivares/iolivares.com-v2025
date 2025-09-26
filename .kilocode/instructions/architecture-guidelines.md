# Architecture Guidelines

> File structure, app organization, routing patterns, and architectural principles

## Project File Structure

```
/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & design tokens
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   └── [routes]/          # File-based routing
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   ├── command-palette.tsx
│   └── [feature-components]
├── contexts/             # React Context providers
│   └── translation-context.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   ├── utils.ts         # Tailwind merge utilities
│   ├── markdown.ts      # Content management
│   └── talks-data.ts    # Static data
├── public/              # Static assets
│   ├── locales/         # Translation files
│   └── [images]         # Image assets
├── styles/              # Additional stylesheets
└── instructions/        # Development documentation
```

## Directory Responsibilities

### `/app` - Next.js App Router
- **Purpose**: Page routes, layouts, and server-side logic
- **Pattern**: File-based routing with nested layouts
- **Key Files**:
  - `layout.tsx` - Root layout with providers and global configuration
  - `page.tsx` - Route components following React Server Component patterns
  - `globals.css` - Global styles and CSS design tokens

### `/components` - Reusable Components
- **Purpose**: All React components organized by scope
- **Structure**:
  - `/ui` - shadcn/ui components (DO NOT MODIFY directly)
  - Root level - Custom application components
- **Naming**: PascalCase for components, kebab-case for files

### `/contexts` - React Context Providers
- **Purpose**: Global state management and provider logic
- **Pattern**: One file per context with hooks for consumption
- **Example**: `translation-context.tsx` for internationalization

### `/hooks` - Custom React Hooks
- **Purpose**: Reusable stateful logic
- **Naming**: camelCase starting with 'use'
- **Pattern**: Export hook function and related types

### `/lib` - Utilities and Configuration
- **Purpose**: Business logic, utilities, and data management
- **Key Files**:
  - `utils.ts` - Tailwind class merging and general utilities
  - `markdown.ts` - Content management and blog post logic
  - `talks-data.ts` - Static data definitions

### `/public` - Static Assets
- **Purpose**: Publicly accessible files served directly
- **Structure**:
  - `/locales` - Translation JSON files
  - Root level - Images, icons, and static assets
- **Optimization**: Images configured as unoptimized for static export

### `/styles` - Additional Stylesheets
- **Purpose**: Component-specific or utility CSS files
- **Usage**: Supplement to Tailwind CSS when needed

## Component Architecture

### Composition Over Inheritance
```typescript
// Prefer composition patterns
interface CardProps {
  children: React.ReactNode
  className?: string
}

function Card({ children, className }: CardProps) {
  return (
    <div className={cn("card-base-styles", className)}>
      {children}
    </div>
  )
}

// Compose complex components
function PostCard({ post }: { post: Post }) {
  return (
    <Card className="post-specific-styles">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>{post.excerpt}</CardContent>
    </Card>
  )
}
```

### Server Components by Default
```typescript
// Default: Server Component (no "use client")
async function PostList() {
  const posts = await getAllPosts() // Server-side data fetching
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

// Client Component only when needed
"use client"
import { useState } from 'react'

function InteractiveSearch() {
  const [query, setQuery] = useState('')
  // Client-side interactivity
}
```

### Type-Safe Props
```typescript
// Strict TypeScript interfaces for all components
interface NavigationProps {
  currentPath: string
  className?: string
  onNavigate?: (path: string) => void
}

// Extend HTML element props when appropriate
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"
  size?: "default" | "sm" | "lg"
  loading?: boolean
}
```

### Accessibility First
```typescript
// Use Radix UI primitives for accessibility
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

function CommandPalette() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button aria-label="Open command palette">
          <Search className="h-4 w-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <VisuallyHidden.Root>
          <Dialog.Title>Command Palette</Dialog.Title>
        </VisuallyHidden.Root>
        {/* Accessible content */}
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

## State Management

### React Context for Global State
```typescript
// Translation context example
interface TranslationContextType {
  t: (key: string) => string
  language: string
  setLanguage: (lang: string) => void
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  // Provider implementation
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}
```

### Local Component State
```typescript
// useState/useEffect for local state
function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  
  useEffect(() => {
    const searchPosts = async () => {
      if (query.trim()) {
        const searchResults = await performSearch(query)
        setResults(searchResults)
      } else {
        setResults([])
      }
    }
    
    const debounced = debounce(searchPosts, 300)
    debounced()
  }, [query])
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search posts..."
    />
  )
}
```

### Custom Hooks for Reusable Logic
```typescript
// Extract reusable stateful logic
function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const data = await getAllPosts()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  return { posts, loading, error }
}
```

## Routing Architecture

### File-Based Routing
```
app/
├── page.tsx                    # / (homepage)
├── layout.tsx                  # Root layout
├── thoughts/
│   ├── page.tsx               # /thoughts
│   └── [slug]/
│       └── page.tsx           # /thoughts/[slug]
├── talks/
│   └── page.tsx               # /talks
└── connect/
    └── page.tsx               # /connect
```

### Layout Hierarchy
```typescript
// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <TranslationProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  )
}

// app/thoughts/layout.tsx - Nested layout (if needed)
export default function ThoughtsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1>Thoughts & Blog Posts</h1>
      </header>
      {children}
    </div>
  )
}
```

### Dynamic Routes
```typescript
// app/thoughts/[slug]/page.tsx
interface PageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
      </header>
      <MarkdownRenderer content={post.content} />
    </article>
  )
}

// Generate static params for build time
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

## Performance Architecture

### Code Splitting Strategy
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const CommandPalette = dynamic(() => import('./command-palette'), {
  ssr: false, // Client-side only
  loading: () => <div>Loading...</div>
})

// Route-level splitting happens automatically with App Router
```

### Data Fetching Patterns
```typescript
// Server Components for data fetching
async function PostsList() {
  const posts = await getAllPosts() // Happens on server
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

// Client-side data fetching when needed
"use client"
function InteractivePostsList() {
  const { posts, loading } = usePosts()
  
  if (loading) return <PostsListSkeleton />
  
  return <PostsList posts={posts} />
}
```

## Error Boundaries and Loading States

### Error Handling Architecture
```typescript
// app/error.tsx - Route-level error boundary
"use client"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Try again
      </button>
    </div>
  )
}

// app/loading.tsx - Route-level loading UI
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  )
}
```

## File Organization Patterns

### Directory Conventions
- **app/**: Next.js App Router pages and layouts
- **components/ui/**: shadcn/ui components (don't modify)
- **components/**: Custom application components
- **contexts/**: React Context providers
- **hooks/**: Custom React hooks
- **lib/**: Utilities, configurations, and data
- **public/**: Static assets and translation files

### Naming Conventions
```typescript
// Files: kebab-case
command-palette.tsx
translation-context.tsx
use-translation.tsx

// Components: PascalCase
export default function CommandPalette() {}
export function PostCard() {}

// Hooks: camelCase starting with 'use'
export function useTranslation() {}
export function usePosts() {}

// Utilities: camelCase
export function formatDate() {}
export function cn() {}

// Constants: UPPER_SNAKE_CASE
const DEFAULT_LOCALE = 'en'
const API_BASE_URL = 'https://api.example.com'
```

## See Also

- [Technology Stack](./technology-stack.md) - The frameworks and tools that enable this architecture
- [Development Patterns](./development-patterns.md) - TypeScript and coding patterns used throughout
- [Component System](./component-system.md) - shadcn/ui integration and component patterns
- [Common Tasks](./common-tasks.md) - How to add new pages, components, and features
- [Best Practices](./best-practices.md) - Architectural best practices and guidelines

---

*This architecture emphasizes performance, maintainability, and developer experience through clear separation of concerns and consistent patterns.*