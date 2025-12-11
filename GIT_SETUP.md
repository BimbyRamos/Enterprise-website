# Git Repository Setup

This project is ready for Git version control.

## Initialize Git Repository

To initialize the Git repository, run:

```bash
git init
git add .
git commit -m "Initial commit: Project setup with Next.js 14, TypeScript, and Tailwind CSS"
```

## Add Remote Repository

To connect to a remote repository:

```bash
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

## Git Configuration

The project includes:
- `.gitignore` - Configured to exclude node_modules, build files, environment variables, and IDE files
- `.dockerignore` - Configured for Docker builds

## Recommended Git Workflow

1. **Main Branch**: `main` - Production-ready code
2. **Development Branch**: `develop` - Integration branch for features
3. **Feature Branches**: `feature/<feature-name>` - Individual features
4. **Hotfix Branches**: `hotfix/<issue>` - Critical production fixes

## Commit Message Convention

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add homepage hero section
fix: resolve navigation dropdown issue
docs: update README with deployment instructions
```
