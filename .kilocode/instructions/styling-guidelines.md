# Styling Guidelines

> Tailwind CSS, design tokens, theming, responsive design, and styling best practices

## Design Token System

### OKLCH Color Space Implementation
The project uses OKLCH color space for better color consistency and perceptual uniformity across different displays and lighting conditions.

```css
/* app/globals.css - Root design tokens */
:root {
  /* Background colors */
  --background: oklch(1 0 0);                    /* Pure white */
  --foreground: oklch(0.145 0 0);               /* Near black text */
  
  /* UI colors */
  --card: oklch(1 0 0);                         /* Card backgrounds */
  --card-foreground: oklch(0.145 0 0);          /* Card text */
  --popover: oklch(1 0 0);                      /* Popover backgrounds */
  --popover-foreground: oklch(0.145 0 0);       /* Popover text */
  
  /* Interactive elements */
  --primary: oklch(0.205 0 0);                  /* Primary buttons/links */
  --primary-foreground: oklch(0.985 0 0);       /* Primary button text */
  --secondary: oklch(0.961 0 0);                /* Secondary elements */
  --secondary-foreground: oklch(0.145 0 0);     /* Secondary text */
  
  /* State colors */
  --muted: oklch(0.961 0 0);                    /* Muted backgrounds */
  --muted-foreground: oklch(0.455 0 0);         /* Muted text */
  --accent: oklch(0.961 0 0);                   /* Accent backgrounds */
  --accent-foreground: oklch(0.145 0 0);        /* Accent text */
  
  /* Semantic colors */
  --destructive: oklch(0.62 0.25 29);           /* Error/danger states */
  --destructive-foreground: oklch(0.985 0 0);   /* Error text */
  --success: oklch(0.65 0.18 140);              /* Success states */
  --success-foreground: oklch(0.985 0 0);       /* Success text */
  --warning: oklch(0.75 0.15 70);               /* Warning states */
  --warning-foreground: oklch(0.145 0 0);       /* Warning text */
  
  /* Borders and inputs */
  --border: oklch(0.898 0 0);                   /* Default borders */
  --input: oklch(0.898 0 0);                    /* Input borders */
  --ring: oklch(0.205 0 0);                     /* Focus rings */
  
  /* Radius values */
  --radius: 0.5rem;                             /* Default border radius */
}

/* Dark mode color variants */
.dark {
  --background: oklch(0.145 0 0);               /* Dark background */
  --foreground: oklch(0.985 0 0);               /* Light text */
  
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.176 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  
  --muted: oklch(0.176 0 0);
  --muted-foreground: oklch(0.645 0 0);
  --accent: oklch(0.176 0 0);
  --accent-foreground: oklch(0.985 0 0);
  
  --destructive: oklch(0.62 0.25 29);
  --destructive-foreground: oklch(0.985 0 0);
  --success: oklch(0.65 0.18 140);
  --success-foreground: oklch(0.985 0 0);
  --warning: oklch(0.75 0.15 70);
  --warning-foreground: oklch(0.145 0 0);
  
  --border: oklch(0.176 0 0);
  --input: oklch(0.176 0 0);
  --ring: oklch(0.212 0 0);
}
```

### CSS Custom Properties Integration
```css
/* Tailwind CSS integration with design tokens */
@theme inline {
  /* Map CSS custom properties to Tailwind utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  
  /* Spacing and sizing */
  --radius: var(--radius);
}
```

## Tailwind CSS Configuration

