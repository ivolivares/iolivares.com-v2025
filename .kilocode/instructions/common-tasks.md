# Common Tasks

> Step-by-step guides for frequent development tasks and workflows

## Adding a New Page

### Step 1: Create the Page File
```bash
# Create the page directory and file
mkdir -p app/new-page
touch app/new-page/page.tsx
```

### Step 2: Implement the Page Component
```typescript
// app/new-page/page.tsx
import { Metadata } from 'next'
import { useTranslation } from '@/hooks/use-translation'

export const metadata: Metadata = {
  title: 'New Page | Iván Olivares Rojas',
  description: 'Description of the new page',
}

export default function NewPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          New Page Title
        </h1>
        <p className="text-lg text-muted-foreground">
          Page description or subtitle
        </p>
      </header>
      
      <main className="space-y-8">
        {/* Page content */}
      </main>
    </div>
  )
}
```

### Step 3: Add Navigation Item
```typescript
// components/navigation.tsx
const navigationItems = [
  { href: '/', label: 'nav.home', current: pathname === '/' },
  { href: '/thoughts', label: 'nav.thoughts', current: pathname.startsWith('/thoughts') },
  { href: '/new-page', label: 'nav.new_page', current: pathname === '/new-page' }, // Add this line
  // ... other items
]
```

### Step 4: Add Translations
```json
// public/locales/en.json
{
  "nav": {
    "home": "HOME",
    "thoughts": "THOUGHTS",
    "new_page": "NEW PAGE"
  }
}

// public/locales/es.json
{
  "nav": {
    "home": "INICIO",
    "thoughts": "REFLEXIONES", 
    "new_page": "PÁGINA NUEVA"
  }
}
```

### Step 5: Update Command Palette (Optional)
```typescript
// components/command-palette.tsx - Add new page to search results
const pages = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Thoughts', href: '/thoughts', icon: BookOpen },
  { name: 'New Page', href: '/new-page', icon: FileText }, // Add this line
]
```

### Step 6: Test the Page
```bash
# Start development server
pnpm run dev

# Navigate to http://localhost:3000/new-page
# Test navigation menu
# Test command palette search
# Test responsive design
```

## Adding a New Component

### Step 1: Create Component File
```bash
# Feature component
touch components/my-new-component.tsx

# Or UI component (extend shadcn/ui)
touch components/ui/my-ui-component.tsx
```

### Step 2: Implement Component with TypeScript
```typescript
// components/my-new-component.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface MyNewComponentProps {
  title: string
  description?: string
  variant?: 'default' | 'highlighted'
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export function MyNewComponent({
  title,
  description,
  variant = 'default',
  className,
  children,
  onClick,
}: MyNewComponentProps) {
  return (
    <div
      className={cn(
        "p-6 border rounded-lg transition-colors",
        {
          'bg-background hover:bg-accent': variant === 'default',
          'bg-accent border-primary': variant === 'highlighted',
        },
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </div>
  )
}
```

### Step 3: Add forwardRef (If Needed)
```typescript
// For components that need DOM ref access
export const MyNewComponent = React.forwardRef<
  HTMLDivElement,
  MyNewComponentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("component-styles", className)}
      {...props}
    />
  )
})
MyNewComponent.displayName = "MyNewComponent"
```

### Step 4: Export Component
```typescript
// If creating an index file for organized exports
// components/index.ts
export { MyNewComponent } from './my-new-component'
export { OtherComponent } from './other-component'
```

### Step 5: Use Component in Pages
```typescript
// app/some-page/page.tsx
import { MyNewComponent } from '@/components/my-new-component'

export default function SomePage() {
  return (
    <div>
      <MyNewComponent
        title="Example Usage"
        description="This shows how to use the component"
        variant="highlighted"
        onClick={() => console.log('Clicked!')}
      >
        <p>Additional content inside component</p>
      </MyNewComponent>
    </div>
  )
}
```

## Adding shadcn/ui Components

### Step 1: Browse Available Components
```bash
# View all available shadcn/ui components
pnpm dlx shadcn-ui add --help

# Or visit: https://ui.shadcn.com/docs/components
```

### Step 2: Install Components
```bash
# Install a single component
pnpm dlx shadcn-ui add button

# Install multiple components
pnpm dlx shadcn-ui add card dialog sheet tabs

# Install with specific configuration (if needed)
pnpm dlx shadcn-ui add button --overwrite
```

### Step 3: Verify Installation
```bash
# Check that component files were created
ls components/ui/

# Example output:
# button.tsx  card.tsx  dialog.tsx  sheet.tsx  tabs.tsx
```

