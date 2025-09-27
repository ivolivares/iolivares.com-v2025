# Best Practices

> Do's and don'ts, code quality guidelines, and development standards

## Development Principles

### Core Values
- **Performance First**: Every decision should consider performance impact
- **Accessibility Focused**: Build for all users, not just those without disabilities
- **Type Safety**: Leverage TypeScript's full potential for error prevention
- **Developer Experience**: Write code that is easy to read, understand, and maintain
- **Progressive Enhancement**: Start with basics and enhance for modern browsers

### Project Philosophy
- Prefer explicit over implicit
- Convention over configuration
- Composition over inheritance
- Fail fast and fail visibly
- Optimize for change, not just current requirements

## Code Quality Standards

### TypeScript Best Practices

#### Do's ✅
```typescript
// Use explicit typing for better documentation and safety
interface ComponentProps {
  title: string
  description?: string
  onSubmit: (data: FormData) => void
}

// Prefer interfaces over types for object shapes
interface User {
  id: string
  name: string
  email: string
}

// Use proper error handling with typed errors
try {
  const data = await fetchData()
  setData(data)
} catch (error) {
  console.error('Failed to fetch data:', error)
  if (error instanceof Error) {
    setError(error.message)
  } else {
    setError('An unknown error occurred')
  }
}

// Use type guards for runtime type checking
function isString(value: unknown): value is string {
  return typeof value === "string"
}

// Prefer const assertions for immutable data
const themes = ['light', 'dark', 'system'] as const
type Theme = typeof themes[number] // 'light' | 'dark' | 'system'
```

#### Don'ts ❌
```typescript
// Don't use 'any' - defeats the purpose of TypeScript
function processData(data: any) { // ❌ Don't do this
  return data.someProperty
}

// Don't ignore TypeScript errors with @ts-ignore
// @ts-ignore ❌ Don't do this
const result = someUntypedFunction()

// Don't use function declarations in component files (prefer const)
function MyComponent() { // ❌ Prefer const with arrow functions
  return <div />
}

// Don't mutate props or state directly
props.items.push(newItem) // ❌ Don't mutate props
state.count++ // ❌ Don't mutate state directly
```

### React Component Best Practices

#### Do's ✅
```typescript
// Use meaningful component names
export function UserProfileCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

// Implement proper loading states
function DataComponent() {
  const { data, loading, error } = useData()
  
  if (loading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <DataDisplay data={data} />
}

// Use React Server Components by default
async function ServerComponent() {
  const posts = await getAllPosts() // Server-side data fetching
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

// Memoize expensive calculations
function ExpensiveComponent({ items }: { items: Item[] }) {
  const processedItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .sort((a, b) => a.priority - b.priority)
      .map(item => ({ ...item, computed: expensiveCalculation(item) }))
  }, [items])

  return <ItemsList items={processedItems} />
}

// Use proper forwardRef for DOM elements
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn("input-styles", className)}
      {...props}
    />
  )
})
```

#### Don'ts ❌
```typescript
// Don't use inline objects in JSX (causes unnecessary re-renders)
function MyComponent() {
  return (
    <div style={{ marginTop: 10 }}> {/* ❌ Creates new object each render */}
      <ChildComponent config={{ option: true }} /> {/* ❌ Same issue */}
    </div>
  )
}

// Don't forget to handle edge cases
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => ( // ❌ What if users is undefined or empty?
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// Don't use indexes as keys for dynamic lists
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li> {/* ❌ Use todo.id instead */}
      ))}
    </ul>
  )
}
```

### Performance Best Practices

#### Do's ✅
```typescript
// Use React Server Components for static content
async function BlogPostPage({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug) // Server-side
  
  return (
    <article>
      <h1>{post.title}</h1>
      <MarkdownRenderer content={post.content} />
    </article>
  )
}

// Implement proper code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})

// Use transforms for animations (better for performance)
.animate-slide {
  transform: translateX(-100%);
  transition: transform 300ms ease-out;
}

.animate-slide.active {
  transform: translateX(0);
}

// Optimize bundle size with proper imports
import { Button } from '@/components/ui/button' // ✅ Specific import
import { debounce } from '@/lib/utils' // ✅ Tree-shakable
```

#### Don'ts ❌
```typescript
// Don't import entire libraries when you need just one function
import * as _ from 'lodash' // ❌ Imports entire library
const debouncedFn = _.debounce(fn, 300)

// Don't use unnecessary useEffect
function Component({ value }: { value: string }) {
  const [uppercased, setUppercased] = useState('')
  
  useEffect(() => { // ❌ Unnecessary useEffect
    setUppercased(value.toUpperCase())
  }, [value])
  
  // ✅ Better: derive state directly
  const uppercased = value.toUpperCase()
}

// Don't animate properties that cause layout/paint
.animate-width {
  transition: width 300ms; // ❌ Causes layout recalculation
}

// ✅ Better: animate transform instead
.animate-scale {
  transition: transform 300ms;
}
```