### Custom Animation System
```css
/* Custom animations for enhanced user experience */
@layer utilities {
  .animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
  
  .animate-scale-in {
    animation: scale-in 0.2s ease-out;
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Typography System
```css
/* Custom typography utilities */
@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, 
      oklch(0.5 0.15 250), 
      oklch(0.6 0.18 290));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .text-balance {
    text-wrap: balance;
  }
  
  .text-pretty {
    text-wrap: pretty;
  }
  
  /* Reading optimized typography */
  .prose-optimized {
    line-height: 1.7;
    letter-spacing: 0.01em;
  }
  
  /* Heading scale system */
  .heading-1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  
  .heading-2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  
  .heading-3 {
    font-size: clamp(1.25rem, 3vw, 2rem);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
}
```

### Responsive Design System
```css
/* Custom responsive breakpoints and utilities */
@layer utilities {
  /* Container queries for component-level responsiveness */
  .container-sm {
    container-type: inline-size;
  }
  
  @container (min-width: 320px) {
    .container-sm .cq-sm\:text-sm { font-size: 0.875rem; }
    .container-sm .cq-sm\:p-4 { padding: 1rem; }
  }
  
  @container (min-width: 768px) {
    .container-sm .cq-md\:text-base { font-size: 1rem; }
    .container-sm .cq-md\:p-6 { padding: 1.5rem; }
  }
  
  /* Fluid spacing system */
  .space-fluid-sm { margin: clamp(0.5rem, 2vw, 1rem); }
  .space-fluid-md { margin: clamp(1rem, 4vw, 2rem); }
  .space-fluid-lg { margin: clamp(2rem, 6vw, 4rem); }
  .space-fluid-xl { margin: clamp(3rem, 8vw, 6rem); }
  
  /* Aspect ratio utilities */
  .aspect-golden { aspect-ratio: 1.618 / 1; }
  .aspect-photo { aspect-ratio: 4 / 3; }
  .aspect-video-wide { aspect-ratio: 21 / 9; }
}
```

## Component Styling Patterns

### Layout Components
```typescript
// Layout component with consistent styling patterns
import { cn } from '@/lib/utils'

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  children: React.ReactNode
}

export function Container({ size = 'lg', className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6",
        {
          'max-w-3xl': size === 'sm',
          'max-w-4xl': size === 'md', 
          'max-w-6xl': size === 'lg',
          'max-w-7xl': size === 'xl',
          'max-w-none': size === 'full'
        },
        className
      )}
    >
      {children}
    </div>
  )
}

