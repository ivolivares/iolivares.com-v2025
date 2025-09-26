# Content Management

> Blog system, markdown processing, content organization, and content workflow

## Blog Post System

### Content Architecture
The project supports two content approaches: inline content stored in TypeScript files and external markdown files. Both systems are type-safe and performant.

### Post Metadata Interface
```typescript
// lib/markdown.ts - Type definitions
interface PostMetadata {
  title: string
  date: string           // ISO date string
  readTime: string       // e.g., "5 min"
  excerpt: string
  slug: string
  tags?: string[]
  published?: boolean
}

interface Post extends PostMetadata {
  content: string        // Markdown content
}
```

### Content Storage Options

#### Option 1: Inline Content (lib/markdown.ts)
```typescript
// lib/markdown.ts - Inline content approach
const posts: Post[] = [
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development",
    date: "2024-01-15",
    readTime: "8 min",
    excerpt: "Exploring upcoming trends and technologies that will shape the web development landscape in the coming years.",
    tags: ["Web Development", "Technology", "Future"],
    published: true,
    content: `
# The Future of Web Development

Web development is evolving at an unprecedented pace. Here are the key trends I see shaping our industry:

## Server Components Revolution

React Server Components are changing how we think about client-server boundaries...

## Edge Computing Integration

The move toward edge computing is making applications faster and more resilient...

## AI-Powered Development Tools

AI is becoming an integral part of the development workflow...

## Conclusion

The future of web development is bright, with exciting technologies that will make our applications faster, more accessible, and easier to maintain.
    `
  },
  {
    slug: "performance-first-development",
    title: "Performance-First Development",
    date: "2024-01-10",
    readTime: "6 min",
    excerpt: "Why performance should be considered from day one of any web development project.",
    tags: ["Performance", "Web Development", "Best Practices"],
    published: true,
    content: `
# Performance-First Development

Performance isn't just a nice-to-have—it's essential for user experience and business success.

## Core Web Vitals

Understanding and optimizing for Core Web Vitals...

## Bundle Optimization

Strategies for keeping JavaScript bundles lean...

## Image Optimization

Modern approaches to serving optimized images...
    `
  }
]

// Content retrieval functions
export function getAllPosts(): PostMetadata[] {
  return posts
    .filter(post => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content, ...metadata }) => metadata)
}

export function getPostBySlug(slug: string): Post | null {
  const post = posts.find(p => p.slug === slug && p.published !== false)
  return post || null
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getAllPosts().filter(post => 
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}
```

#### Option 2: File-Based Content (content/ directory)
```typescript
// lib/markdown.ts - File-based content approach
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'thoughts')

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(CONTENT_DIR, file)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const { data } = matter(fileContent)
        
        return {
          slug: file.replace('.md', ''),
          title: data.title,
          date: data.date,
          readTime: data.readTime,
          excerpt: data.excerpt,
          tags: data.tags,
          published: data.published !== false
        } as PostMetadata
      })
    )
    
    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    if (data.published === false) {
      return null
    }
    
    return {
      slug,
      title: data.title,
      date: data.date,
      readTime: data.readTime,
      excerpt: data.excerpt,
      tags: data.tags,
      published: data.published !== false,
      content
    }
    
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}
```

#### File-Based Content Format
```markdown
---
title: "The Art of Code Review"
date: "2024-01-20"
readTime: "7 min"
excerpt: "Best practices for conducting effective code reviews that improve code quality and team collaboration."
tags: ["Code Review", "Best Practices", "Team Collaboration"]
published: true
---

# The Art of Code Review

Code reviews are one of the most valuable practices in software development...

## Setting the Right Tone

Code reviews should be constructive and educational...

## What to Look For

Focus on these key areas during code review:

1. **Logic and Correctness**
2. **Code Style and Consistency**
3. **Performance Considerations**
4. **Security Implications**

## Providing Feedback

Effective feedback is specific, actionable, and kind...

## Conclusion

Good code reviews make everyone better developers.
```

## Markdown Processing

### React Markdown Configuration
```typescript
// components/markdown-renderer.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom component overrides
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold tracking-tight mb-6" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-semibold tracking-tight mb-4 mt-8" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold tracking-tight mb-3 mt-6" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="leading-7 mb-4" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ inline, children, ...props }) => (
            inline ? (
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code className="block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props}>
                {children}
              </code>
            )
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-primary hover:underline font-medium"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
```

