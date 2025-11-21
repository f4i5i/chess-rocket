# Git Repository Structure Guide

This document explains what files are included in version control and guidelines for managing your repository.

---

## ✅ Files INCLUDED in Git (Committed)

### Core Application Files
```
src/
├── components/         # All React components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── assets/            # Images, fonts, icons
├── styles/            # CSS/styling files
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

### Configuration Files
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked dependency versions (important!)
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - Main HTML template
- `.gitignore` - Git ignore rules
- `eslintrc.js` / `.eslintrc.json` - ESLint configuration
- `prettier.config.js` - Code formatting rules
- `tsconfig.json` - TypeScript configuration (if using TS)

### Documentation
- `README.md` - Project documentation
- `LICENSE` - Project license
- Any `.md` files with project documentation

### Public Assets
```
public/
├── favicon.ico
├── robots.txt
└── any static assets
```

---

## ❌ Files EXCLUDED from Git (In .gitignore)

### Dependencies
- `node_modules/` - All installed packages (heavy, can be reinstalled)
- `/.pnp` - Yarn Plug'n'Play files

### Build Output
- `/build` - Production build files
- `/dist` - Distribution files
- `dist-ssr` - Server-side rendering build

### Environment & Secrets
- `.env` - Environment variables
- `.env.local` - Local environment overrides
- `.env.*.local` - Environment-specific configs
- Any files with API keys or secrets

### Development Files
- `/coverage` - Test coverage reports
- `.cache` - Build cache
- `*.log` - Log files
- `.eslintcache` - ESLint cache
- `.npm` - npm cache

### Claude Code
- `.claude/` - Claude Code workspace data
- `.claude.json` - Claude Code settings
- `.claude.json.backup` - Claude Code backups

### Editor Files
- `.vscode/` - VS Code settings (except extensions.json)
- `.idea/` - JetBrains IDE settings
- `*.swp`, `*~` - Vim/editor temporary files

### OS Files
- `.DS_Store` - macOS finder settings
- `Thumbs.db` - Windows thumbnail cache

---

## 📋 Decision Guide: Should I Commit This File?

### ✅ INCLUDE if:
1. **Source Code** - Any `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.html` you wrote
2. **Configuration** - `package.json`, `vite.config.js`, `tailwind.config.js`
3. **Documentation** - README, guides, API docs
4. **Static Assets** - Images, fonts, icons in `/src/assets` or `/public`
5. **Tests** - Test files (`.test.js`, `.spec.js`)
6. **Build Config** - `.babelrc`, `webpack.config.js`, etc.

### ❌ EXCLUDE if:
1. **Generated Files** - Build output, compiled code
2. **Dependencies** - `node_modules`, vendor folders
3. **Secrets** - API keys, passwords, tokens, `.env` files
4. **Personal Settings** - IDE configs, OS files
5. **Large Binary Files** - Videos, large datasets (use Git LFS if needed)
6. **Logs** - Any `.log` files
7. **Cache** - Temporary files, cache directories

---

## 🔒 Security Best Practices

### Never Commit:
```
❌ .env files with secrets
❌ config.js with hardcoded API keys
❌ credentials.json
❌ private keys (.pem, .key files)
❌ database dumps with real data
❌ node_modules/
```

### Safe to Commit:
```
✅ .env.example (template without real values)
✅ config.example.js (template without secrets)
✅ package.json (lists dependencies, not code)
✅ README with setup instructions
```

---

## 📦 Example: Adding New Files

### Scenario 1: Adding a New Component
```bash
# Create new component
src/components/NewFeature/NewFeature.jsx

# This SHOULD be committed:
git add src/components/NewFeature/NewFeature.jsx
git commit -m "Add NewFeature component"
```

### Scenario 2: Adding Environment Variables
```bash
# Create .env file (NOT committed)
.env

# Create template (committed)
.env.example

# In .env.example:
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here

# In .env (your actual file):
VITE_API_URL=https://api.example.com
VITE_API_KEY=secret123456
```

### Scenario 3: Adding New Dependencies
```bash
# Install package
npm install new-package

# Commit the lock file:
git add package.json package-lock.json
git commit -m "Add new-package dependency"

# node_modules/ stays ignored
```

### Scenario 4: Adding Static Assets
```bash
# Add image to project
src/assets/logo.png

# This SHOULD be committed:
git add src/assets/logo.png
git commit -m "Add company logo"
```

---

## 🔍 Checking What's Tracked

### See all tracked files:
```bash
git ls-files
```

### See what's ignored:
```bash
git status --ignored
```

### Check if a file is ignored:
```bash
git check-ignore -v path/to/file
```

### See what would be committed:
```bash
git status
```

---

## 🚨 Common Mistakes

### Mistake 1: Committing node_modules
```bash
# If you accidentally committed it:
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

### Mistake 2: Committing .env with secrets
```bash
# Remove from git but keep locally:
git rm --cached .env
git commit -m "Remove .env from tracking"

# Then add to .gitignore if not already there
```

### Mistake 3: Committing build files
```bash
# Remove build folder:
git rm -r --cached build dist
git commit -m "Remove build files from tracking"
```

---

## 📝 Quick Reference

| File Type | Include? | Reason |
|-----------|----------|---------|
| `src/**/*.jsx` | ✅ Yes | Source code |
| `package.json` | ✅ Yes | Dependency list |
| `package-lock.json` | ✅ Yes | Locked versions |
| `node_modules/` | ❌ No | Can be reinstalled |
| `.env` | ❌ No | Contains secrets |
| `.env.example` | ✅ Yes | Template for setup |
| `build/` | ❌ No | Generated output |
| `README.md` | ✅ Yes | Documentation |
| `.DS_Store` | ❌ No | OS metadata |
| `vite.config.js` | ✅ Yes | Build config |
| `*.log` | ❌ No | Temporary logs |
| `.claude.json` | ❌ No | Personal AI settings |
| `public/favicon.ico` | ✅ Yes | Static asset |
| `coverage/` | ❌ No | Test reports |

---

## 🎯 Golden Rules

1. **Source Code**: Always commit
2. **Configuration**: Commit (unless it has secrets)
3. **Dependencies**: Never commit (use package.json instead)
4. **Secrets**: Never commit (use .env.example templates)
5. **Generated Files**: Never commit (can be rebuilt)
6. **Documentation**: Always commit

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [.gitignore Templates](https://github.com/github/gitignore)
- [Keeping Secrets Out of Git](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

---

**Last Updated**: 2025-01-21
