#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
// Simple case converters
function paramCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function pascalCase(str) {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('leedstack')
  .version('3.1.0')
  .description('Generate a full-stack web application with your choice of tech stack')
  .argument('<appName>', 'Name of the application')
  .requiredOption('-f, --frontend <type>', 'Frontend stack (react|vue|nextjs|svelte|angular)')
  .requiredOption('-b, --backend <type>', 'Backend stack (node-express|python-fastapi|java-spring|go-echo)')
  .requiredOption('--db <type>', 'Database (postgres|mysql|mongodb)')
  .option('--auth <type>', 'Authentication (auth0|none)', 'none')
  .option('--payments <type>', 'Payments (stripe|none)', 'none')
  .addHelpText('after', `
Examples:
  $ npx leedstack my-app --frontend react --backend python-fastapi --db postgres --auth auth0 --payments stripe contact admin
  $ npx leedstack blog --frontend vue --backend node-express --db mongodb
  $ npx leedstack shop --frontend nextjs --backend java-spring --db mysql --payments stripe

Supported Stacks:
  Frontends:  react (Vite + React 19), vue (Vue 3.5), nextjs (Next.js 15), svelte (SvelteKit 5.x), angular (Angular 19+)
  Backends:   node-express (Node 20+ + TypeScript), python-fastapi (Python 3.11+ FastAPI), java-spring (Java 21 + Maven), go-echo (Go 1.22+)
  Databases:  postgres (16+), mysql (8+), mongodb (7+)

Optional Modules:
  --auth auth0       Auth0 OIDC authentication with JWT validation
  --payments stripe  Stripe Checkout + webhook integration
  contact            Contact form with database persistence
  admin              Protected admin dashboard (requires auth with 'admin' scope)
  chatbot            AI chatbot (works out-of-box, upgrades with OpenAI/Anthropic API key)

For more info: https://github.com/CTLeed/leedstack
`)
  .action(async (appName, options, command) => {
    const additionalModules = command.args.slice(1);

    const validFrontends = ['react', 'vue', 'nextjs', 'svelte', 'angular'];
    const validBackends = ['node-express', 'python-fastapi', 'java-spring', 'go-echo'];
    const validDatabases = ['postgres', 'mysql', 'mongodb'];
    const validAuth = ['auth0', 'none'];
    const validPayments = ['stripe', 'none'];
    const validModules = ['contact', 'admin', 'chatbot'];

    // Validation
    if (!validFrontends.includes(options.frontend)) {
      console.error(`❌ Invalid frontend: ${options.frontend}. Must be one of: ${validFrontends.join(', ')}`);
      process.exit(1);
    }
    if (!validBackends.includes(options.backend)) {
      console.error(`❌ Invalid backend: ${options.backend}. Must be one of: ${validBackends.join(', ')}`);
      process.exit(1);
    }
    if (!validDatabases.includes(options.db)) {
      console.error(`❌ Invalid database: ${options.db}. Must be one of: ${validDatabases.join(', ')}`);
      process.exit(1);
    }
    if (!validAuth.includes(options.auth)) {
      console.error(`❌ Invalid auth: ${options.auth}. Must be one of: ${validAuth.join(', ')}`);
      process.exit(1);
    }
    if (!validPayments.includes(options.payments)) {
      console.error(`❌ Invalid payments: ${options.payments}. Must be one of: ${validPayments.join(', ')}`);
      process.exit(1);
    }
    for (const mod of additionalModules) {
      if (!validModules.includes(mod)) {
        console.error(`❌ Invalid module: ${mod}. Must be one of: ${validModules.join(', ')}`);
        process.exit(1);
      }
    }

    const targetDir = path.resolve(process.cwd(), appName);

    // Fail if target directory exists
    if (await fs.pathExists(targetDir)) {
      console.error(`❌ Directory ${appName} already exists. Please choose a different name or remove the existing directory.`);
      process.exit(1);
    }

    const appSlug = paramCase(appName);
    const AppName = pascalCase(appName);

    const modules = {
      auth: options.auth !== 'none',
      payments: options.payments !== 'none',
      contact: additionalModules.includes('contact'),
      admin: additionalModules.includes('admin'),
      chatbot: additionalModules.includes('chatbot')
    };

    const frontendPorts = {
      react: 5173,
      vue: 5173,
      svelte: 5173,
      nextjs: 3000,
      angular: 4200
    };
    const frontendPort = frontendPorts[options.frontend] || 5173;

    const context = {
      appName,
      appSlug,
      AppName,
      frontend: options.frontend,
      backend: options.backend,
      db: options.db,
      auth: options.auth,
      payments: options.payments,
      modules,
      frontendPort
    };

    console.log(`\n🚀 Creating ${appName}...`);
    console.log(`   Frontend: ${options.frontend}`);
    console.log(`   Backend: ${options.backend}`);
    console.log(`   Database: ${options.db}`);
    if (modules.auth) console.log(`   Auth: ${options.auth}`);
    if (modules.payments) console.log(`   Payments: ${options.payments}`);
    if (modules.contact) console.log(`   ✓ contact module`);
    if (modules.admin) console.log(`   ✓ admin module`);
    if (modules.chatbot) console.log(`   ✓ chatbot module`);
    console.log('');

    const warnings = [];
    const templatesDir = path.resolve(__dirname, '..', 'tools', 'templates');

    // Template resolution order
    const templateLayers = [
      { type: 'base', path: path.join(templatesDir, 'base') },
      { type: 'frontend', path: path.join(templatesDir, 'frontend', options.frontend) },
      { type: 'backend', path: path.join(templatesDir, 'backend', options.backend) },
      { type: 'db', path: path.join(templatesDir, 'db', options.db, 'backend', options.backend) }
    ];

    // Add module layers
    const moduleNames = [];
    if (modules.auth) moduleNames.push('auth');
    if (modules.payments) moduleNames.push('payments');
    if (modules.contact) moduleNames.push('contact');
    if (modules.admin) moduleNames.push('admin');
    if (modules.chatbot) moduleNames.push('chatbot');

    for (const modName of moduleNames) {
      templateLayers.push({
        type: `module-${modName}-frontend`,
        path: path.join(templatesDir, 'modules', modName, 'frontend', options.frontend)
      });
      templateLayers.push({
        type: `module-${modName}-backend`,
        path: path.join(templatesDir, 'modules', modName, 'backend', options.backend)
      });
    }

    // Process each layer
    for (const layer of templateLayers) {
      if (await fs.pathExists(layer.path)) {
        await copyAndRenderTemplates(layer.path, targetDir, context);
      } else {
        const skipDbWarning = layer.type === 'db' && ['go-echo', 'python-fastapi'].includes(options.backend);
        if (!skipDbWarning) {
          warnings.push(`⚠ ${layer.type}: MISSING (path: ${layer.path})`);

          // Generate stub
          const stubPath = path.join(targetDir, `MISSING_${layer.type}.txt`);
          await fs.writeFile(stubPath, `TODO: Missing template\nPath: ${layer.type}\nContract: Implement the documented endpoint/component signature.\n`);
        }
      }
    }

    console.log(`✅ Project ${appName} created successfully!\n`);

    if (warnings.length > 0) {
      console.log('⚠️  Warnings:');
      warnings.forEach(w => console.log(`   ${w}`));
      console.log('');
    }

    // Print next steps
    console.log('📋 Next steps:\n');
    console.log('1. Start the database:');
    console.log(`   cd ${appName}`);
    console.log('   docker compose up -d\n');

    console.log('2. Set up environment variables:');
    console.log('   cp .env.example .env');
    console.log('   # Edit .env with your configuration\n');

    console.log('3. Start the backend:');
    console.log('   cd backend');
    if (options.backend === 'java-spring') {
      console.log('   mvn spring-boot:run');
    } else if (options.backend === 'node-express') {
      console.log('   npm install');
      console.log('   npm run dev');
    } else if (options.backend === 'go-echo') {
      console.log('   go run ./cmd/server');
    }
    console.log('');

    console.log('4. Start the frontend (in a new terminal):');
    console.log('   cd frontend');
    console.log('   cp .env.example .env');
    console.log('   npm install');
    console.log('   npm run dev');
    console.log('');

    if (modules.auth) {
      console.log('5. Configure Auth0:');
      console.log('   - Create a SPA app in Auth0');
      console.log('   - Set Allowed Callback URLs: http://localhost:5173/callback');
      console.log('   - Set Allowed Logout URLs: http://localhost:5173');
      console.log('   - Set Allowed Web Origins: http://localhost:5173');
      console.log(`   - Create an API with Identifier: https://api.${appSlug}`);
      console.log('   - Update .env files with Auth0 credentials\n');
    }

    if (modules.payments) {
      console.log(`${modules.auth ? '6' : '5'}. Configure Stripe:`);
      console.log('   - Set STRIPE_SECRET_KEY in backend .env');
      console.log('   - Run: stripe listen --forward-to localhost:8080/stripe/webhook');
      console.log('   - Set STRIPE_WEBHOOK_SECRET from the output\n');
    }
  });

async function copyAndRenderTemplates(srcDir, destDir, context) {
  const items = await fs.readdir(srcDir, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    let destName = item.name;

    // Remove .ejs extension if present
    if (destName.endsWith('.ejs')) {
      destName = destName.slice(0, -4);
    }

    const destPath = path.join(destDir, destName);

    if (item.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyAndRenderTemplates(srcPath, destPath, context);
    } else {
      // Check if it's an EJS template
      if (item.name.endsWith('.ejs')) {
        const template = await fs.readFile(srcPath, 'utf-8');
        const rendered = ejs.render(template, context);
        await fs.writeFile(destPath, rendered);
      } else {
        // Copy as-is
        await fs.copy(srcPath, destPath);
      }
    }
  }
}

program.parse();