### Step 4: Use in Your Components
```typescript
// Import and use the shadcn/ui component
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ExampleUsage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Card content goes here.</p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                Dialog description goes here.
              </DialogDescription>
            </DialogHeader>
            <p>Dialog content...</p>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
```

### Step 5: Customize (If Needed)
```typescript
// Create wrapper components for customization
// components/custom-card.tsx
import { Card, CardProps } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CustomCardProps extends CardProps {
  variant?: 'default' | 'elevated' | 'interactive'
}

export function CustomCard({ 
  variant = 'default', 
  className, 
  ...props 
}: CustomCardProps) {
  return (
    <Card
      className={cn(
        {
          'shadow-lg': variant === 'elevated',
          'hover:shadow-md transition-shadow cursor-pointer': variant === 'interactive',
        },
        className
      )}
      {...props}
    />
  )
}
```

## Adding Translations

### Step 1: Add Translation Keys
```json
// public/locales/en.json
{
  "common": {
    "submit": "Submit",
    "cancel": "Cancel",
    "loading": "Loading...",
    "success": "Success!",
    "error": "An error occurred"
  },
  "new_feature": {
    "title": "New Feature Title",
    "description": "Description of the new feature",
    "cta": "Try it now",
    "benefits": [
      "First benefit",
      "Second benefit",
      "Third benefit"
    ]
  }
}
```

### Step 2: Add Spanish Translations
```json
// public/locales/es.json
{
  "common": {
    "submit": "Enviar",
    "cancel": "Cancelar", 
    "loading": "Cargando...",
    "success": "¡Éxito!",
    "error": "Ocurrió un error"
  },
  "new_feature": {
    "title": "Título de Nueva Funcionalidad",
    "description": "Descripción de la nueva funcionalidad",
    "cta": "Pruébalo ahora",
    "benefits": [
      "Primer beneficio",
      "Segundo beneficio",
      "Tercer beneficio"
    ]
  }
}
```

### Step 3: Use Translations in Components
```typescript
// components/new-feature.tsx
import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'

export function NewFeature() {
  const { t } = useTranslation()

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold">
        {t('new_feature.title')}
      </h2>
      
      <p className="text-muted-foreground">
        {t('new_feature.description')}
      </p>
      
      <ul className="space-y-2">
        <li>{t('new_feature.benefits.0')}</li>
        <li>{t('new_feature.benefits.1')}</li>
        <li>{t('new_feature.benefits.2')}</li>
      </ul>
      
      <Button>
        {t('new_feature.cta')}
      </Button>
    </div>
  )
}
```

### Step 4: Handle Loading States
```typescript
// Component with translation loading handling
export function TranslatedComponent() {
  const { t, isLoading } = useTranslation()

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
    )
  }

  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description')}</p>
    </div>
  )
}
```

### Step 5: Test Translations
```bash
# Start development server
pnpm run dev

# Test language switching in browser
# Verify all new keys display correctly
# Check fallback behavior for missing translations
# Test responsive design with longer translated text
```

## Styling Components

### Step 1: Use Design Tokens
```typescript
// Use semantic color classes
<div className="bg-background text-foreground border-border">
  <h2 className="text-primary">Heading</h2>
  <p className="text-muted-foreground">Description</p>
  <Button variant="default">Primary Action</Button>
</div>
```

### Step 2: Apply Responsive Utilities
```typescript
// Mobile-first responsive design
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    Responsive Heading
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Grid items */}
  </div>
</div>
```

### Step 3: Add Interactive States
```typescript
// Comprehensive interactive styling
<button className={cn(
  "px-4 py-2 rounded-md font-medium",
  "bg-primary text-primary-foreground",
  "hover:bg-primary/90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "active:scale-95 transition-all",
  "disabled:opacity-50 disabled:cursor-not-allowed"
)}>
  Interactive Button
</button>
```

### Step 4: Use Conditional Styling
```typescript
// Conditional classes with cn utility
function StatusBadge({ 
  status 
}: { 
  status: 'success' | 'warning' | 'error' 
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          'bg-success/10 text-success border border-success/20': 
            status === 'success',
          'bg-warning/10 text-warning border border-warning/20': 
            status === 'warning',
          'bg-destructive/10 text-destructive border border-destructive/20': 
            status === 'error',
        }
      )}
    >
      {status}
    </span>
  )
}
```

