# iolivares.com v2025

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fivolivares%2Fiolivares.com-v2025)

A modern, multilingual personal website built with Next.js 15, showcasing professional work, thoughts, talks, and personal interests. This is Iván Olivares' personal website for 2025, featuring a clean design and comprehensive content management system.

🌐 **Live Website**: [iolivares.com](https://iolivares.com)

## ✨ Features

- **🌍 Multilingual Support**: Full English and Spanish localization
- **📝 Blog System**: Markdown-powered thoughts/blog section with syntax highlighting
- **🎤 Talks Showcase**: Comprehensive speaking engagements and presentation archive
- **📸 Photography Gallery**: Personal photography collection display
- **🎵 Vinyl Collection**: Interactive vinyl records showcase
- **📄 Resume/CV Section**: Professional experience and skills presentation
- **🔗 Connect & Links**: Centralized contact and social media links
- **🛠️ Tech Stack Showcase**: Tools and technologies used professionally
- **⚡ Performance Optimized**: Built with Next.js 15 App Router for optimal performance
- **🎨 Modern UI**: Clean design using Tailwind CSS and shadcn/ui components
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🌙 Dark Mode Support**: Integrated theme switching capabilities
- **⌨️ Command Palette**: Quick navigation with keyboard shortcuts

## 🛠️ Technology Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety and developer experience

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

### Content & Data
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Remark GFM](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown support
- **Static Content Management** - Markdown files in `/content` directory

### Additional Features
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[cmdk](https://cmdk.paco.me/)** - Command palette component
- **[Geist Font](https://vercel.com/font)** - Modern, readable typography
- **[@vercel/analytics](https://vercel.com/analytics)** - Web analytics and insights

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js 18+** (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **pnpm 10.16.1** (this project uses pnpm as the package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ivolivares/iolivares.com-v2025.git
   cd iolivares.com-v2025
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website in action.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## ✍️ Content Management

### Blog Posts (Thoughts)

Blog posts are stored as Markdown files in the `/content/thoughts/` directory. Each post includes frontmatter with metadata:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
readTime: "5 min"
excerpt: "Brief description of the post content"
tags: ["tag1", "tag2", "tag3"]
published: true
---

# Your content here...
```

### Multilingual Content

- Translations are managed in `/public/locales/`
- `en.json` - English translations
- `es.json` - Spanish translations
- Add new translation keys to both files to maintain consistency

### Speaking Engagements

Update your talks and speaking engagements in `/lib/talks-data.ts`. The file exports structured data for:
- Upcoming talk schedules
- Past presentations
- Talk descriptions and links

## 🎨 Customization Guide

This website is designed to be easily customizable for your own portfolio. Here's how to make it yours:

### Personal Information

1. **Update package.json**
   - Change `name`, `description`, `homepage`
   - Update `author` information
   - Modify `repository` URLs

2. **Modify app/layout.tsx**
   - Update the `title` and `description` in metadata
   - Change the site title and tagline

3. **Update translation files**
   - Replace personal information in `/public/locales/en.json` and `/public/locales/es.json`
   - Update navigation labels, bio, and contact information

### Visual Customization

1. **Colors and Theme**
   - Modify the color scheme in `tailwind.config.js` (if you create one)
   - Update CSS custom properties in `app/globals.css`

2. **Typography**
   - Change the font in `app/layout.tsx` (currently using Geist)
   - Import and configure your preferred font from Google Fonts

3. **Images and Media**
   - Replace images in `/public/` with your own
   - Update image references throughout the components

### Content Sections

1. **Remove Unwanted Sections**
   - Delete corresponding directories from `/app/`
   - Remove navigation links from components
   - Update translation files

2. **Add New Sections**
   - Create new directories in `/app/`
   - Add corresponding page components
   - Update navigation and translations

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Quick Deploy**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fivolivares%2Fiolivares.com-v2025)

2. **Manual Setup**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect Next.js and deploy

### Other Platforms

#### Netlify
```bash
pnpm build
# Upload the .next/out directory (if using static export)
```

#### Railway
```bash
# Railway will automatically detect and deploy Next.js apps
```

#### Traditional Hosting
1. Run `pnpm build`
2. Configure your server to serve the `.next` directory
3. Ensure Node.js environment is available

### Environment Variables

If you add any environment variables, make sure to:
1. Add them to your deployment platform
2. Document them in this README
3. Provide example values in `.env.example`

## 🤝 Contributing

While this is a personal website, contributions are welcome! Here's how you can help:

1. **Report Issues**: Found a bug? [Open an issue](https://github.com/ivolivares/iolivares.com-v2025/issues)
2. **Suggest Improvements**: Have ideas? Create an issue with the "enhancement" label
3. **Submit Pull Requests**: Fork, create a feature branch, and submit a PR

### Development Guidelines

- Follow the existing code style and structure
- Write meaningful commit messages
- Test your changes locally before submitting
- Update documentation as needed

For detailed contributing guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 🔧 Troubleshooting

### Common Issues

**Build fails with Node.js version error**
- Ensure you're using Node.js 18 or higher
- Use `nvm use` if you have a `.nvmrc` file

**pnpm not recognized**
- Install pnpm: `npm install -g pnpm`
- Or use corepack: `corepack enable`

**Styling issues after updates**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `pnpm install`

**Images not loading**
- Check that images are in the `/public` directory
- Verify image paths in components
- Ensure proper Next.js Image component usage

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to use this code for your own personal website. If you do, I'd appreciate a mention or link back to the original repository, but it's not required.

## 👨‍💻 Author

**Iván Olivares R.**
- Website: [iolivares.com](https://iolivares.com)
- Email: [hi@iolivares.com](mailto:hi@iolivares.com)
- X (Twitter): [@ivolivares](https://x.com/ivolivares)
- GitHub: [@ivolivares](https://github.com/ivolivares)
- LinkedIn: [ivolivares](https://linkedin.com/in/ivolivares)

## 🙏 Acknowledgments

- **[v0.dev](https://v0.dev/)** - AI-powered development tool used for initial prototyping and design
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful, accessible component library
- **[Vercel](https://vercel.com/)** - For hosting and deployment platform
- **[Next.js Team](https://nextjs.org/)** - For the incredible React framework

## 📚 Background

This is the 2025 version of my personal website. The prototype and design were created using [v0.dev](https://v0.app), demonstrating how AI can assist in rapid prototyping and development.

If you want to read more about the development process and thoughts behind this website, check out: [Building my v2025 website with V0: Thoughts on using AI for prototyping and shipping](https://iolivares.com/thoughts/my-web-v2025-using-v0)

For previous versions of this website, visit: [iolivares-dot-com repository](https://github.com/ivolivares/iolivares-dot-com)

---

**Built with ❤️ using [v0.dev](https://v0.dev) by Iván Olivares from Chile 🇨🇱**
