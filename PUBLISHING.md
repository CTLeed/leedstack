# Publishing leedstack to npm

This guide walks you through publishing this package so others can use it via `npx`.

## Prerequisites

1. **npm account**: Sign up at https://www.npmjs.com/signup
2. **Verify email**: Check your email and verify your npm account
3. **Node.js â‰¥20**: Ensure you have Node.js 20 or later installed

## Before Publishing

### 1. Update package.json

Edit `package.json` and update these fields:

```json
{
  "name": "leedstack",  // Change if name is taken on npm (check: npm view leedstack)
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/leedstack.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/leedstack/issues"
  },
  "homepage": "https://github.com/yourusername/leedstack#readme"
}
```

**Important**: The `name` field must be unique on npm. Check availability:
```bash
npm view leedstack
```

If it returns "npm ERR! 404", the name is available!

### 2. Update LICENSE

Edit `LICENSE` and replace `[Your Name]` with your actual name.

### 3. Update README.md

Replace placeholder URLs:
- `https://github.com/yourusername/leedstack` â†’ your actual repo URL
- Update the "Author" section

### 4. Update CLI Help Text

In `bin/create-stack.js`, update the help text URL:
```javascript
For more info: https://github.com/yourusername/leedstack
```

### 5. Test Locally

Before publishing, test the package locally:

```bash
# In the leedstack directory
npm link

# In another directory, test it
cd ..
npx leedstack test-app --frontend svelte --backend node-express --db postgres

# Verify it works, then clean up
rm -rf test-app
cd leedstack
npm unlink -g leedstack
```

### 6. Choose a License (if changing from MIT)

If you want to sell this or use a different license:
- **MIT**: Free and open source (current)
- **Commercial**: Create your own license terms for paid use
- **Dual License**: MIT for open source, commercial license for enterprise
- **ISC/Apache**: Other permissive open source licenses

## Publishing Steps

### First Time Setup

1. **Login to npm**:
```bash
npm login
```
Enter your npm username, password, and email.

2. **Enable 2FA** (recommended):
```bash
npm profile enable-2fa auth-and-writes
```

### Publish

1. **Ensure package is ready**:
```bash
npm pack --dry-run
```
This shows what files will be included. Should see:
- `bin/`
- `tools/`
- `package.json`
- `README.md`
- `LICENSE`

2. **Publish to npm**:
```bash
npm publish
```

If the name is taken, you'll see an error. Either:
- Choose a different name (update `package.json` â†’ `name`)
- Use a scoped package: `@yourusername/leedstack`

### Verify Publication

```bash
npm view leedstack
```

Should show your package details!

## Using Your Published Package

Once published, anyone can use it:

```bash
npx leedstack my-app --frontend react --backend node-express --db postgres
```

## Updating the Package

When you make changes:

1. **Update version** in `package.json`:
```json
{
  "version": "1.0.1"  // Follow semver: major.minor.patch
}
```

2. **Publish update**:
```bash
npm publish
```

### Semantic Versioning

- **Patch** (1.0.1): Bug fixes, no new features
- **Minor** (1.1.0): New features, backward compatible
- **Major** (2.0.0): Breaking changes

## Selling the Package

If you want to monetize this:

### Option 1: Paid npm Package

Use npm's paid packages feature:
```bash
npm access restricted leedstack
npm publish --access=restricted
```

Users must pay to access. See: https://docs.npmjs.com/about-private-packages

### Option 2: GitHub Sponsors / Donations

Keep it open source but ask for donations:
- Add a `FUNDING.yml` file
- Link to GitHub Sponsors, Patreon, Ko-fi, etc.

### Option 3: Pro/Enterprise Version

- Keep basic version free on npm
- Offer paid version with extra features:
  - Additional stack templates
  - Premium support
  - Custom branding
  - CI/CD integration
  - Team features

### Option 4: Consulting/Services

- Open source the tool
- Charge for:
  - Custom stack development
  - Implementation services
  - Training/workshops
  - Priority support

### Option 5: Sell on Gumroad/Other Platforms

Package it as a downloadable product:
1. Create a `.zip` with the package
2. Include setup instructions
3. Sell on Gumroad, Lemon Squeezy, etc.
4. Buyers download and run `npm install -g ./leedstack-1.0.0.tgz`

## Marketing Your Package

1. **Create a landing page**: Showcase features, examples, demos
2. **Write blog posts**: "How I built leedstack" or comparison articles
3. **Post on social media**: Twitter, Reddit (r/webdev), Dev.to, Hacker News
4. **Create demo videos**: Screen recordings showing the tool in action
5. **SEO**: Optimize npm page with good keywords, README, examples

## Support & Maintenance

- Monitor GitHub issues
- Respond to questions promptly
- Keep dependencies updated
- Add more stack combinations based on demand
- Create a changelog for each release

## Legal Considerations

- Ensure you have rights to all code
- Don't include proprietary code without permission
- Be clear about warranty/liability (MIT license handles this)
- If selling, consider terms of service
- Consult a lawyer for commercial licensing

## Next Steps

1. âœ… Test package locally
2. âœ… Update all placeholders (name, email, URLs)
3. âœ… Choose your licensing/pricing model
4. âœ… Create npm account
5. âœ… Publish with `npm publish`
6. âœ… Market your package
7. âœ… Iterate based on feedback

Good luck! ðŸš€



