export interface PostMetadata {
  title: string
  date: string
  readTime: string
  excerpt: string
  slug: string
  tags?: string[]
  published?: boolean
}

export interface Post extends PostMetadata {
  content: string
}

const posts: Post[] = [
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development",
    date: "2024-01-15",
    readTime: "8 min",
    excerpt: "Exploring emerging trends and technologies that will shape the next decade of web development.",
    tags: ["web development", "future", "technology"],
    published: true,
    content: `# The Future of Web Development

The web development landscape is evolving at an unprecedented pace. As we look toward the future, several key trends are emerging that will fundamentally reshape how we build and interact with web applications.

## The Rise of Edge Computing

Edge computing is moving computation closer to users, reducing latency and improving performance. This shift is enabling new possibilities for real-time applications and global scalability.

## AI-Powered Development Tools

Artificial intelligence is becoming an integral part of the development workflow, from code generation to automated testing and deployment optimization.

## WebAssembly's Growing Influence

WebAssembly is opening doors to high-performance web applications, allowing developers to run code written in various languages directly in the browser.

## The Evolution of JavaScript Frameworks

Modern frameworks are focusing on developer experience, performance optimization, and seamless integration with emerging web standards.

## Conclusion

The future of web development is bright, with new technologies enabling more powerful, efficient, and user-friendly applications than ever before.`,
  },
  {
    slug: "design-systems-at-scale",
    title: "Building Design Systems at Scale",
    date: "2024-01-10",
    readTime: "12 min",
    excerpt: "A comprehensive guide to creating and maintaining design systems that grow with your organization.",
    tags: ["design systems", "ui/ux", "scalability"],
    published: true,
    content: `# Building Design Systems at Scale

Design systems have become essential for organizations looking to maintain consistency and efficiency across their digital products. However, building a design system that scales effectively requires careful planning and execution.

## Foundation First

Before diving into components, establish a solid foundation with design tokens, typography scales, and color systems that can adapt to various contexts and themes.

## Component Architecture

Design components with flexibility in mind. Each component should be modular, reusable, and capable of handling different states and variations.

## Documentation and Governance

A design system is only as good as its documentation. Establish clear guidelines, usage examples, and governance processes to ensure consistent adoption.

## Tooling and Automation

Leverage modern tooling to automate design token generation, component testing, and documentation updates to reduce maintenance overhead.

## Community and Adoption

Foster a community around your design system. Encourage feedback, contributions, and provide support to teams adopting the system.

## Measuring Success

Establish metrics to measure the success of your design system, including adoption rates, consistency improvements, and development velocity gains.`,
  },
  {
    slug: "performance-first-development",
    title: "Performance-First Development",
    date: "2024-01-05",
    readTime: "10 min",
    excerpt: "Why performance should be a primary consideration in every development decision, not an afterthought.",
    tags: ["performance", "optimization", "web vitals"],
    published: true,
    content: `# Performance-First Development

In today's fast-paced digital world, performance isn't just a nice-to-have—it's a fundamental requirement that directly impacts user experience, business metrics, and search rankings.

## The Performance Mindset

Adopting a performance-first mindset means considering the performance implications of every technical decision from the very beginning of a project.

## Core Web Vitals

Understanding and optimizing for Core Web Vitals—Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)—is crucial for modern web applications.

## Bundle Optimization

Modern bundling strategies, including code splitting, tree shaking, and dynamic imports, can significantly reduce initial load times and improve user experience.

## Image and Asset Optimization

Implementing responsive images, modern formats like WebP and AVIF, and proper lazy loading strategies can dramatically improve page load performance.

## Monitoring and Measurement

Continuous performance monitoring using tools like Lighthouse, WebPageTest, and Real User Monitoring (RUM) helps maintain performance standards over time.

## Performance Budget

Establishing and maintaining a performance budget ensures that performance remains a priority throughout the development lifecycle.`,
  },
  {
    slug: "art-of-code-review",
    title: "The Art of Code Review",
    date: "2023-12-28",
    readTime: "7 min",
    excerpt: "Best practices for conducting effective code reviews that improve code quality and team collaboration.",
    tags: ["code review", "collaboration", "best practices"],
    published: true,
    content: `# The Art of Code Review

Code reviews are one of the most valuable practices in software development, serving as a quality gate, knowledge sharing mechanism, and collaboration tool all in one.

## Setting the Right Tone

Effective code reviews start with establishing a positive, constructive culture where feedback is viewed as an opportunity for growth rather than criticism.

## What to Look For

Focus on code correctness, maintainability, performance implications, security considerations, and adherence to team standards and conventions.

## Providing Constructive Feedback

Frame feedback in terms of the code, not the person. Explain the reasoning behind suggestions and offer specific, actionable recommendations.

## The Review Process

Establish clear guidelines for when reviews are required, who should review, and what constitutes approval criteria.

## Tools and Automation

Leverage automated tools for style checking, testing, and security scanning to focus human review time on higher-level concerns.

## Learning and Growth

Use code reviews as learning opportunities for both reviewers and authors to share knowledge and improve overall team capabilities.`,
  },
]

export function getAllPosts(): PostMetadata[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content, ...metadata }) => metadata)
}

export function getPostBySlug(slug: string): Post | null {
  const post = posts.find((p) => p.slug === slug && p.published)
  return post || null
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })
}
