# Contributing to iolivares.com

Thank you for your interest in contributing to this personal website project! This project serves as both a personal portfolio and an open source template that others can adapt for their own use. We welcome contributions that improve the codebase, enhance functionality, fix bugs, or improve documentation.

## Ways to Contribute

There are many ways you can contribute to this project:

- **Code contributions**: Bug fixes, feature improvements, performance optimizations
- **Documentation**: Improve README, add code comments, create tutorials
- **Bug reports**: Help identify issues and provide detailed reports
- **Feature requests**: Suggest new functionality or improvements
- **Content suggestions**: Propose improvements to the template structure or example content
- **Accessibility improvements**: Help make the site more accessible
- **Performance optimizations**: Identify and fix performance bottlenecks
- **Translation improvements**: Enhance or add new language support

## Getting Started

Before you begin contributing, please:

1. **Read the README**: Familiarize yourself with the project setup and structure by reading the [README.md](README.md)
2. **Set up your development environment**: Follow the setup instructions in the README to get the project running locally
3. **Explore the codebase**: Take some time to understand the project structure and architecture

## Development Workflow

### Fork and Clone Process

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/iolivares.com-v2025.git
   cd iolivares.com-v2025
   ```
3. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/iolivares/iolivares.com-v2025.git
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```

### Branch Naming Conventions

Create descriptive branch names using these prefixes:

- `feat/` - New features (e.g., `feat/add-dark-mode-toggle`)
- `fix/` - Bug fixes (e.g., `fix/mobile-navigation-issue`)
- `docs/` - Documentation updates (e.g., `docs/update-contributing-guide`)
- `style/` - Code style improvements (e.g., `style/improve-component-formatting`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-navigation-logic`)
- `perf/` - Performance improvements (e.g., `perf/optimize-image-loading`)
- `test/` - Adding or updating tests (e.g., `test/add-component-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:
- `feat: add command palette for site navigation`
- `fix(mobile): resolve navigation menu overflow on small screens`
- `docs: update setup instructions in README`
- `style: improve button component accessibility`

### Testing Requirements

- Ensure your changes don't break existing functionality
- Test your changes across different screen sizes and devices
- Verify that translations work correctly if you modify text content
- Run the development server and test the affected features manually
- If adding new features, consider adding appropriate tests

## Pull Request Process

### Creating a Pull Request

1. **Update your fork**:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Create and switch to your feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and commit them using conventional commit format

4. **Push your branch**:
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Create a Pull Request** on GitHub with a descriptive title and detailed description

### Pull Request Description

Your PR description should include:

- **Summary**: Brief description of what the PR does
- **Changes Made**: List of specific changes
- **Motivation**: Why this change is needed
- **Screenshots**: For UI changes, include before/after screenshots
- **Testing**: How you tested the changes
- **Checklist**: Use the provided PR template checklist

### Review Process

- All PRs require at least one review from a maintainer
- Address any requested changes promptly
- Keep discussions respectful and constructive
- PRs may be closed if they become stale or don't align with project goals

## Issue Reporting Guidelines

### How to Report Bugs

When reporting bugs, please include:

- **Clear title**: Describe the issue briefly
- **Environment**: OS, browser, screen size (if relevant)
- **Steps to reproduce**: Detailed steps to recreate the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: Visual evidence if applicable
- **Additional context**: Any other relevant information

### How to Request Features

For feature requests, please provide:

- **Feature description**: What you'd like to see added
- **Use case**: Why this feature would be valuable
- **Proposed implementation**: Ideas on how it could work (optional)
- **Alternatives considered**: Other solutions you've thought about

### Issue Templates

Please use the provided issue templates when creating new issues. This helps maintain consistency and ensures all necessary information is provided.

## Code Style and Standards

### TypeScript/React Best Practices

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Prefer functional components over class components
- Use proper TypeScript typing (avoid `any` when possible)
- Implement proper error boundaries where appropriate

### ESLint and Formatting

- Follow the project's ESLint configuration
- Use meaningful variable and function names
- Keep components small and focused on single responsibilities
- Write self-documenting code with clear naming

### Component Organization

- Place reusable UI components in `components/ui/`
- Place page-specific components in `components/`
- Use proper file naming conventions (kebab-case)
- Export components using named exports when appropriate
- Include proper TypeScript interfaces for props

### File Structure

- Follow the existing project structure
- Keep related files grouped together
- Use appropriate file extensions (`.tsx` for React components, `.ts` for utilities)
- Place static assets in the `public/` directory

## Personal Content Considerations

### What Can Be Modified

✅ **Template/Framework code**: Feel free to improve:
- Component architecture and reusability
- Styling and design system
- Performance optimizations
- Accessibility improvements
- Build configuration
- Documentation

### What Should Stay Personal

❌ **Personal content**: Please don't modify:
- Personal photos and images
- Resume/CV content
- Personal thoughts and blog posts
- Contact information
- Personal project details
- Speaking engagement history

### Adapting for Personal Use

If you want to use this project as a template for your own website:

1. **Fork the repository** to your own account
2. **Replace personal content** with your own information
3. **Customize styling** to match your preferences
4. **Update configuration** files with your details
5. **Modify or remove** personal pages as needed

## Community Guidelines

### Our Commitment

We are committed to providing a welcoming and inspiring community for all. Please:

- **Be respectful**: Treat all community members with respect and kindness
- **Be inclusive**: Welcome newcomers and help them get started
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that people have different experience levels
- **Be professional**: Keep discussions focused on the project

### Communication Standards

- Use clear and concise language
- Provide context for your suggestions or feedback
- Be open to different perspectives and approaches
- Focus on the code and ideas, not personal characteristics
- Help others learn and grow

## Questions and Support

### Getting Help

If you have questions or need support:

1. **Check existing documentation**: README, issues, and discussions
2. **Search existing issues**: Your question might already be answered
3. **Create a new issue**: Use the question template for new questions
4. **Join discussions**: Participate in GitHub Discussions if available

### Contact

For questions specific to this project or if you need additional support:

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and community discussion
- **Project maintainer**: [@iolivares](https://github.com/iolivares)

---

Thank you for contributing to this project! Your involvement helps make this a better resource for the community and helps others build their own amazing personal websites.