### Advanced Markdown Features
```typescript
// Enhanced markdown processing with additional plugins
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkSlug from 'remark-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export function EnhancedMarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,      // GitHub Flavored Markdown
          remarkToc,      // Table of contents generation
          remarkSlug,     // Add slugs to headings
        ]}
        rehypePlugins={[
          rehypeHighlight,          // Syntax highlighting
          rehypeSlug,              // Add IDs to headings
          [rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: {
              className: ['anchor-link'],
            },
          }]
        ]}
        components={{
          // Custom components for enhanced features
          pre: ({ children, ...props }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto border" {...props}>
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-border" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
```

## Content Organization Strategies

### Directory Structure for File-Based Content
```
content/
├── thoughts/                  # Blog posts
│   ├── art-of-code-review.md
│   ├── design-systems-at-scale.md
│   ├── future-of-web-development.md
│   └── performance-first-development.md
├── pages/                     # Static pages
│   ├── about.md
│   ├── uses.md
│   └── privacy-policy.md
└── data/                      # Structured data
    ├── talks.json
    ├── projects.json
    └── experience.json
```

### Content Validation
```typescript
// lib/content-validation.ts
import { z } from 'zod'

const PostMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  readTime: z.string().regex(/^\d+\s+min$/, 'Read time must be in "X min" format'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  slug: z.string().min(1, 'Slug is required'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
})

const PostSchema = PostMetadataSchema.extend({
  content: z.string().min(1, 'Content is required'),
})

export function validatePostMetadata(data: unknown): PostMetadata {
  return PostMetadataSchema.parse(data)
}

export function validatePost(data: unknown): Post {
  return PostSchema.parse(data)
}

// Usage in content loading
export function getPostBySlug(slug: string): Post | null {
  try {
    const rawPost = loadPostFromFile(slug)
    return validatePost(rawPost)
  } catch (error) {
    console.error(`Invalid post data for ${slug}:`, error)
    return null
  }
}
```

### Content Generation Utilities
```typescript
// lib/content-utils.ts
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
  return `${readTimeMinutes} min`
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  const truncated = plainText.substr(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substr(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

// Auto-generate post template
export function generatePostTemplate(title: string): string {
  const slug = generateSlug(title)
  const date = new Date().toISOString().split('T')[0]
  
  return `---
title: "${title}"
date: "${date}"
readTime: "5 min"
excerpt: "Brief description of the post content."
tags: ["Tag1", "Tag2"]
published: false
---

# ${title}

Write your content here...

## Section 1

Content for section 1...

## Section 2

Content for section 2...

## Conclusion

Wrap up your thoughts...
`
}
```

## Dynamic Content Loading

### Server-Side Content Loading
```typescript
// app/thoughts/page.tsx - Server Component
import { getAllPosts } from '@/lib/markdown'
import { PostCard } from '@/components/post-card'

export default async function ThoughtsPage() {
  const posts = await getAllPosts()
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Thoughts & Blog Posts</h1>
        <p className="text-lg text-muted-foreground">
          Insights about web development, technology, and software engineering.
        </p>
      </header>
      
      <div className="grid gap-6 md:gap-8">
        {posts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
```

### Client-Side Search and Filtering
```typescript
// components/posts-search.tsx
"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PostCard } from '@/components/post-card'
import type { PostMetadata } from '@/lib/markdown'

interface PostsSearchProps {
  posts: PostMetadata[]
}

export function PostsSearch({ posts }: PostsSearchProps) {
  const [query, setQuery] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  
  // Get all unique tags
  const allTags = React.useMemo(() => {
    const tags = new Set<string>()
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [posts])
  
  // Filter posts based on search query and selected tags
  const filteredPosts = React.useMemo(() => {
    return posts.filter(post => {
      const matchesQuery = !query || 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => post.tags?.includes(tag))
      
      return matchesQuery && matchesTags
    })
  }, [posts, query, selectedTags])
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
      </div>
      
      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      {/* Results */}
      <div className="grid gap-6 md:gap-8">
        {filteredPosts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
```

## SEO and Metadata

### Dynamic Metadata Generation
```typescript
// app/thoughts/[slug]/page.tsx
import { Metadata } from 'next'
import { getPostBySlug, getAllPosts } from '@/lib/markdown'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: 'Iván Olivares Rojas' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Iván Olivares Rojas'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        {post.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </header>
      
      <MarkdownRenderer content={post.content} />
    </article>
  )
}

// Generate static params for build optimization
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

## See Also

- [Architecture Guidelines](./architecture-guidelines.md) - How content fits into the project structure
- [Component System](./component-system.md) - MarkdownRenderer and PostCard components
- [Styling Guidelines](./styling-guidelines.md) - Typography and content styling
- [Common Tasks](./common-tasks.md) - How to add new blog posts
- [Best Practices](./best-practices.md) - Content quality and SEO guidelines

---

*This content management system provides flexibility for both simple and complex content needs while maintaining type safety and performance.*