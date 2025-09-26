# Internationalization

> Translation system, locale handling, implementation, and multilingual content management

## Translation System Overview

The project uses a custom internationalization implementation built with React Context, supporting English and Spanish with extensible architecture for additional languages.

### Core Features
- **Dynamic translation loading** with async support
- **Hierarchical key structure** using dot notation
- **Fallback language handling** (English as default)
- **Type-safe translation keys** with TypeScript support
- **Loading states** for better user experience
- **Nested translations** for complex content structures

## Translation Context Implementation

### Context Definition
```typescript
// contexts/translation-context.tsx
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

interface TranslationContextType {
  t: (key: string) => string           // Translation function
  language: string                     // Current language code
  setLanguage: (lang: string) => void  // Language setter
  isLoading: boolean                   // Loading state
  availableLanguages: string[]         // Supported languages
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: React.ReactNode
  defaultLanguage?: string
}

export function TranslationProvider({ 
  children, 
  defaultLanguage = 'en' 
}: TranslationProviderProps) {
  const [language, setLanguageState] = useState(defaultLanguage)
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  
  const availableLanguages = ['en', 'es']

  // Load translation files
  const loadTranslations = async (lang: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/locales/${lang}.json`)
      
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`)
      }
      
      const data = await response.json()
      setTranslations(data)
    } catch (error) {
      console.error('Error loading translations:', error)
      
      // Fallback to English if not already loading English
      if (lang !== 'en') {
        await loadTranslations('en')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize and load translations
  useEffect(() => {
    // Try to get language from localStorage
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language')
      if (savedLanguage && availableLanguages.includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    loadTranslations(language)
  }, [language])

  // Translation function with fallback
  const t = (key: string): string => {
    if (isLoading) {
      return key // Return key while loading
    }

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

    // Return string value or fallback to key
    return typeof value === 'string' ? value : key
  }

  // Set language with persistence
  const setLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      setLanguageState(lang)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', lang)
      }
    }
  }

  const value = {
    t,
    language,
    setLanguage,
    isLoading,
    availableLanguages
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

// Hook for consuming translations
export function useTranslation() {
  const context = useContext(TranslationContext)
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  
  return context
}
```

### Custom Hook with Enhanced Features
```typescript
// hooks/use-translation.tsx
import { useTranslation as useBaseTranslation } from '@/contexts/translation-context'

interface TranslationOptions {
  fallback?: string
  variables?: Record<string, string | number>
}

export function useTranslation() {
  const { t: baseT, ...rest } = useBaseTranslation()
  
  // Enhanced translation function with interpolation
  const t = (key: string, options?: TranslationOptions): string => {
    let translation = baseT(key)
    
    // Use fallback if translation not found
    if (translation === key && options?.fallback) {
      translation = options.fallback
    }
    
    // Variable interpolation
    if (options?.variables) {
      Object.entries(options.variables).forEach(([variable, value]) => {
        const placeholder = `{{${variable}}}`
        translation = translation.replace(new RegExp(placeholder, 'g'), String(value))
      })
    }
    
    return translation
  }
  
  // Format functions
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString(rest.language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(rest.language === 'es' ? 'es-ES' : 'en-US', options).format(num)
  }
  
  return {
    t,
    formatDate,
    formatNumber,
    ...rest
  }
}
```

## Translation Files Structure

### English Translation File
```json
// public/locales/en.json
{
  "nav": {
    "home": "HOME",
    "thoughts": "THOUGHTS",
    "talks": "TALKS",
    "photographs": "PHOTOGRAPHS",
    "stack": "STACK",
    "uses": "USES",
    "giving_talks": "GIVING TALKS",
    "links": "LINKS",
    "vinyls": "VINYLS",
    "resume": "RÉSUMÉ",
    "connect": "CONNECT"
  },
  "home": {
    "title": "Iván Olivares Rojas",
    "subtitle": "Software Engineer & Technology Enthusiast",
    "description": "Building digital experiences with modern web technologies. Passionate about performance, accessibility, and developer experience.",
    "latest_thoughts": "Latest Thoughts",
    "view_all_posts": "View All Posts",
    "recent_talks": "Recent Talks",
    "view_all_talks": "View All Talks"
  },
  "thoughts": {
    "title": "Thoughts",
    "subtitle": "Insights about web development, technology, and software engineering",
    "read_more": "Read more",
    "read_time": "{{minutes}} min read",
    "published_on": "Published on {{date}}",
    "tagged_with": "Tagged with",
    "no_posts": "No posts found",
    "search_placeholder": "Search posts...",
    "filter_by_tag": "Filter by tag"
  },
  "talks": {
    "title": "Talks & Presentations",
    "subtitle": "Speaking engagements and technical presentations",
    "upcoming": "Upcoming",
    "past": "Past Events",
    "slides": "View Slides",
    "video": "Watch Video",
    "location": "{{venue}}, {{city}}",
    "virtual_event": "Virtual Event"
  },
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Try Again",
    "search": "Search",
    "clear": "Clear",
    "show_more": "Show More",
    "show_less": "Show Less",
    "copy_link": "Copy Link",
    "share": "Share",
    "back_to_top": "Back to Top"
  },
  "forms": {
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "send": "Send Message",
    "sending": "Sending...",
    "success": "Message sent successfully!",
    "error": "Failed to send message. Please try again.",
    "required_field": "This field is required",
    "invalid_email": "Please enter a valid email address"
  },
  "footer": {
    "copyright": "© {{year}} Iván Olivares Rojas. All rights reserved.",
    "built_with": "Built with {{technologies}}",
    "source_code": "View Source Code"
  }
}
```