### Step 5: Create Component Variants
```typescript
// Using CVA for systematic variants
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      variant: {
        default: "border-border",
        elevated: "shadow-lg",
        interactive: "hover:shadow-md cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, size, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ size, variant }), className)}
      {...props}
    />
  )
}
```

## Managing Content

### Step 1: Add New Blog Post (Inline Method)
```typescript
// lib/markdown.ts - Add to posts array
const newPost: Post = {
  slug: "new-post-slug", 
  title: "My New Post Title",
  date: "2024-01-25",
  readTime: "5 min",
  excerpt: "A brief description of what this post is about...",
  tags: ["Web Development", "TypeScript", "React"],
  published: true,
  content: `
# My New Post Title

This is the introduction to my new blog post.

## Section 1

Content for the first section...

## Section 2

Content for the second section...

## Conclusion

Wrapping up the post...
  `
}

// Add to the posts array
const posts: Post[] = [
  newPost,
  // ... existing posts
]
```

### Step 2: Add New Blog Post (File Method)
```bash
# Create new markdown file
touch content/thoughts/my-new-post.md
```

```markdown
---
title: "My New Post Title"
date: "2024-01-25"
readTime: "5 min"
excerpt: "A brief description of what this post is about..."
tags: ["Web Development", "TypeScript", "React"]
published: true
---

# My New Post Title

This is the introduction to my new blog post.

## Section 1

Content for the first section...

## Section 2

Content for the second section...

## Conclusion

Wrapping up the post...
```

### Step 3: Generate Post Metadata
```typescript
// Use utility functions for consistency
import { generateSlug, calculateReadTime, extractExcerpt } from '@/lib/content-utils'

const title = "My New Post Title"
const content = `# My New Post Title\n\nPost content...`

const postData = {
  slug: generateSlug(title),
  title,
  date: new Date().toISOString().split('T')[0],
  readTime: calculateReadTime(content),
  excerpt: extractExcerpt(content, 160),
  tags: ["Web Development", "TypeScript"],
  published: false, // Set to true when ready
  content
}
```

### Step 4: Test Content Display
```bash
# Start development server
pnpm run dev

# Navigate to /thoughts to see post list
# Click on post to view full content  
# Test markdown rendering
# Verify metadata display
# Check responsive design
```

### Step 5: Update SEO and Metadata
```typescript
// app/thoughts/[slug]/page.tsx - Ensure generateMetadata is working
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }
  
  return {
    title: `${post.title} | Iván Olivares Rojas`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}
```

## Development Workflow

### Setting Up Development Environment
```bash
# Clone and setup
git clone <repository-url>
cd project-directory

# Install dependencies (pnpm required)
pnpm install

# Start development server
pnpm run dev

# Open browser to http://localhost:3000
```

### Making Changes
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
pnpm run dev

# Type check
pnpm run lint

# Build test
pnpm run build

# Commit changes
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Testing Checklist
- [ ] Component renders correctly
- [ ] Responsive design works on all screen sizes
- [ ] Dark/light mode compatibility
- [ ] Keyboard navigation works
- [ ] Screen reader accessibility
- [ ] TypeScript compilation passes
- [ ] Both English and Spanish translations
- [ ] Loading states display properly
- [ ] Error states handle gracefully

## Quick Reference

### Essential Commands
```bash
# Development
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run lint         # Type checking

# shadcn/ui
pnpm dlx shadcn-ui add <component>  # Add UI component

# Project structure
mkdir app/page-name             # New page
touch components/component.tsx  # New component
```

### Common Imports
```typescript
// Core Next.js and React
import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// UI Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Hooks and Utils
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'

// Icons
import { Search, Menu, X } from 'lucide-react'
```

### File Naming Conventions
```
app/page-name/page.tsx          # Pages (kebab-case)
components/component-name.tsx   # Components (kebab-case files)
hooks/use-hook-name.tsx         # Hooks (use- prefix)
lib/utility-functions.ts        # Utilities (kebab-case)
```

## See Also

- [Architecture Guidelines](./architecture-guidelines.md) - Project structure and organization
- [Development Patterns](./development-patterns.md) - TypeScript and coding patterns
- [Component System](./component-system.md) - shadcn/ui component usage
- [Styling Guidelines](./styling-guidelines.md) - Tailwind CSS and design patterns
- [Content Management](./content-management.md) - Blog post management
- [Internationalization](./internationalization.md) - Translation management
- [Troubleshooting](./troubleshooting.md) - Solutions to common issues

---

*These step-by-step guides cover the most frequent development tasks. Follow these workflows to maintain consistency and quality across the project.*