## Styling Best Practices

### CSS and Tailwind

#### Do's ✅
```css
/* Use design tokens consistently */
.component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

/* Follow mobile-first responsive design */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile first */
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop */
  }
}

/* Use semantic class names */
.card-elevated {
  @apply shadow-lg hover:shadow-xl transition-shadow;
}
```

#### Don'ts ❌
```css
/* Don't hardcode colors */
.component {
  background-color: #ffffff; /* ❌ Use design tokens instead */
  color: #000000; /* ❌ Use --foreground instead */
}

/* Don't use !important unless absolutely necessary */
.override {
  color: red !important; /* ❌ Avoid if possible */
}

/* Don't use inline styles */
<div style="margin-top: 20px; color: blue;"> /* ❌ Use classes */
```

#### TypeScript Styling Patterns
```typescript
// Use cn utility for conditional styling
function Alert({ variant, className }: AlertProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-md border",
        {
          'bg-destructive/10 text-destructive border-destructive/20': variant === 'error',
          'bg-warning/10 text-warning border-warning/20': variant === 'warning',
          'bg-success/10 text-success border-success/20': variant === 'success',
        },
        className
      )}
    />
  )
}

// Use CVA for systematic component variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

## Accessibility Best Practices

### Do's ✅
```typescript
// Provide proper ARIA labels
<button
  aria-label="Close dialog"
  onClick={onClose}
>
  <X className="h-4 w-4" />
</button>

// Use semantic HTML elements
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// Implement proper focus management
function Modal({ isOpen, onClose }: ModalProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus()
    }
  }, [isOpen])
  
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content>
        <button ref={firstFocusableRef} onClick={onClose}>
          Close
        </button>
      </Dialog.Content>
    </Dialog.Root>
  )
}

// Use proper heading hierarchy
<main>
  <h1>Page Title</h1>
  <section>
    <h2>Section Title</h2>
    <h3>Subsection Title</h3>
  </section>
</main>
```

### Don't ❌
```typescript
// Don't rely only on color for information
<span style={{ color: 'red' }}>Error</span> // ❌ Screen readers can't detect color

// ✅ Better: include text or icons
<span className="text-destructive">
  <AlertCircle className="h-4 w-4 inline mr-2" />
  Error: Invalid input
</span>

// Don't skip heading levels
<h1>Main Title</h1>
<h3>Subsection</h3> // ❌ Skipped h2

// Don't use div for interactive elements
<div onClick={handleClick}>Click me</div> // ❌ Not keyboard accessible

// ✅ Use button instead
<button onClick={handleClick}>Click me</button>
```

## Internationalization Best Practices

### Do's ✅
```typescript
// Use hierarchical translation keys
t('nav.home')
t('forms.validation.required')
t('errors.network.timeout')

// Handle loading states properly
function TranslatedContent() {
  const { t, isLoading } = useTranslation()
  
  if (isLoading) {
    return <Skeleton className="h-6 w-32" />
  }
  
  return <h1>{t('page.title')}</h1>
}

// Use proper fallbacks
function SafeTranslation({ 
  key, 
  fallback, 
  variables 
}: TranslationProps) {
  const { t } = useTranslation()
  
  return (
    <span>
      {t(key, { fallback, variables })}
    </span>
  )
}

// Consider text expansion in UI design
<Button className="min-w-[120px]"> // Account for longer translations
  {t('forms.submit')}
</Button>
```

### Don'ts ❌
```typescript
// Don't hardcode strings
<h1>Welcome to our website</h1> // ❌ Not translatable

// Don't forget to provide translations for both languages
{
  "en": { "welcome": "Welcome" },
  "es": { /* missing translation */ } // ❌ Missing Spanish
}

// Don't assume text length will be the same
<div className="w-20"> // ❌ May truncate longer translations
  {t('forms.submit')}
</div>
```

## Content Management Best Practices

### Do's ✅
```typescript
// Use proper content validation
const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  published: z.boolean().default(false)
})

// Implement proper SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }
  
  return {
    title: `${post.title} | Site Name`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    }
  }
}

// Use consistent content structure
interface Post {
  slug: string        // URL identifier
  title: string       // Display title
  date: string        // ISO date string
  readTime: string    // "X min"
  excerpt: string     // Meta description
  tags?: string[]     // Categorization
  published: boolean  // Visibility control
  content: string     // Markdown content
}
```

### Don'ts ❌
```typescript
// Don't skip content validation
function getPostBySlug(slug: string) {
  return posts.find(p => p.slug === slug) // ❌ No validation
}