### Spanish Translation File
```json
// public/locales/es.json
{
  "nav": {
    "home": "INICIO",
    "thoughts": "REFLEXIONES",
    "talks": "CHARLAS",
    "photographs": "FOTOGRAFÍAS", 
    "stack": "TECNOLOGÍAS",
    "uses": "HERRAMIENTAS",
    "giving_talks": "DANDO CHARLAS",
    "links": "ENLACES",
    "vinyls": "VINILOS",
    "resume": "CURRÍCULUM",
    "connect": "CONTACTO"
  },
  "home": {
    "title": "Iván Olivares Rojas",
    "subtitle": "Ingeniero de Software y Entusiasta de la Tecnología",
    "description": "Construyendo experiencias digitales con tecnologías web modernas. Apasionado por el rendimiento, la accesibilidad y la experiencia del desarrollador.",
    "latest_thoughts": "Últimas Reflexiones",
    "view_all_posts": "Ver Todas las Publicaciones",
    "recent_talks": "Charlas Recientes", 
    "view_all_talks": "Ver Todas las Charlas"
  },
  "thoughts": {
    "title": "Reflexiones",
    "subtitle": "Perspectivas sobre desarrollo web, tecnología e ingeniería de software",
    "read_more": "Leer más",
    "read_time": "{{minutes}} min de lectura",
    "published_on": "Publicado el {{date}}",
    "tagged_with": "Etiquetado con",
    "no_posts": "No se encontraron publicaciones",
    "search_placeholder": "Buscar publicaciones...",
    "filter_by_tag": "Filtrar por etiqueta"
  },
  "talks": {
    "title": "Charlas y Presentaciones",
    "subtitle": "Compromisos de orador y presentaciones técnicas",
    "upcoming": "Próximos",
    "past": "Eventos Pasados",
    "slides": "Ver Diapositivas",
    "video": "Ver Video",
    "location": "{{venue}}, {{city}}",
    "virtual_event": "Evento Virtual"
  },
  "common": {
    "loading": "Cargando...",
    "error": "Ocurrió un error",
    "retry": "Intentar de Nuevo",
    "search": "Buscar",
    "clear": "Limpiar",
    "show_more": "Mostrar Más",
    "show_less": "Mostrar Menos",
    "copy_link": "Copiar Enlace",
    "share": "Compartir",
    "back_to_top": "Volver Arriba"
  },
  "forms": {
    "name": "Nombre",
    "email": "Correo Electrónico",
    "message": "Mensaje",
    "send": "Enviar Mensaje",
    "sending": "Enviando...",
    "success": "¡Mensaje enviado con éxito!",
    "error": "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    "required_field": "Este campo es obligatorio",
    "invalid_email": "Por favor, ingresa una dirección de correo válida"
  },
  "footer": {
    "copyright": "© {{year}} Iván Olivares Rojas. Todos los derechos reservados.",
    "built_with": "Construido con {{technologies}}",
    "source_code": "Ver Código Fuente"
  }
}
```

## Language Selector Component

