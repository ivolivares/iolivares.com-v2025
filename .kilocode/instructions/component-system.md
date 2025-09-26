# Component System

> shadcn/ui components, patterns, variants, accessibility, and component development guidelines

## shadcn/ui Configuration

### Project Configuration
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",        // Component variant style
  "rsc": true,               // React Server Components support
  "tsx": true,               // TypeScript support
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",   // Base color palette
    "cssVariables": true,     // CSS custom properties for theming
    "prefix": ""              // No utility prefix
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Installation and Setup
```bash
# Install new shadcn/ui components (use pnpm)
pnpm dlx shadcn-ui add [component-name]

# Example: Add multiple components
pnpm dlx shadcn-ui add button card dialog sheet

# Components are automatically configured for this project:
# - New York style variant
# - TypeScript enabled
# - Tailwind CSS variables
# - Accessibility-first (Radix UI primitives)
```

## Core Component Patterns

### forwardRef Pattern
```typescript
// Standard shadcn/ui component pattern with forwardRef
import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Compound Component Pattern
```typescript
// Card component with multiple sub-components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

### Custom Component Implementation
```typescript
// Feature-specific components following shadcn/ui patterns
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags?: string[]
  slug: string
  className?: string
}

export function PostCard({
  title,
  excerpt,
  date,
  readTime,
  tags,
  slug,
  className
}: PostCardProps) {
  return (
    <Card className={cn("group cursor-pointer transition-all hover:shadow-md", className)}>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-3 w-3" />
          <time dateTime={date}>{formatDate(date)}</time>
          <Clock className="h-3 w-3 ml-2" />
          <span>{readTime}</span>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {excerpt}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Button variant="ghost" size="sm" className="p-0 h-auto">
          Read more →
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Accessibility Implementation

### ARIA Labels and Roles
```typescript
// Proper accessibility implementation with Radix UI primitives
import * as Dialog from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react"

export function CommandPalette() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Open command palette"
          className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        >
          <Search className="h-4 w-4 mr-2" />
          Search...
        </Button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
          
          <VisuallyHidden.Root>
            <Dialog.Title>Command Palette</Dialog.Title>
            <Dialog.Description>
              Search and navigate through the site
            </Dialog.Description>
          </VisuallyHidden.Root>
          
          <div className="flex items-center border-b pb-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
              aria-label="Search commands"
            />
          </div>
          
          <Dialog.Close asChild>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-4"
              aria-label="Close command palette"
            >
              <X className="h-4 w-4" />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### Keyboard Navigation
```typescript
// Proper keyboard navigation implementation
import { useState, useRef, useEffect } from "react"

interface NavigationMenuProps {
  items: Array<{
    label: string
    href: string
    current?: boolean
  }>
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : items.length - 1
        )
        break
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        event.preventDefault()
        setFocusedIndex(items.length - 1)
        break
      case 'Escape':
        setFocusedIndex(-1)
        break
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <ul className="flex space-x-8">
        {items.map((item, index) => (
          <li key={item.href}>
            <a
              ref={el => itemRefs.current[index] = el}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                item.current 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}
              aria-current={item.current ? "page" : undefined}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

## Variant System with CVA

### Class Variance Authority (CVA)
```typescript
// Creating variants with class-variance-authority
import { cva, type VariantProps } from "class-variance-authority"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
        success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

export { Alert, alertVariants }
```

### Custom Variant Examples
```typescript
// Badge component with custom variants
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants specific to this project
        tag: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        status: "border-transparent bg-success text-success-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Usage with custom variants
<Badge variant="tag">React</Badge>
<Badge variant="status">Published</Badge>
```

## Component Directory Structure

### Organization Pattern
```
components/
├── ui/                        # shadcn/ui components (DO NOT MODIFY)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── [other-shadcn-components]
├── navigation.tsx             # Custom navigation component
├── command-palette.tsx        # Feature-specific component
├── markdown-renderer.tsx      # Content rendering component
├── theme-provider.tsx         # Context provider component
└── [other-feature-components]
```

### Component File Pattern
```typescript
// Standard component file structure
import React from "react"
import { cn } from "@/lib/utils"

// Types and interfaces
interface ComponentProps {
  // Props definition
}

// Component implementation
export function ComponentName({ ...props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}

// Export default if single component
export default ComponentName

// Named exports for compound components
export { Component, ComponentHeader, ComponentContent }
```

## Advanced Component Patterns

### Polymorphic Components
```typescript
// Polymorphic component that can render as different elements
import React from "react"
import { cn } from "@/lib/utils"

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"]

type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

interface TextProps {
  size?: "sm" | "base" | "lg" | "xl"
  weight?: "normal" | "medium" | "semibold" | "bold"
}

type TextComponent = <C extends React.ElementType = "p">(
  props: PolymorphicComponentPropWithRef<C, TextProps>
) => React.ReactElement | null

const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = "p">(
    { as, size = "base", weight = "normal", className, ...props }: PolymorphicComponentPropWithRef<C, TextProps>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "p"

    const sizeClasses = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium", 
      semibold: "font-semibold",
      bold: "font-bold"
    }

    return (
      <Component
        ref={ref}
        className={cn(sizeClasses[size], weightClasses[weight], className)}
        {...props}
      />
    )
  }
)

Text.displayName = "Text"

// Usage examples:
// <Text>Default paragraph</Text>
// <Text as="h1" size="xl" weight="bold">Heading</Text>
// <Text as="span" size="sm">Small text</Text>
```

### Render Props Pattern
```typescript
// Render props for flexible component composition
interface DataFetcherProps<T> {
  url: string
  children: (data: {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
  }) => React.ReactNode
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [url])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return <>{children({ data, loading, error, refetch: fetchData })}</>
}

// Usage:
// <DataFetcher<Post[]> url="/api/posts">
//   {({ data, loading, error }) => (
//     loading ? <Skeleton /> :
//     error ? <ErrorMessage error={error} /> :
//     <PostsList posts={data || []} />
//   )}
// </DataFetcher>
```

## Component Testing Patterns

### Component Testing Setup
```typescript
// Testing utilities for components
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("handles click events", async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("applies correct variant classes", () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-destructive")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
```

## See Also

- [Technology Stack](./technology-stack.md) - shadcn/ui and Radix UI configuration details
- [Architecture Guidelines](./architecture-guidelines.md) - How components fit in the project structure
- [Development Patterns](./development-patterns.md) - TypeScript patterns used in components
- [Styling Guidelines](./styling-guidelines.md) - Tailwind CSS usage in components
- [Common Tasks](./common-tasks.md) - How to add new components
- [Best Practices](./best-practices.md) - Component development guidelines

---

*This component system provides a solid foundation for building accessible, maintainable, and performant UI components. Always prioritize accessibility and follow established patterns for consistency.*