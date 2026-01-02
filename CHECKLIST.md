# Pre-Publishing Checklist

Use this checklist before publishing to npm.

## âœ… Package Configuration

- [ ] Update `package.json`:
  - [ ] Set `name` to a unique package name (check with `npm view <name>`)
  - [ ] Set `author` to your name and email
  - [ ] Update `repository.url` to your GitHub repo
  - [ ] Update `bugs.url` to your issues page
  - [ ] Update `homepage` to your repo README

## âœ… Documentation

- [ ] Update `README.md`:
  - [ ] Replace all `yourusername` with your actual username
  - [ ] Update repository URLs
  - [ ] Add screenshots/demos (optional but recommended)

- [ ] Update `LICENSE`:
  - [ ] Replace `[Your Name]` with your actual name
  - [ ] Verify license type matches your intent (MIT is permissive)

- [ ] Update `bin/create-stack.js`:
  - [ ] Update help text URL to your repo

## âœ… Testing

- [ ] Test locally:
  ```bash
  npm install
  node bin/create-stack.js test-app --frontend svelte --backend node-express --db postgres
  ```

- [ ] Verify generated project:
  - [ ] Files created correctly
  - [ ] Docker Compose works (`docker compose up -d`)
  - [ ] Backend starts (if dependencies installed)
  - [ ] Frontend starts (if dependencies installed)

- [ ] Test all combinations (optional but thorough):
  - [ ] Each frontend (svelte, react, angular)
  - [ ] Each backend (java-spring, node-express, go-echo)
  - [ ] Each database (postgres, mysql, mongodb)
  - [ ] Auth module
  - [ ] Payments module
  - [ ] Contact module
  - [ ] Admin module

- [ ] Test CLI help:
  ```bash
  node bin/create-stack.js --help
  node bin/create-stack.js --version
  ```

- [ ] Preview package contents:
  ```bash
  npm pack --dry-run
  ```
  Verify includes: `bin/`, `tools/`, `package.json`, `README.md`, `LICENSE`

## âœ… npm Account Setup

- [ ] Create npm account: https://www.npmjs.com/signup
- [ ] Verify email
- [ ] Enable 2FA (recommended): `npm profile enable-2fa auth-and-writes`
- [ ] Login: `npm login`

## âœ… Version Control (Optional but Recommended)

- [ ] Initialize git:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

- [ ] Create GitHub repo and push:
  ```bash
  git remote add origin https://github.com/yourusername/leedstack.git
  git push -u origin main
  ```

## âœ… Publishing

- [ ] Final check:
  ```bash
  npm pack --dry-run
  ```

- [ ] Publish:
  ```bash
  npm publish
  ```

- [ ] Verify publication:
  ```bash
  npm view leedstack
  ```

- [ ] Test installation:
  ```bash
  npx leedstack test-app --frontend react --backend node-express --db postgres
  ```

## âœ… Post-Publishing

- [ ] Add GitHub topics/tags: scaffolder, generator, full-stack, react, svelte, etc.
- [ ] Create releases on GitHub matching npm versions
- [ ] Write announcement blog post
- [ ] Share on social media:
  - [ ] Twitter/X
  - [ ] Reddit (r/webdev, r/javascript, r/programming)
  - [ ] Dev.to
  - [ ] Hacker News
- [ ] Add to lists/directories:
  - [ ] awesome-* lists on GitHub
  - [ ] Tools directories
  - [ ] Framework-specific communities

## âœ… Ongoing Maintenance

- [ ] Monitor GitHub issues
- [ ] Respond to questions
- [ ] Update dependencies quarterly
- [ ] Add requested features
- [ ] Fix bugs promptly
- [ ] Update version following semver:
  - Patch (1.0.1): Bug fixes
  - Minor (1.1.0): New features, backward compatible
  - Major (2.0.0): Breaking changes

## Monetization Options

If you want to monetize:

- [ ] Add GitHub Sponsors
- [ ] Create Pro version with extra features
- [ ] Offer consulting/implementation services
- [ ] Create video tutorials (Udemy, YouTube)
- [ ] Write a book/guide
- [ ] Offer priority support tier
- [ ] Sell on Gumroad/Lemon Squeezy
- [ ] Add donation links to README

## Notes

- Package name must be unique on npm
- Can't unpublish after 24 hours (only deprecate)
- Version numbers can't be reused
- Keep a changelog for user transparency
- Consider semantic-release for automated versioning

## Support

Questions? Check:
- npm docs: https://docs.npmjs.com/
- Publishing guide: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- This repo's PUBLISHING.md for detailed instructions