### Basic Language Selector
```typescript
// components/language-selector.tsx
"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useTranslation()

  const languageNames = {
    en: 'English',
    es: 'Español'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(
              "cursor-pointer",
              language === lang && "bg-accent"
            )}
          >
            <span className="mr-2">
              {lang === 'en' ? '🇺🇸' : '🇪🇸'}
            </span>
            {languageNames[lang as keyof typeof languageNames]}
            {language === lang && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Advanced Language Selector with Keyboard Navigation
```typescript
// components/advanced-language-selector.tsx
"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/use-translation'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdvancedLanguageSelector() {
  const { language, setLanguage, availableLanguages } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev < languages.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : languages.length - 1
        )
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0) {
          setLanguage(languages[focusedIndex].code)
          setIsOpen(false)
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 mr-2" />
        <span className="mr-1">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 py-2 bg-background border rounded-md shadow-lg z-50 min-w-[160px]"
          role="listbox"
          aria-label="Language options"
        >
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              className={cn(
                "w-full px-3 py-2 text-left hover:bg-accent focus:bg-accent transition-colors flex items-center justify-between",
                language === lang.code && "bg-accent",
                focusedIndex === index && "bg-accent"
              )}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="flex items-center">
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </span>
              {language === lang.code && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Usage Examples

### Basic Translation Usage
```typescript
// Example component using translations
import React from 'react'
import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function HomePage() {
  const { t, isLoading } = useTranslation()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('home.title')}</h1>
      <p className="text-lg text-muted-foreground">{t('home.subtitle')}</p>
      <p className="mt-4">{t('home.description')}</p>
      
      <div className="mt-8 space-x-4">
        <Button>{t('home.view_all_posts')}</Button>
        <Button variant="outline">{t('home.view_all_talks')}</Button>
      </div>
    </div>
  )
}
```

### Advanced Translation with Variables
```typescript
// Component with variable interpolation
import React from 'react'
import { useTranslation } from '@/hooks/use-translation'
import { PostMetadata } from '@/lib/markdown'

interface PostCardProps {
  post: PostMetadata
}

export function PostCard({ post }: PostCardProps) {
  const { t, formatDate } = useTranslation()

  return (
    <article className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      
      <div className="text-sm text-muted-foreground mb-4">
        {t('thoughts.published_on', { 
          variables: { date: formatDate(post.date) }
        })}
        {' • '}
        {t('thoughts.read_time', {
          variables: { minutes: post.readTime.replace(' min', '') }
        })}
      </div>
      
      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
      
      {post.tags && (
        <div className="mb-4">
          <span className="text-sm font-medium">
            {t('thoughts.tagged_with')}:
          </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {post.tags.map(tag => (
              <span key={tag} className="bg-accent px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <Button variant="ghost" size="sm">
        {t('thoughts.read_more')} →
      </Button>
    </article>
  )
}
```

## Implementation Guidelines

### Dot Notation Keys
```typescript
// Use hierarchical structure for organization
t('nav.home')           // Navigation items
t('home.title')         // Page-specific content
t('common.loading')     // Shared/common strings
t('forms.send')         // Form-related content
t('errors.not_found')   // Error messages
```

### Fallback Handling
```typescript
// Multiple fallback strategies
function SafeTranslation({ 
  translationKey, 
  fallback, 
  children 
}: { 
  translationKey: string
  fallback?: string
  children?: React.ReactNode 
}) {
  const { t } = useTranslation()
  
  const translation = t(translationKey)
  
  // Return translation, fallback, children, or key
  if (translation !== translationKey) {
    return <>{translation}</>
  }
  
  if (fallback) {
    return <>{fallback}</>
  }
  
  if (children) {
    return <>{children}</>
  }
  
  return <>{translationKey}</>
}

// Usage
<SafeTranslation 
  translationKey="page.title" 
  fallback="Default Title"
>
  Fallback Content
</SafeTranslation>
```

### Loading States
```typescript
// Handle loading states gracefully
function TranslatedContent() {
  const { t, isLoading } = useTranslation()
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-40" />
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

### Nested Translations
```typescript
// Support complex key structures
const complexTranslation = {
  "features": {
    "authentication": {
      "title": "User Authentication",
      "description": "Secure login and registration",
      "benefits": [
        "Secure password hashing",
        "Multi-factor authentication",
        "Session management"
      ]
    }
  }
}

// Access nested values
t('features.authentication.title')
t('features.authentication.benefits.0')
```

## Adding New Languages

### Step-by-Step Guide
1. **Create translation file**: Add `public/locales/{lang}.json`
2. **Update available languages**: Add language code to `availableLanguages` array
3. **Add language metadata**: Include language name and flag in selectors
4. **Test thoroughly**: Verify all translations work correctly
5. **Update documentation**: Document the new language support

### Language File Template
```json
// public/locales/fr.json (French example)
{
  "nav": {
    "home": "ACCUEIL",
    "thoughts": "RÉFLEXIONS",
    "talks": "CONFÉRENCES",
    "photographs": "PHOTOGRAPHIES",
    "stack": "TECHNOLOGIES",
    "uses": "OUTILS",
    "giving_talks": "DONNER DES CONFÉRENCES",
    "links": "LIENS",
    "vinyls": "VINYLES", 
    "resume": "CV",
    "connect": "CONTACT"
  },
  // ... rest of translations
}
```

## Best Practices

### Translation Key Guidelines
- Use consistent naming conventions
- Keep keys descriptive but concise
- Group related translations under common namespaces
- Avoid deeply nested structures (max 3-4 levels)
- Use camelCase or snake_case consistently

### Content Guidelines
- Keep translations culturally appropriate
- Maintain consistent tone and voice
- Consider text expansion/contraction between languages
- Test UI with longer translated text
- Provide context for translators when needed

### Performance Considerations
- Lazy load translation files
- Cache translations in browser storage
- Use skeleton loading states
- Minimize translation file sizes
- Consider code splitting for language-specific content

## See Also

- [Development Patterns](./development-patterns.md) - Context and hook patterns used in i18n
- [Component System](./component-system.md) - Language selector component implementation
- [Architecture Guidelines](./architecture-guidelines.md) - How i18n fits into the project structure  
- [Common Tasks](./common-tasks.md) - How to add new translations
- [Best Practices](./best-practices.md) - Internationalization best practices

---

*This internationalization system provides a solid foundation for multilingual content while maintaining performance and user experience.*