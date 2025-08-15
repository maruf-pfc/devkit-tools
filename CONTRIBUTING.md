# Contributing to DevKit Tools 🛠️

Thank you for considering contributing! We welcome contributions for bug fixes, new tools, UI improvements, and documentation updates.

## How to Contribute

### 1. Fork the Repository

Click the **Fork** button on GitHub to create your own copy of this repo.

### 2. Clone Your Fork

```bash
git clone https://github.com/maruf-pfc/devkit-tools.git
cd devkit-tools
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Create a Branch

Use descriptive names for your branches:

- `feature/<tool-name>` for new tools
- `bugfix/<issue-id>` for bug fixes

```bash
git checkout -b feature/json-formatter
```

### 5. Make Changes

- Keep code clean and consistent with TypeScript and Tailwind conventions
- Add tests for new tools and features
- Document usage in `README.md` if needed

### 6. Commit Changes

```bash
git commit -m "Add JSON Formatter tool"
```

### 7. Push and Create Pull Request

```bash
git push origin feature/json-formatter
```

- Open a Pull Request from your branch to `main`
- Describe the purpose and changes clearly

## Adding a New Tool

1. Create a component in `components/tools/`
2. Add metadata in `data/tools.json`
3. Update `app/tools/[slug]/page.tsx` to register the tool
4. Add tests and documentation
5. Submit PR

## Code of Conduct

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and be respectful to all contributors.

```txt
This setup gives you:

- Ready-to-use **issue templates** for bug reports and feature requests
- GitHub **workflows** to greet new contributors, add labels, and generate summaries
- A **contributing guide** with clear instructions for developers
```