// Grid system component
interface GridProps {
  cols?: number
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

export function Grid({ cols = 1, gap = 'md', className, children }: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        {
          'grid-cols-1': cols === 1,
          'grid-cols-1 md:grid-cols-2': cols === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': cols === 4,
        },
        {
          'gap-4': gap === 'sm',
          'gap-6': gap === 'md',
          'gap-8': gap === 'lg'
        },
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Interactive Component Patterns
```typescript
// Button component with comprehensive styling
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  // Base styles - always applied
  [
    "inline-flex items-center justify-center",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95 transition-transform"
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground shadow",
          "hover:bg-primary/90",
          "active:bg-primary/80"
        ],
        destructive: [
          "bg-destructive text-destructive-foreground shadow-sm",
          "hover:bg-destructive/90",
          "active:bg-destructive/80"
        ],
        outline: [
          "border border-input bg-background shadow-sm",
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground shadow-sm",
          "hover:bg-secondary/80",
          "active:bg-secondary/70"
        ],
        ghost: [
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80"
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline",
          "active:text-primary/80"
        ],
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
```

### Card Component Styling
```typescript
// Comprehensive card component with variants
const cardVariants = cva(
  [
    "rounded-xl border bg-card text-card-foreground shadow",
    "transition-all duration-200"
  ],
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md",
        elevated: "shadow-lg hover:shadow-xl",
        interactive: [
          "cursor-pointer hover:shadow-md hover:-translate-y-1",
          "active:translate-y-0 active:shadow-sm"
        ],
        bordered: "border-2 border-border",
        glass: [
          "bg-background/70 backdrop-blur-sm border-border/50",
          "shadow-xl"
        ]
      },
      padding: {
        none: "p-0",
        sm: "p-4", 
        md: "p-6",
        lg: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {}

export function Card({ 
  className, 
  variant, 
  padding, 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
}
```

## Dark Mode Implementation

### Theme Provider Setup
```typescript
// contexts/theme-context.tsx
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ 
  children,
  defaultTheme = 'system'
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light')

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    const effectiveTheme = theme === 'system' ? systemTheme : theme
    root.classList.add(effectiveTheme)
  }, [theme, systemTheme])

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme preference
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme: updateTheme, 
      systemTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### Theme Toggle Component
```typescript
// components/theme-toggle.tsx
"use client"
import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/theme-context'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={theme === 'light' ? 'bg-accent' : ''}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={theme === 'dark' ? 'bg-accent' : ''}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={theme === 'system' ? 'bg-accent' : ''}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Responsive Design Patterns

### Mobile-First Approach
```css
/* Base styles (mobile first) */
.responsive-card {
  @apply p-4 text-sm;
}

/* Tablet breakpoint */
@media (min-width: 768px) {
  .responsive-card {
    @apply p-6 text-base;
  }
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  .responsive-card {
    @apply p-8 text-lg;
  }
}
```

### Responsive Typography
```typescript
// Typography component with responsive sizing
interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small'
  responsive?: boolean
  className?: string
  children: React.ReactNode
}

export function Typography({ 
  variant, 
  responsive = true, 
  className, 
  children 
}: TypographyProps) {
  const baseClasses = {
    h1: responsive 
      ? "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight"
      : "text-4xl font-bold tracking-tight",
    h2: responsive
      ? "text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight" 
      : "text-2xl font-semibold tracking-tight",
    h3: responsive
      ? "text-lg sm:text-xl lg:text-2xl font-semibold"
      : "text-xl font-semibold",
    h4: responsive
      ? "text-base sm:text-lg font-semibold"
      : "text-lg font-semibold",
    body: responsive
      ? "text-sm sm:text-base leading-relaxed"
      : "text-base leading-relaxed",
    small: responsive
      ? "text-xs sm:text-sm text-muted-foreground"
      : "text-sm text-muted-foreground"
  }

  const Component = variant === 'body' ? 'p' : variant

  return (
    <Component className={cn(baseClasses[variant], className)}>
      {children}
    </Component>
  )
}
```

### Responsive Grid System
```typescript
// Responsive grid with breakpoint-specific columns
interface ResponsiveGridProps {
  columns: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function ResponsiveGrid({ 
  columns, 
  gap = 'md', 
  children, 
  className 
}: ResponsiveGridProps) {
  const gridClasses = cn(
    "grid",
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    {
      'gap-4': gap === 'sm',
      'gap-6': gap === 'md',
      'gap-8': gap === 'lg'
    },
    className
  )

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}

// Usage:
// <ResponsiveGrid 
//   columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
//   gap="md"
// >
//   {items.map(item => <Item key={item.id} {...item} />)}
// </ResponsiveGrid>
```

## Common Styling Patterns

### Conditional Styling
```typescript
// Using cn utility for conditional classes
function StatusBadge({ status }: { status: 'success' | 'warning' | 'error' }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          'bg-success/10 text-success border border-success/20': status === 'success',
          'bg-warning/10 text-warning border border-warning/20': status === 'warning',
          'bg-destructive/10 text-destructive border border-destructive/20': status === 'error',
        }
      )}
    >
      {status}
    </span>
  )
}
```

### Interactive States
```css
/* Comprehensive interactive state patterns */
.interactive-element {
  @apply transition-all duration-200 ease-in-out;
  
  /* Hover state */
  @apply hover:bg-accent hover:text-accent-foreground;
  @apply hover:shadow-md hover:-translate-y-0.5;
  
  /* Focus state */
  @apply focus-visible:outline-none focus-visible:ring-2;
  @apply focus-visible:ring-ring focus-visible:ring-offset-2;
  
  /* Active state */
  @apply active:translate-y-0 active:shadow-sm;
  @apply active:scale-95;
  
  /* Disabled state */
  @apply disabled:pointer-events-none disabled:opacity-50;
  @apply disabled:cursor-not-allowed;
}
```

### Loading States
```typescript
// Skeleton components for loading states
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  )
}

// Specific skeleton patterns
export function PostCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  )
}
```

### Form Styling
```css
/* Form element styling patterns */
.form-field {
  @apply space-y-2;
}

.form-label {
  @apply text-sm font-medium leading-none;
  @apply peer-disabled:cursor-not-allowed peer-disabled:opacity-70;
}

.form-input {
  @apply flex h-10 w-full rounded-md border border-input;
  @apply bg-background px-3 py-2 text-sm ring-offset-background;
  @apply file:border-0 file:bg-transparent file:text-sm file:font-medium;
  @apply placeholder:text-muted-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2;
  @apply focus-visible:ring-ring focus-visible:ring-offset-2;
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}

.form-error {
  @apply text-sm font-medium text-destructive;
}

.form-description {
  @apply text-sm text-muted-foreground;
}
```

## Performance Optimization

### CSS Optimization Patterns
```css
/* Optimized animations using transforms */
.optimized-hover {
  @apply transition-transform duration-200;
  transform: translateZ(0); /* Force GPU acceleration */
}

.optimized-hover:hover {
  transform: translateY(-2px) translateZ(0);
}

/* Efficient gradient implementations */
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Use CSS custom properties for dynamic theming */
.dynamic-color {
  color: hsl(var(--primary));
  background-color: hsl(var(--primary) / 0.1);
}
```

### Tailwind JIT Optimization
```typescript
// Use Tailwind's Just-In-Time compilation efficiently
// Prefer static classes over dynamic ones for better tree-shaking

// Good - Static classes
<div className="bg-primary text-primary-foreground p-4 rounded-lg" />

// Avoid - Dynamic classes that can't be statically analyzed
const dynamicColor = 'red'
<div className={`bg-${dynamicColor}-500`} /> // This won't work with JIT

// Better - Use CSS custom properties or conditional logic
<div 
  className="bg-primary text-primary-foreground p-4 rounded-lg"
  style={{ '--primary': `var(--${color})` }}
/>
```

## Best Practices

### Do's
- **Use design tokens** - Reference CSS custom properties consistently
- **Follow mobile-first** - Start with mobile styles and enhance for larger screens
- **Leverage Tailwind utilities** - Use utility classes instead of custom CSS when possible
- **Implement proper focus states** - Ensure all interactive elements are keyboard accessible
- **Use semantic color naming** - Use role-based colors (primary, secondary) not descriptive (blue, red)
- **Test dark mode thoroughly** - Verify all components work in both themes
- **Optimize for performance** - Use transforms for animations and minimize repaints

### Don'ts
- **Don't hardcode colors** - Always use design tokens and CSS custom properties
- **Don't ignore responsive design** - Test on various screen sizes and devices
- **Don't use inline styles** - Prefer Tailwind utilities or CSS custom properties
- **Don't break accessibility** - Maintain proper color contrast and focus indicators
- **Don't over-animate** - Respect users' motion preferences
- **Don't ignore loading states** - Provide visual feedback for all async operations
- **Don't mix different spacing systems** - Stick to Tailwind's spacing scale

## See Also

- [Technology Stack](./technology-stack.md) - Tailwind CSS and styling tool configuration
- [Component System](./component-system.md) - How styling integrates with shadcn/ui components
- [Architecture Guidelines](./architecture-guidelines.md) - CSS file organization and structure
- [Development Patterns](./development-patterns.md) - TypeScript patterns for styling
- [Best Practices](./best-practices.md) - Overall quality guidelines including styling

---

*These styling guidelines ensure consistent, performant, and accessible design implementation across the entire project.*