// Don't forget about SEO
export default function PostPage() { // ❌ Missing generateMetadata
  return <article>...</article>
}
```

## Security Best Practices

### Do's ✅
```typescript
// Sanitize user input
import DOMPurify from 'dompurify'

function UserContent({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}

// Use proper environment variable handling
const apiKey = process.env.NEXT_PUBLIC_API_KEY
if (!apiKey) {
  throw new Error('API key is required')
}

// Validate API responses
function processApiResponse(response: unknown) {
  if (!isValidApiResponse(response)) {
    throw new Error('Invalid API response format')
  }
  return response
}
```

### Don'ts ❌
```typescript
// Don't expose sensitive data to client
const config = {
  apiKey: process.env.SECRET_API_KEY, // ❌ Will be exposed to client
  publicKey: process.env.NEXT_PUBLIC_KEY // ✅ Safe for client
}

// Don't trust user input
function UserProfile({ userId }: { userId: string }) {
  // ❌ Direct database query without validation
  const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)
}
```

## Git and Version Control

### Do's ✅
```bash
# Use meaningful commit messages
git commit -m "feat: add user authentication system

- Implement login/logout functionality
- Add JWT token validation
- Create protected route wrapper
- Add user session management

Fixes #123"

# Use feature branches
git checkout -b feature/user-authentication
git checkout -b bugfix/translation-loading
git checkout -b refactor/component-structure
```

### Don'ts ❌
```bash
# Don't use vague commit messages
git commit -m "fix stuff" # ❌ Not descriptive
git commit -m "wip" # ❌ Not meaningful

# Don't commit directly to main
git checkout main
git commit -m "changes" # ❌ Use feature branches
```

## Documentation Standards

### Do's ✅
```typescript
/**
 * Formats a date string for display in the specified locale
 * 
 * @param date - ISO date string (YYYY-MM-DD)
 * @param locale - Locale identifier (e.g., 'en-US', 'es-ES')
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 * 
 * @example
 * formatDate('2024-01-15', 'en-US') // "January 15, 2024"
 * formatDate('2024-01-15', 'es-ES') // "15 de enero de 2024"
 */
export function formatDate(
  date: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  })
}

// Document component props clearly
interface UserCardProps {
  /** User object containing profile information */
  user: User
  /** Whether to show the user's email address */
  showEmail?: boolean
  /** Callback fired when user card is clicked */
  onClick?: (user: User) => void
  /** Additional CSS classes to apply */
  className?: string
}
```

## Performance Monitoring

### Do's ✅
```typescript
// Monitor Core Web Vitals
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
}, [])

// Use React Profiler for performance debugging
function ProfiledApp() {
  const onRenderCallback = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number
  ) => {
    console.log('Profiler:', { id, phase, actualDuration })
  }

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <App />
    </Profiler>
  )
}
```

## Error Handling Standards

### Do's ✅
```typescript
// Create comprehensive error boundaries
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo)
    // Send to error reporting service
    reportError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
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

// Implement proper async error handling
async function fetchWithRetry<T>(
  url: string, 
  options: RequestInit = {},
  retries = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      if (i === retries - 1) {
        throw error
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
    }
  }
  
  throw new Error('Max retries exceeded')
}
```

## Summary Guidelines

### Essential Rules
1. **Use pnpm exclusively** - Required package manager
2. **Follow TypeScript strict mode** - Enable all type checking
3. **Design tokens first** - Use CSS custom properties
4. **Mobile-first responsive** - Start small, enhance up
5. **Accessibility is mandatory** - Not optional
6. **Server Components default** - Use client components sparingly
7. **Test internationalization** - Both English and Spanish
8. **Handle loading/error states** - Never leave users guessing
9. **Semantic HTML always** - Screen readers and SEO matter
10. **Performance is a feature** - Monitor and optimize regularly

### Quality Checklist
Before submitting any code, ensure:
- [ ] TypeScript compilation passes without errors
- [ ] All interactive elements are keyboard accessible
- [ ] Both light and dark themes work correctly
- [ ] Responsive design works on all screen sizes
- [ ] Loading states are implemented
- [ ] Error states are handled gracefully
- [ ] Translations exist for both languages
- [ ] Code follows established patterns
- [ ] Performance impact is considered
- [ ] Documentation is updated if needed

## See Also

- [Architecture Guidelines](./architecture-guidelines.md) - Structural best practices
- [Development Patterns](./development-patterns.md) - TypeScript and coding patterns
- [Component System](./component-system.md) - Component development standards
- [Styling Guidelines](./styling-guidelines.md) - CSS and design best practices
- [Common Tasks](./common-tasks.md) - How to implement features correctly
- [Troubleshooting](./troubleshooting.md) - Avoiding common mistakes

---

*These best practices ensure consistent, maintainable, and high-quality code across the entire project. They represent lessons learned and standards that make development more predictable and reliable.*